import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../actions/todoActions.js';
import styled from "styled-components";

const SubCreator = styled.form`
    align-self: flex-start;
    justify-self: flex-start;
    width: 20vw;
    padding: 0px;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const SubCreatorSubmit = styled.input`
    background-color: rgb(89, 189, 255);
    color: rgb(255, 255, 255);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    margin: 4px;
    width: 10vw;
    height: 6vh;
    height: 5vh;
    border-radius: 8px;
    border: 2px solid white;
    transition: transform 1s;

    &:hover {
        transform: scale(1.1);
    }
`

const SubCreatorText = styled.input`
    backdrop-filter: blur(8px);
    color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 10px;
    background-color: rgb(0, 0, 0, 0);
    width: 14vw;
    height: 4vh;
    border-radius: 8px;
    font-size: large;
    font-weight: 500;
    cursor: text;
    border: 2px solid white;
    transition: transform 1s;

    &:hover {
        transform: translateY(-5px);
    }
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