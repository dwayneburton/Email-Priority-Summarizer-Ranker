// Import GoogleLogin component for OAuth authentication
import {GoogleLogout} from 'react-google-login';

// Google OAuth Client ID
const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;

// Logout component to handle Google sign-out
function Logout() {
    // Callback when login is successful
    const onSuccess = (res) => {
        console.log("Logout successfull!");
    }

    // Render the Google logout button
    return (
        <div id="signInButton">
        <GoogleLogout clientId={clientId} buttonText={"Logout"} onLogoutSuccess={onSuccess}/>
        </div>
    );
}

export default Logout;