import json
import boto3
import botocore
client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('mobisusers')

#can only be invoked after cognito confirms a user signup
def lambda_handler(event, context):
    print(event)
    try:
        userId = event['request']['userAttributes']['sub']  # sub = uuid
        username = event['request']['userAttributes'].get(
            'username', 'N/A')  # for sort key
        runExperience = event['request']['userAttributes'].get(
            'custom:runExperience', 0)
        initialRank = 500
        response = table.put_item(Item={
            'userid': userId,
            'username': username,
            'runExperience': runExperience, 
            'rank': initialRank,
            'gameUserNames': {'lol': "", 'valorant': ""},
            'runningStats': {},
            'recent20Games': {},
            'debt': 0,
            'longestLossStreak': 0
        })  # initialize user with 500 elo, 0 everything
        return event

    except botocore.exceptions.ClientError as e:
        print(f"Error storing user data: {e.response['Error']['Message']}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error storing user data: {e.response['Error']['Message']}")
        }
    except Exception as e:
        print(f"Invalid request: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps(f"Invalid request: {str(e)}")
        }
