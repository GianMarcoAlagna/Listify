import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/todoActions.js';
import { sendSignoutRequest, sendUserData } from '../utils/fetchUserData.js';
import formatState from '../utils/formatState.js';
import { useRef } from 'react';

const NavBar = ({ reference, innerText, path, textEditorRef }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.todoReducer);
    const mainRef = useRef(null);

    const handleLink = () => {
        if (innerText === 'Todo List') {
            dispatch(actions.updateTextEditorActionCreator(textEditorRef.current.getContent()));
        }
        reference.current.classList.add('LinkClickTransition');
        mainRef.current.classList.add('NavBarClickTransition');
        setTimeout(() => {
            reference.current.classList.remove('LinkClickTransition');
            mainRef.current.classList.remove('NavBarClickTransition');
            return navigate('/' + path);
        }, 950);
    }
    const handleSignout = () => {
        sendUserData(formatState(userState))
        .then(() => {
            sendSignoutRequest()
            .then(res => {            
                if(res === 200) {
                    localStorage.removeItem('isLoggedIn');
                    reference.current.classList.add('LinkClickTransition');
                    setTimeout(() => {
                        reference.current.classList.remove('LinkClickTransition');
                        return navigate('/');
                    }, 950);
                } else {
                    return console.log('Signout Failed');
                }
            });
        });
    }

    return (
        <div ref={mainRef} className='navbar'>
            <button onClick={handleSignout} type="button" className='SubMenuButton'>Signout</button>
            <ul>
                <li>
                    <button onClick={handleLink} className='RouterLink'>
                        { innerText }
                    </button>
                </li>
            </ul>
            <a className='SubMenuButton' id='navSource' href='https://github.com/GianMarcoAlagna/Listify' target='_blank' rel='noreferrer'>Source</a>
        </div>
    );
}

export default NavBar;
