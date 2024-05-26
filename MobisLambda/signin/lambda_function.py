import json
import boto3
import botocore

cognito_client = boto3.client('cognito-idp')
user_pool_id = 'us-west-1_5SOVhTCcK'
client_id = '1pmp2a32tbpc1bu9175i39vkb4'

def lambda_handler(event, context):
    body = event
    username = body['username']
    password = body['password']
    
    try:
        response = cognito_client.admin_initiate_auth(
            UserPoolId=user_pool_id,
            ClientId=client_id,
            AuthFlow='ADMIN_NO_SRP_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Sign-in successful',
                'authenticationResult': response['AuthenticationResult']
            })
        }
        
    except botocore.exceptions.ClientError as e:
        error_message = e.response['Error']['Message']
        print(f"Error during sign-in: {error_message}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Sign-in failed',
                'error': error_message
            })
        }

    except Exception as e:
        print(f"Invalid request: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({
                'message': 'Invalid request',
                'error': str(e)
            })
        }
