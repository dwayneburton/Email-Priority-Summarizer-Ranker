// Import GoogleLogin component for OAuth authentication
import {GoogleLogin} from 'react-google-login';

// Google OAuth Client ID
const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// Login component for authenticating users with Google
function Login(props) {
    // Callback when login is successful
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert("Please be patient, we are preparing your emails 😋")
    }

    // Callback when login fails
    const onFailure = (res) => {
        console.log('Login Failed: res:', res);
    }
    
    // Render the Google login button
    return (
        <div id="signInButton">
            <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={true} className="large-button"/>
        </div>
    )
}

export default Login;