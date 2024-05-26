import json
import boto3
import botocore
cognito_client = boto3.client('cognito-idp')
mobisClientId = '1pmp2a32tbpc1bu9175i39vkb4'

def lambda_handler(event, context):
    body = event
    print(body)
    username = body['name']
    preferred_name = body['preferred_username']
    phoneNumber = body['phone_number']
    password = body['password']
    email = body['email']
    runExperience = body['runExperience']
    try:
        response = cognito_client.sign_up(
            ClientId= mobisClientId,
            Username=username,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'preferred_username', 'Value': preferred_name},
                {'Name': 'phone_number', 'Value': phoneNumber},
                {'Name': 'custom:runExperience', 'Value': runExperience}
            ]
        ) #send credentials to cognito. hope it triggers postsignup event and puts in dynamodb
        return {
            'statusCode': 200,
            'body': json.dumps('Sucessfully sent credentials')
        }
        
    except botocore.exceptions.ClientError as e:
        print(e.response)
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

