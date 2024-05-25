import json
import boto3
import botocore
client = boto3.client('dynamodb')
cognito_client = boto3.client('cognito-idp')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('mobisusers')


def lambda_handler(event, context):
    event = json.loads("""{
    "version": "1",
    "region": "us-west-2",
    "userPoolId": "us-west-1_5SOVhTCcK",
    "userName": "user@example.com",
    "callerContext": {
        "awsSdkVersion": "aws-sdk-unknown-unknown",
        "clientId": "xxxxxxxxxxxx"
    },
    "triggerSource": "PostConfirmation_ConfirmSignUp",
    "request": {
        "userAttributes": {
            "sub": "12345678-1234-1234-1234-123456789012",
            "email_verified": "true",
            "cognito:user_status": "CONFIRMED",
            "custom:username": "exampleuser",
            "email": "user@example.com"
        }
    },
    "response": {}
    }""")
    try:
        userId = event['request']['userAttributes']['sub']  # sub = uuid
        userPoolId = event['userPoolId']
        response = cognito_client.admin_get_user(
            UserPoolId=userPoolId,
            Username=userId
        )
        attributes = {attr['Name']: attr['Value']
                      for attr in response['UserAttributes']}

    except botocore.exceptions.ClientError as error:
        return {
            'statusCode': 500,
            'body': json.dumps(str(error))
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 404,
            'body': json.dumps(str(e))
        }
    return {
        'statusCode': 200,
        'body': json.dumps("hi")
    }
