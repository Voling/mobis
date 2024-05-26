import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
cognito_client = boto3.client('cognito-idp')
table = dynamodb.Table('mobisusers')
userPoolId = 'us-west-1_5SOVhTCcK'
def update_running_stats(user_id, username, steps):
    response = table.get_item(
        Key={'userid': user_id, 'username': username}
    )
    
    if 'Item' in response:
        running_stats = response['Item'].get('runningStats', [])
        print(f"Current runningStats: {running_stats}")
    else:
        running_stats = []
    
    # Ensure runningStats is a list
    if not isinstance(running_stats, list):
        running_stats = []

    # Add the new steps data point and ensure we only keep the last 28 data points
    running_stats.append(int(steps))
    if len(running_stats) > 28:
        running_stats.pop(0)
    
    # Update the item in DynamoDB
    table.update_item(
        Key={'userid': user_id, 'username': username},
        UpdateExpression='SET runningStats = :val1',
        ExpressionAttributeValues={
            ':val1': running_stats
        }
    )
    return running_stats

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj) if obj % 1 == 0 else float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    try:
        username = event['username']
        steps = event['steps']
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
        user_id = user_sub
        updated_stats = update_running_stats(user_id, username, steps)
        
        return {
            'statusCode': 200,
            'body': json.dumps({'runningStats': updated_stats}, cls=DecimalEncoder)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }