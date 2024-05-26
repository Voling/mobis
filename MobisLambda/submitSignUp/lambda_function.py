import json
import boto3
import botocore
cognito_client = boto3.client('cognito-idp')
mobisClientId = '1pmp2a32tbpc1bu9175i39vkb4'

def lambda_handler(event, context):
    body = json.loads(event)
    username = body['username']
    phoneNumber = body['phoneNumber']
    password = body['password']
    email = body['email']
    runExperience = body['runExperience']
    try:
        response = cognito_client.sign_up(
            ClientId= mobisClientId,
            Username=email,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'username', 'Value': username},
                {'Name': 'phoneNumber', 'Value': phoneNumber},
                {'Name': 'password', 'Value': password},
                {'Name': 'runExperience', 'Value': runExperience}
            ]
        ) #send credentials to cognito. hope it triggers postsignup event and puts in dynamodb
        return {
            'statusCode': 200,
            'body': json.dumps('Sucessfully sent credentials')
        }
        
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

