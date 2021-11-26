import GoogleLogout from "react-google-login"

const clientId = "1089937175689-q0rm1qrn5jh1nef1hat56128n0k2fkqp.apps.googleusercontent.com"

export default function Logout() {
    return <GoogleLogout clientId={clientId} buttonText="Logout"/>
}