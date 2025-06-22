// Import required libraries and components
import {useEffect, useState} from 'react';
import {gapi} from 'gapi-script';
import axios from 'axios';
import LoginButton from './login'
import LogoutButton from './logout'
import "./styles/App.css"

// Environment variables for API credentials and endpoints
const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;
const summarize_url = process.env.REACT_APP_GOOGLECLOUD_SUMMARIZE;
const rank_url = process.env.REACT_APP_GOOGLECLOUD_RANK;

// Authentication component handles Google sign-in, email fetching, summarization, and ranking
function Authentication({ setEmailData, setLoginStatus, loginStatus , setLoadStatus }) {
  // Arrays to store message objects, decoded raw emails, and summarized results
  let messagesArray = [];
  let decodedMessagesArray = [];
  let summarized_emails = [];

  // HTTP headers for POST requests
  const headers = {
    'Content-Type': 'application/json'
  };

  // Load and initialize Google API client
  useEffect(() => {
    gapi.load('client:auth2', start);

    async function start() {
      await gapi.client.init({
        clientId: clientId,
        scope: ''
      });

  }}, []);

  // Main effect to fetch emails, summarize, rank, and update app state
  useEffect(() => {
      let access_token;

      // Delay slightly to allow login to complete
      setTimeout(() => {
        try {
          // Get the Google access token
          access_token = gapi.auth.getToken().access_token;
          console.log(access_token);

        (async () => {
          try {
            // Fetch list of Gmail messages
            const response = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, {
              headers: {
                'Authorization': `Bearer ${access_token}`,
              },
            });
        
            let messages = response.data.messages;
            console.log('Email messages:',  messages);

            if (messages && messages.length > 0) {
              // Fetch raw data for each message and decode it
              for (const message of messages) {
                  const messageId = message.id;

                  const messageResponse = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
                    headers: {
                      'Authorization': `Bearer ${access_token}`,
                    },
                    params: {
                      format: 'raw',
                    }
                  });

                  messagesArray.push(messageResponse.data);
                  console.log(messageResponse.data);

                  // Decode base64 URL-safe string
                  const decodedString = atob(messageResponse.data.raw.replace(/-/g, '+').replace(/_/g, '/'));
                  decodedMessagesArray.push(decodedString);

              }

              // Summarize each decoded email using the Cohere API
              for (const email of decodedMessagesArray) {
                  const data = {
                      message: `${email}`
                  };
        
                  try {
                      const response = await axios.post(summarize_url, JSON.stringify(data), { headers: headers });
                      console.log(response.data);
                      summarized_emails.push(response.data);
                  } catch (error) {
                      console.error(' summarize_url Error: ', error);
                  }
              }
              console.log(summarized_emails);

              // Rank the summarized emails by priority
              const rankData = {
                  message: summarized_emails
              };
        
              try {
                  const rankResponse = await axios.post(rank_url, JSON.stringify(rankData), { headers });
                  console.log(rankResponse.data);
                  setEmailData(rankResponse.data);  // Store ranked summaries
                  setLoginStatus(true);             // Mark user as logged in
              } catch (error) {
                  console.error('Error: ', error);
              }

          } } catch (error) {
            console.error('Error fetching emails:', error);
          }
      })();
      
    } catch {
      console.log("Not logged in");
    }

    },1000);
  
  },[loginStatus]);

  // Render login button UI
  return(
    <div className="Login">
        <div className="Login-block">
            <LoginButton className="login-btn"/>
        </div>
    </div>
  )

}
  
export default Authentication;