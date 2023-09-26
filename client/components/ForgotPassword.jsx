import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [invalidCreds, setInvalidCreds] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
        return navigate('/');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('/user/forgot', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            setInvalidCreds(false);
            return handleLogin();
        } else {
            return setInvalidCreds(true);
        }
    }

    return (
        <div className="homeMain">
            <div className={`loginContainer`}>
                <h1 className="welcomeText">Forgot Password</h1>
                <div className="innerLogin">
                {invalidCreds ? <span id='invalidCreds show'>Invalid Credentials</span> : <span id='invalidCreds'>Invalid Credentials</span>}
                    <form onSubmit={handleSubmit}>
                        <input 
                        className='textInput delayOne'
                        id='usernameInput'
                        autoComplete='off'
                        type="text" 
                        placeholder="Username" 
                        onChange={event => setCredentials((prevValue) => ({...prevValue, username: event.target.value}))}
                        />
                        <input 
                        className='textInput delayOne'
                        id='passwordInput'
                        autoComplete='off'
                        type="password" 
                        placeholder="New Password"
                        onChange={event => setCredentials((prevValue) => ({...prevValue, password: event.target.value}))}
                        />
                        <input className='buttonInput delayOne' type="submit" value='Reset Password' onClick={(e) => handleSubmit(e)}/>
                        <input type='button' id='forgotPassword' value='Login' onClick={handleLogin}></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;