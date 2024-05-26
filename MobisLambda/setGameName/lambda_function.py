import json
import boto3
from decimal import Decimal

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')
cognito_client = boto3.client('cognito-idp')
userPoolId = 'us-west-1_5SOVhTCcK'
def update_game_user_names(user_id, username, game_username):
    game_usernames = [game_username, game_username]

    # Update the item in DynamoDB
    table.update_item(
        Key={'userid': user_id, 'username': username},
        UpdateExpression='SET gameUserNames = :val1',
        ExpressionAttributeValues={
            ':val1': game_usernames
        }
    )
    return game_usernames

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        username = event['username']
        game_username = event['gameUsername']  # Single input string
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
        updated_game_usernames = update_game_user_names(user_sub, username, game_username)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'gameUserNames': updated_game_usernames}, cls=DecimalEncoder)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }