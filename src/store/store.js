import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import itemsReducer from './itemsSlice';

const reducer = combineReducers({
  modals: modalReducer,
  items: itemsReducer
});

export default configureStore({
  reducer,
});
