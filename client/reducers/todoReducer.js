import { createReducer } from "@reduxjs/toolkit";
import * as types from '../constants/actionTypes.js';

const init = {
    entries: [],
    username: '',
    textEditor: '',
}

const todoReducer = createReducer(init, (builder) => {
    builder.addCase(types.ADD_ENTRY, (state, action) => {
        state.entries[state.entries.length] = action.payload;
    })
    .addCase(types.DELETE_ENTRIES, (state) => {
        state.entries = state.entries.filter(el => !el.checked);
    })
    .addCase(types.UPDATE_CHECK, (state, action) => {
        const entry = action.payload.value;
        state.entries.forEach((el, indx) => {
            if(el.value === entry) {
                state.entries[indx].checked = state.entries[indx].checked ? false : true;
            }
        });
    })
    .addCase(types.UPDATE_TEXT, (state, action) => {
        state.textEditor = action.payload;
    })
    .addCase(types.SET_USER_DATA, (state, action) => {
        console.log(action.payload);
        state.username = action.payload.username
    })
});

export default todoReducer;