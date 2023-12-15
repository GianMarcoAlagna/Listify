import '../css/Todo.css';
import TodoDisplay from './TodoDisplay.jsx';
import TodoCreator from './TodoCreator.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions/todoActions.js';
import NavBar from './NavBar.jsx';
import fetchUserData from '../utils/fetchUserData.js';

function Todo() {
    const entries = useSelector(state => state.todoReducer.entries); // This is the todos
    const username = useSelector(state => state.todoReducer.username);
    const isLoading = useSelector(state => state.todoReducer.isLoading);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);
    const mainRef = useRef(null); // this ref is used mainly for animating the main div conditionally

    const handleComplete = () => {
        setAnimate(true);
        setTimeout(() => {
            dispatch(actions.completeItemsActionCreator());
            setAnimate(false);
        }, 400);
    }

    useEffect(() => {
        fetchUserData((data, err) => {
            if (err) {
                localStorage.removeItem('isLoggedIn');
                return navigate('/auth');
            } else {
                dispatch(actions.setUserDataActionCreator(data));
                localStorage.setItem('isLoggedIn', Date.now() + 24 * 60 * 60 * 1000);
            }
        });
    }, []);

    return (
        <div>
            <NavBar reference={mainRef} innerText={'Text Editor'} path={'text'} />
            <div ref={mainRef} className='todoMain'>
                {
                    isLoading
                        ? <div className='loading'>Loading...</div>
                        : (<>
                            <div className='creator'>
                                <span className='todoSpan'>{username ? `What are we doing today ${username}?` : '...'}</span>
                                <TodoCreator subList={false} />
                            </div>
                            <input
                                id='completeButton'
                                type="button"
                                value="Complete"
                                onClick={() => {
                                    handleComplete();
                                }}
                            />
                            <div className='display'>
                                <TodoDisplay entries={entries} animate={animate} />
                            </div>
                        </>)
                }
            </div>
        </div>
    );
}

export default Todo;