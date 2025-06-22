# Import required libraries and modules
import cohere
import os
import functions_framework
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the Cohere API key from environment variables
api_key = os.getenv("COHERE_API_KEY")

# Initialize the Cohere client
co = cohere.Client(api_key)

# Define a Google Cloud Function to summarize email content
@functions_framework.http
def summarize(request):
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
    email_text = request_json["message"]

    # Use Cohere's summarize endpoint to process the email content
    response = co.summarize(
        text= email_text,
        length= 'medium',
        extractiveness= 'medium',
        temperature= 0,
        additional_command = 'Extract key information from emails, eliminate non-human readable and less important content, and emphasize a summarized email content in a clean flowing message.'
    )
    # Log the full response (useful for debugging in cloud logs)
    print(response)

    # Return the summary string with CORS headers
    return (response.summary, 200, headers)