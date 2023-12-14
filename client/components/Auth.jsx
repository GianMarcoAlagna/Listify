import { useEffect, useRef, useState } from 'react';
import '../css/Auth.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import fetchUserData from '../utils/fetchUserData.js';
import * as actions from '../actions/todoActions.js';
import Splash from './splash.jsx';

function Auth() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [invalidCreds, setInvalidCreds] = useState(false);
    const [signup, setSignup] = useState(true)
    const [successLogin, setSuccessLogin] = useState(false);
    const [splash, setSplash] = useState(true);

    const dispatch = useDispatch();
    const invalidCredsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async function getData() {
            if (localStorage.getItem('isLoggedIn') && Date.now() < Number(localStorage.getItem('isLoggedIn'))) {
                const userData = await fetchUserData();
                dispatch(actions.setUserDataActionCreator(userData));
                navigate('/todo');
            }
        })();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const res = (signup ? await fetch('/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }) :
            await fetch('user/login', {
                method: 'POST',
                body: JSON.stringify({ username: credentials.username, password: credentials.password }),
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }));

        if (res.status === 200) {
            setSuccessLogin(true);
            /*
            Get User's Data from server and navigate to todo page,
            on successful authentication
             */
            const userData = await fetchUserData();
            dispatch(actions.setUserDataActionCreator(userData));
            localStorage.setItem('isLoggedIn', Date.now() + 24 * 60 * 60 * 1000);
            setTimeout(() => {
                setInvalidCreds(false);
                return navigate('/todo')
            }, 1000);
        } else if (res.status === 400) {
            invalidCredsRef.current.innerText = 'User Already Exists';

            return setInvalidCreds(true);
        } else {
            invalidCredsRef.current.innerText = 'Invalid Credentials';

            return setInvalidCreds(true);
        }
    }

    function setMode() {
        return setSignup(!signup);
    }

    function handleForgotPassword() {
        return navigate('/forgot-password');
    }

    //! don't need this anymore because we use <a> tag to redirect to google's oauth
    // async function oAuth() {
    //     //* using client side redirect, we do this because fetch doesn't allow play nice with google's oauth, cors, and react-router
    //     window.location.href = '/auth/google';

    //     //* to use fetch we'd have to set mode to no-cors, but then we can't access the response, which is actually fine because we don't need it
    //     //! doing this with mode set to cors will cause a cors error, this is because google doesn't seem to allow cors requests
    //     //! this is because when cors is enabled the request will send a preflight request which will be expecting the header Access-Control-Allow-Origin: * which google doesn't send
    //     // fetch('/auth/google', {
    //     //     method: 'GET',
    //     //     //? mode: 'no-cors',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     }
    //     // }).then(res => {
    //     //     console.log(res);
    //     // }).catch(err => {
    //     //     console.log(err);
    //     // });
    // }

    return (
        splash
            ? <Splash setSplash={setSplash} />
            : (<div className="homeMain">
                <div className={`loginContainer ${successLogin ? "closeAnim" : ""}`}>
                    <h1 className="welcomeText">{signup ? "Signup" : "Login"}</h1>
                    <div className="innerLogin">
                        <form onSubmit={handleSubmit}>
                            {invalidCreds ? <span ref={invalidCredsRef} id='invalidCreds show'>Invalid Credentials</span> : <span ref={invalidCredsRef} id='invalidCreds'>Invalid Credentials</span>}
                            <input
                                className='textInput delayOne'
                                id='usernameInput'
                                autoComplete='off'
                                type="text"
                                placeholder="Username"
                                onChange={event => setCredentials((prevValue) => ({ ...prevValue, username: event.target.value }))}
                            />
                            <input
                                className='textInput delayOne'
                                id='passwordInput'
                                autoComplete='off'
                                type="password"
                                placeholder="Password"
                                onChange={event => setCredentials((prevValue) => ({ ...prevValue, password: event.target.value }))}
                            />
                            <input className='buttonInput delayOne' type="submit" value={signup ? "Signup" : "Login"} />
                            {signup ? <input id="toggleButton" type="button" value="Login" onClick={setMode} /> : <input id="toggleButton" type="button" value="Sign Up" onClick={setMode} />}
                            <a id="oAuthButton" type="button" value="Login" href='/auth/google'>
                                <span>Authenticate with</span>&nbsp;<span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                                <img width="50" height="50" src="https://img.icons8.com/bubbles/50/google-logo.png" alt="Sign in with Google" /></a>
                            <input type='button' id='forgotPassword' value='Forgot Password' onClick={handleForgotPassword}></input>
                        </form>
                    </div>
                    <footer id='credits'>
                        <div id='anchorsContainer'>
                            <a id='creditsAnchor' href="https://github.com/GianMarcoAlagna/Listify">Source</a>
                            <a id='creditsAnchor' href="https://github.com/GianMarcoAlagna">Made with ❤️ by Gian-Marco Alagna</a>
                        </div>
                    </footer>
                </div>
            </div>)
    );
}

export default Auth;