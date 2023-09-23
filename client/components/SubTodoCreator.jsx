import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../actions/todoActions.js';
import styled from "styled-components";

const SubCreator = styled.form`
    align-self: flex-start;
    justify-self: flex-start;
    width: 20vw;
    padding: 10px;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    // align-items: center;
    // border: 2px solid white;
`

const SubCreatorSubmit = styled.input`
    background-color: rgb(89, 189, 255);
    color: rgb(255, 255, 255);
    margin: 3px;
    width: fit-content;
    height: 5vh;
    border-radius: 8px;
    border: 2px solid white;
`

const SubCreatorText = styled.input`
    backdrop-filter: blur(8px);
    background-color: rgb(0, 0, 0, 0);
    width: 14vw;
    height: 4vh;
    border-radius: 8px;
    font-size: large;
    font-weight: 500;
    cursor: text;
    border: 2px solid white;
`

function SubTodoCreator() {
    const [itemName, setItemName] = useState('');
    const dispatch = useDispatch();
    const currentParentName = useSelector(state => state.todoReducer.currentParentName);
    function handleSubmit(e) {
        e.preventDefault();
        const id = itemName;
        setItemName('');
        return id.length ? dispatch(actions.addSubEntryActionCreator(currentParentName, id)) : false;
    }

    return (
        <SubCreator onSubmit={handleSubmit}>
            <SubCreatorText 
                type="text" 
                name="itemCreatorBox" 
                value={itemName}
                onChange={(e) => {
                    setItemName(e.target.value)
                }}
            />
            <SubCreatorSubmit type="submit" value="Create" />
        </SubCreator>
    )
}

export default SubTodoCreator;