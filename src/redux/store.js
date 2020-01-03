import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //--> storing data inlocal storage Memoizing
//--> to stop rerender unchange data typically component

import logger from 'redux-logger'; //==> logs the actions with payloads

import persistReducer from './root-reducer';

const middlewares = []; //==> logger is empty in the production

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger); //--> logger middleware available in the development
}

export const store = createStore(
	persistReducer, //-------> i have changed the root reducer to presist reducer because root reducer not exported
	applyMiddleware(...middlewares),
);

export const persistor = persistStore(store); //--> for memoizing

export default { store, persistStore }; //--> both exported but we can tell what reducer to tract using memoizing
