import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import fixturesReducer from './reducers';

const rootReducer = combineReducers({fixturesReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));