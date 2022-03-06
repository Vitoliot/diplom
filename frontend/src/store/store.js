import {applyMiddleware, combineReducers, createStore} from 'redux';
import { API_URL } from '../consts';
import initialState from './initialState';
import Reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(combineReducers(Reducers), initialState, applyMiddleware(thunkMiddleware.withExtraArgument(API_URL)));
export default store;