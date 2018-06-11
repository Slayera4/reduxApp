"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, deleteBook, updateBook } from './actions/booksActions';
import {logger} from 'redux-logger';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//STEP3 define reducers


//STEP 1 create store
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware);

/* store.subscribe(function () {
    console.log('current state is: ', store.getState())
}) */

import BookList from './components/pages/booksList';

render(
    <Provider store={store}>
        <BookList/>
    </Provider>
    , document.getElementById('app'))

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