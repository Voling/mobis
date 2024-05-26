import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('mobisusers')

def get_top_players(limit):
    #scan lol
    response = table.scan(
        IndexName='userid-rank-index'
    )
    sorted_items = sorted(response['Items'], key=lambda x: x['rank'], reverse=True)[:limit]
    
    return sorted_items

def lambda_handler(event, context):
    try:
        limit = 3
        top_players = get_top_players(limit)
        
        top_players_stats = []
        for player in top_players:
            player_stats = {
                'username': player['username'],
                'rank': float(player['rank']),
            }
            top_players_stats.append(player_stats)
        
        return {
            'statusCode': 200,
            'body': json.dumps(top_players_stats)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Internal server error: {str(e)}")
        }