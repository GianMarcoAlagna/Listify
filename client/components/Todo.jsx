import '../css/Todo.css';
import TodoDisplay from './TodoDisplay.jsx';
import TodoCreator from './TodoCreator.jsx';
import { useSelector, useDispatch} from 'react-redux';
import { useRef, useState } from 'react';
import * as actions from '../actions/todoActions.js';
import NavBar from './NavBar.jsx';

function Todo() {
    const entries = useSelector(state => state.todoReducer.entries); // This is the todos
    const username = useSelector(state => state.todoReducer.username);
    const dispatch = useDispatch();
    const [animate, setAnimate] = useState(false);
    const mainRef = useRef(null); // this ref is used mainly for animating the main div conditionally

    const handleComplete = () => {
        setAnimate(true);
        setTimeout(() => {
            dispatch(actions.completeItemsActionCreator());
            setAnimate(false);
        }, 400);
    }

    return (
        <>
            <NavBar reference={mainRef} innerText={'Text Editor'} path={'text'} />
            <div ref={mainRef} className='todoMain'>
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
            </div>
        </>
    );
}

export default Todo;