import * as types from '../constants/actionTypes.js';

export const addEntryActionCreator = itemValue => (
    {
        type: types.ADD_ENTRY,
        payload: {value: itemValue, checked: false, sublist: []}
    }
);

export const addSubEntryActionCreator = (parentItem, itemValue) => (
    {
        type: types.ADD_SUB_ENTRY,
        payload: {parentItem: parentItem, value: itemValue, checked: false}
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

export const updateCheckedSubItemActionCreator = itemKey => (
    {
        type: types.UPDATE_SUB_CHECK,
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

export const setCurrentItemActionCreator = item => (
    {
        type: types.SET_CURRENT_ITEM,
        payload: item
    }
);

export const completeSubItemsActionCreator = item => (
    {
        type: types.COMPLETE_SUB_ITEMS,
        payload: item
    }
);

export const setLoadingActionCreator = () => (
    {
        type: types.SET_LOADING
    }
);
