import json
import boto3
from decimal import Decimal

# Initialize the AWS clients
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')
cognito_client = boto3.client('cognito-idp')

userPoolId = 'us-west-1_5SOVhTCcK'

def get_user_sub(username):
    response = cognito_client.admin_get_user(
        UserPoolId=userPoolId,
        Username=username
    )
    
    for attribute in response['UserAttributes']:
        if attribute['Name'] == 'sub':
            return attribute['Value']
    
    return None

def get_running_stats(user_id, username):
    response = table.get_item(
        Key={'userid': user_id, 'username': username}
    )
    
    if 'Item' in response:
        running_stats = response['Item'].get('runningStats', [])
    else:
        running_stats = []
    
    return running_stats

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        username = event['username']
        
        # Retrieve user sub from Cognito
        user_sub = get_user_sub(username)
        if not user_sub:
            return {
                'statusCode': 400,
                'body': json.dumps('User sub not found')
            }
        
        # Retrieve running stats from DynamoDB
        running_stats = get_running_stats(user_sub, username)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'runningStats': running_stats}, cls=DecimalEncoder)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }