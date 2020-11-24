import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import theme from './theme';

const reducer = combineReducers({
	themeState: theme
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
