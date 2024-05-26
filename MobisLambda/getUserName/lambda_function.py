import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')
cognito_client = boto3.client('cognito-idp')
userPoolId = 'us-west-1_5SOVhTCcK'
def get_game_user_names(user_id, username):
    response = table.get_item(
        Key={'userid': user_id, 'username': username}
    )
    
    if 'Item' in response:
        game_usernames = response['Item'].get('gameUserNames', [])
    else:
        game_usernames = []
    
    return game_usernames

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        username = event['username']
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
        game_usernames = get_game_user_names(user_sub, username)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'gameUserNames': game_usernames}, cls=DecimalEncoder)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }