import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/todoActions.js';
import { sendSignoutRequest, sendUserData } from '../utils/fetchUserData.js';
import formatState from '../utils/formatState.js';

const NavBar = ({ reference, innerText, path, textEditorRef }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.todoReducer);

    const handleLink = () => {
        if (innerText === 'Todo List') {
            console.log(textEditorRef.current.getContent())
            dispatch(actions.updateTextEditorActionCreator(textEditorRef.current.getContent()));
        }
        reference.current.classList.add('LinkClickTransition');
        setTimeout(() => {
            reference.current.classList.remove('LinkClickTransition');
            return navigate('/' + path);
        }, 950);
    }
    const handleSignout = () => {
        sendUserData(formatState(userState))
        .then(() => {
            sendSignoutRequest()
            .then(res => {            
                if(res=== 200) {
                    reference.current.classList.add('LinkClickTransition');
                    setTimeout(() => {
                        reference.current.classList.remove('LinkClickTransition');
                        return navigate('/');
                    }, 950);
                } else {
                    console.log(res)
                    return console.log('Signout Failed');
                }
            });
        });
    }

    return (
        <div className='navbar'>
            <button onClick={handleSignout} type="button" className='SubMenuButton'>Signout</button>
            <ul>
                <li>
                    <button onClick={handleLink} className='RouterLink'>
                        { innerText }
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
