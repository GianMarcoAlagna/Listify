import * as types from '../constants/actionTypes.js';

export const addEntryActionCreator = itemValue => (
    {
        type: types.ADD_ENTRY,
        payload: {value: itemValue, checked: false, subItems: []}
    }
);

export const completeItemsActionCreator = itemKey => (
    {
        type: types.DELETE_ENTRIES,
        payload: {value: itemKey}
    }
);

export const updateCheckedItemActionCreator = itemKey => (
    {
        type: types.UPDATE_CHECK,
        payload: {value: itemKey}
    }
);

export const updateTextEditorActionCreator = text => (
    {
        type: types.UPDATE_TEXT,
        payload: text
    }
);

export const setUserDataActionCreator = user => (
    {
        type: types.SET_USER_DATA,
        payload: user
    }
);