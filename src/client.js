"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import { logger } from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes'
//STEP3 define reducers


//STEP 1 create store
const middleware = applyMiddleware(thunk, logger)
//WE WILL  PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, middleware);

/* store.subscribe(function () {
    console.log('current state is: ', store.getState())
}) */

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
)

render(
    Routes, document.getElementById('app')
);

// DISPATCH a second action
// DELETE a book
/* store.dispatch(deleteBook({ id: 1 }))


//UPDATE a book

store.dispatch(updateBook({
    id: 2,
    title: 'Learn React in 24h'
}))


// -->> CART ATIONS <<--
//ADD to cart

store.dispatch(addToCart([{
    id: 1
}])); */