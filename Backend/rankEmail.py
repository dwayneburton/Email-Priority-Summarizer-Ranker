# Import required libraries and modules
import cohere
import os
import json
import functions_framework
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the Cohere API key from environment variables
api_key = os.getenv("COHERE_API_KEY")

# Initialize the Cohere client
co = cohere.Client(api_key)

# Define a Google Cloud Function to rank emails based on urgency
@functions_framework.http
def rankEmail(request):
    # Handle preflight OPTIONS request for CORS
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)
    
    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}

    # Parse incoming JSON request
    request_json = request.get_json()
    summarized_emails = request_json["message"]

    # Use Cohere's rerank model to rank emails based on urgency
    results = co.rerank(
        model = 'rerank-english-v2.0',
        documents = summarized_emails,
        query='Which of these emails require the most imediate attention and require an urgent follow up?'
    )

    # Create a response array of [relevance_score, email_text] pairs
    response_array = []
    for i, email in enumerate(results):
        response_array.append([email.relevance_score, email.document['text']])

    # Return the ranked result as a JSON response with CORS headers
    response = json.dumps(response_array)
    return (response, 200, headers)