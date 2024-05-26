import json
import boto3
from decimal import Decimal
import math

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')

def fetch_all_users():
    response = table.scan()
    return response['Items']

def calculate_new_ranking(current_ranking, steps):
    # Assume 2000 steps is the benchmark
    benchmark_steps = Decimal(2000)
    diff = Decimal(steps) - benchmark_steps

    # Simple diminishing returns algorithm:
    # Increase or decrease rank with diminishing returns
    rank_change = Decimal(100) * Decimal(math.atan(float(diff) / 1000)) / Decimal(math.pi)
    new_ranking = current_ranking + rank_change
    
    # Ensure the ranking does not go below 0
    return max(Decimal(0), new_ranking)

def calculate_new_debt(current_debt, steps):
    # Assume 2000 steps is the benchmark
    benchmark_steps = Decimal(2000)
    diff = Decimal(steps) - benchmark_steps

    # Simple diminishing returns algorithm:
    # Increase debt if steps are less than benchmark, decrease if steps are more
    if diff < 0:
        debt_change = Decimal(50) * Decimal(math.atan(float(-diff) / 500)) / Decimal(math.pi)
        new_debt = current_debt + debt_change
    else:
        debt_change = Decimal(50) * Decimal(math.atan(float(diff) / 500)) / Decimal(math.pi)
        new_debt = current_debt - debt_change

    # Ensure the debt does not go below 0
    return max(Decimal(0), new_debt)

def update_user_data(user_id, username, new_ranking, new_debt):
    table.update_item(
        Key={'userid': user_id, 'username': username},
        UpdateExpression='SET #r = :rank_val, debt = :debt_val',
        ExpressionAttributeNames={
            '#r': 'rank'
        },
        ExpressionAttributeValues={
            ':rank_val': new_ranking,
            ':debt_val': new_debt
        }
    )

def lambda_handler(event, context):
    try:
        users = fetch_all_users()
        
        for user in users:
            user_id = user['userid']
            username = user['username']
            current_ranking = user.get('rank', Decimal(500))
            current_debt = user.get('debt', Decimal(0))
            running_stats = user.get('runningStats', [])

            # Ensure running_stats is a list
            if not isinstance(running_stats, list):
                running_stats = []

            # Calculate the total steps for the past week (assuming runningStats contains daily steps)
            total_steps_past_week = sum(Decimal(step) for step in running_stats[-7:])

            # Calculate the new ranking and debt
            new_ranking = calculate_new_ranking(current_ranking, total_steps_past_week)
            new_debt = calculate_new_debt(current_debt, total_steps_past_week)
            
            # Update the user's ranking and debt in DynamoDB
            update_user_data(user_id, username, new_ranking, new_debt)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Rankings and debt updated successfully')
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }

# Test Event JSON for local testing
event = {}
context = {}

# Example usage for local testing
result = lambda_handler(event, context)
print(result)
