import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer.js';

const reducers = {
    todoReducer: todoReducer
};

const store = configureStore({
    reducer: reducers
});

export default store;