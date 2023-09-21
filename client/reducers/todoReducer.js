import { createReducer } from "@reduxjs/toolkit";
import * as types from '../constants/actionTypes.js';

const init = {
    entries: {},
    username: '',
    entriesLength: 0,
    textEditor: '',
}

const todoReducer = createReducer(init, (builder) => {
    builder.addCase(types.ADD_ENTRY, (state, action) => {
        state.entries[action.payload.value] = action.payload;
        state.entries[action.payload.value].checked = false;
        state.entriesLength++;
    })
    .addCase(types.DELETE_ENTRIES, (state) => {
        for(const entry in state.entries) {
            if(state.entries[entry].checked) {
                delete state.entries[entry];
                state.entriesLength--;
            }
        }
    })
    .addCase(types.UPDATE_CHECK, (state, action) => {
        const entry = action.payload.value;
        state.entries[entry].checked = state.entries[entry].checked ? false : true;
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