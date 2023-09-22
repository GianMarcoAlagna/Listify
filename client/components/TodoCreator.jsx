import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../actions/todoActions.js';

function TodoCreator({ subList }) {
    const [itemName, setItemName] = useState('');

    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        const id = itemName;
        setItemName('');
        return id.length ? dispatch(actions.addEntryActionCreator(id)) : false;
    }

    return (
        <form onSubmit={handleSubmit} className={subList ? 'subCreatorForm' : 'creatorForm' }>
            <input 
                className="todoInput" 
                type="text" 
                name="itemCreatorBox" 
                id="itemCreatorBox"
                value={itemName}
                onChange={(e) => {
                    setItemName(e.target.value)
                }}
            />
            <input id="createButton" className="todoInput" type="submit" value="Create" />
        </form>
    )
}

export default TodoCreator;