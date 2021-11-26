import GoogleLogin from "react-google-login"

const clientId = "1089937175689-q0rm1qrn5jh1nef1hat56128n0k2fkqp.apps.googleusercontent.com"

export default function Login() {

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj)

        // Timing to renew access token
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            console.log('newAuthRes:', newAuthRes);
            // saveUserToken(newAuthRes.access_token);  <-- save new token
            localStorage.setItem('authToken', newAuthRes.id_token);

            // Setup the other timer after the first one
            setTimeout(refreshToken, refreshTiming);
        };

        // Setup first refresh timer
        setTimeout(refreshToken, refreshTiming);
    }

    return <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        cookiePolicy={'single_host_origin'}
        style={{marginTop: '100px'}}
        isSignedIn={true}
    />
}