import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './theme';
import logger from 'redux-logger';
import userReducer from './user';
import internshipReducer from './internship';

const reducer = combineReducers({
	themeState: themeReducer,
	userState: userReducer,
	internshipState: internshipReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
