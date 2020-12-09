import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './theme';
import logger from 'redux-logger';

const reducer = combineReducers({
	themeState: themeReducer
});

const store = createStore(reducer, applyMiddleware(
	thunk, logger
));

export default store;
