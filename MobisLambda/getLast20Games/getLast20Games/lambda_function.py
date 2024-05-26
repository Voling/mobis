import json
import boto3
import botocore
import urllib3
from decimal import Decimal

# Initialize the SSM client
ssm_client = boto3.client('ssm')
cognito_client = boto3.client('cognito-idp')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')
http = urllib3.PoolManager()

userPoolId = 'us-west-1_5SOVhTCcK'

def get_riot_api_key():
    response = ssm_client.get_parameter(
        Name='RiotAPIKey',
        WithDecryption=True
    )
    return response['Parameter']['Value']

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError

def get_game_name_and_tagline_from_dynamodb(user_sub, username):
    response = table.get_item(
        Key={'userid': user_sub, 'username': username},
        ProjectionExpression='gameUserNames'
    )
    if 'Item' in response and 'gameUserNames' in response['Item']:
        return response['Item']['gameUserNames'].get('lol').split('#')
    return None, None

def get_puuid(game_name, tag_line, riot_api_key):
    url = f"https://developer.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}"
    headers = {
        'X-Riot-Token': riot_api_key
    }
    response = http.request('GET', url, headers=headers)
    if response.status == 200:
        data = json.loads(response.data.decode('utf-8'))
        return data.get('puuid')
    else:
        return None

def get_riot_matches(puuid, riot_api_key):
    url = f"https://developer.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?count=20"
    headers = {
        'X-Riot-Token': riot_api_key
    }
    response = http.request('GET', url, headers=headers)
    if response.status == 200:
        return json.loads(response.data.decode('utf-8'))
    else:
        return {
            'statusCode': response.status,
            'body': response.data.decode('utf-8')
        }

def lambda_handler(event, context):
    try:
        username = event['username']
        # Fetch the user's sub from Cognito
        response = cognito_client.admin_get_user(
            UserPoolId=userPoolId,
            Username=username
        )
        user_sub = None  # user id
        for attribute in response['UserAttributes']:
            if attribute['Name'] == 'sub':
                user_sub = attribute['Value']
                break
        if not user_sub:  # user not found in cognito
            return {
                'statusCode': 400,
                'body': json.dumps('User sub not found')
            }

        # Retrieve gameName and tagLine from DynamoDB
        game_name, tag_line = get_game_name_and_tagline_from_dynamodb(user_sub, username)
        if not game_name or not tag_line:
            return {
                'statusCode': 404,
                'body': json.dumps('gameName or tagLine not found')
            }

        # Retrieve the Riot API key from SSM Parameter Store
        riot_api_key = get_riot_api_key()

        # Get PUUID from Riot API
        puuid = get_puuid(game_name, tag_line, riot_api_key)
        if not puuid:
            return {
                'statusCode': 404,
                'body': json.dumps('PUUID not found')
            }

        # Get last 20 matches from Riot API
        match_data = get_riot_matches(puuid, riot_api_key)
        return {
            'statusCode': 200,
            'body': json.dumps(match_data, default=decimal_default)
        }
    except cognito_client.exceptions.UserNotFoundException:
        return {
            'statusCode': 404,
            'body': json.dumps('User not found in Cognito')
        }
    except botocore.exceptions.ClientError as e:
        print(f"Error: {e.response['Error']['Message']}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error retrieving user data: {e.response['Error']['Message']}")
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }