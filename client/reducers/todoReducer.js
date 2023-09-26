import { createReducer } from "@reduxjs/toolkit";
import * as types from '../constants/actionTypes.js';

const init = {
    entries: [],
    username: '',
    textEditor: '',
    currentParentName: '',
    currentSubItems: [],
}

const todoReducer = createReducer(init, (builder) => {
    builder.addCase(types.ADD_ENTRY, (state, action) => {
        state.entries.push(action.payload);
    })
    .addCase(types.DELETE_ENTRIES, (state) => {
        state.entries = state.entries.filter(el => !el.checked);
    })
    .addCase(types.UPDATE_CHECK, (state, action) => {
        const entry = action.payload.value;
        state.entries.forEach((el, indx) => {
            if (el.value === entry) {
                state.entries[indx].checked = state.entries[indx].checked ? false : true;
            }
        });
    })
    .addCase(types.UPDATE_SUB_CHECK, (state, action) => {
        const entry = state.currentParentName;
        state.entries.forEach((el, indx) => {
            if (el.value === entry) {
                state.entries[indx].sublist.forEach((innerEl, innerIndx) => {
                    if (innerEl.value === action.payload.value) {
                        state.entries[indx].sublist[innerIndx].checked = state.entries[indx].sublist[innerIndx].checked ? false : true;
                        state.currentSubItems = state.entries[indx].sublist;
                    }
                });
            }
        });
    })
    .addCase(types.UPDATE_TEXT, (state, action) => {
        state.textEditor = action.payload;
    })
    .addCase(types.SET_USER_DATA, (state, action) => {
        state.username = action.payload.username;
        state.textEditor = action.payload.textEditor;
        state.entries = [...action.payload.todo.items];
    })
    .addCase(types.ADD_SUB_ENTRY, (state, action) => {
        state.entries.forEach((el, indx) => {
            if (el.value === action.payload.parentItem) {
                state.currentSubItems.push({value: action.payload.value, checked: false});
                state.entries[indx].sublist.push({value: action.payload.value, checked: false});
            }
        });
    })
    .addCase(types.SET_CURRENT_ITEM, (state, action) => {
        state.entries.forEach(el => {
            if (el.value === action.payload) {
                state.currentSubItems = el.sublist;
                state.currentParentName = el.value;
            }
        });
    })
    .addCase(types.COMPLETE_SUB_ITEMS, (state, action) => {
        state.entries.forEach((el, indx) => {
            if (el.value === state.currentParentName) {
                state.entries[indx].sublist = state.entries[indx].sublist.filter(el => !el.checked);
                state.currentSubItems = state.entries[indx].sublist;
            }
        });
    });
});

export default todoReducer;