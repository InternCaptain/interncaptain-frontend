import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './theme';
import logger from 'redux-logger';
import userReducer from './user';
import internshipReducer from './internship';
import CVreducer from './CV';

const reducer = combineReducers({
	themeState: themeReducer,
	userState: userReducer,
	internshipState: internshipReducer,
	CVState: CVreducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
