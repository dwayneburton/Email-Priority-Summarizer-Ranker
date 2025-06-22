// Import required modules and componentsimport React, { useState } from "react";
import React, { useState } from "react";
import { ReactDOM } from "react";
import Home from "./Home";
import Authentication from "./Authentication";
import "./styles/index.css";

// Main App component that manages routing between login and homepage
export default function App() {
  // Track whether user is logged in
  const [loginStatus, setLoginStatus] = useState(false);

  // Store email data after processing
  const [emailData, setEmailData] = useState(false);

  // Conditionally render either the Home page or Authentication component
  return (
    <>
      {
        loginStatus ? <Home  emailData={emailData}/> : <Authentication setEmailData={setEmailData} setLoginStatus={setLoginStatus} loginStatus={loginStatus}/>
      }
    </>
  )
}