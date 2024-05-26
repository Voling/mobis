import json
import boto3
import botocore
cognito_client = boto3.client('cognito-idp')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')

mobisClientId = '1pmp2a32tbpc1bu9175i39vkb4'
userPoolId = 'us-west-1_5SOVhTCcK'


def lambda_handler(event, context):
    try:
        username = event['username']
        response = cognito_client.admin_get_user(
            UserPoolId=userPoolId,
            Username=username
        )
        user_sub = None #user id
        for attribute in response['UserAttributes']:
            if attribute['Name'] == 'sub':
                user_sub = attribute['Value']
                break
        if not user_sub: #user not found in cognito
            return {
                'statusCode': 400,
                'body': json.dumps('User sub not found')
            }
        response = table.get_item(
            Key={'userid': str(user_sub), 'username': username},
            ProjectionExpression='#r',
            ExpressionAttributeNames={'#r': 'rank'}
        )
        if 'Item' in response: #search for rank and display if found
            rank = response['Item']['rank']
            return {
                'statusCode': 200,
                'body': json.dumps({'rank': float(rank)})
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps(f'Rank not found for user {username}')
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
