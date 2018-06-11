"use strict"
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, deleteBook, updateBook } from './actions/booksActions';
import {logger} from 'redux-logger';
//STEP3 define reducers


//STEP 1 create store
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware);

/* store.subscribe(function () {
    console.log('current state is: ', store.getState())
}) */
//STEP 2 create and dispatch actions
store.dispatch(postBook([{
    id: 1,
    title: 'this is the book title',
    description: "this is the book description",
    price: 33.33
},
{
    id: 2,
    title: 'this is the book title',
    description: "this is the book description",
    price: 50
}
]));

// DISPATCH a second action
// DELETE a book
store.dispatch(deleteBook({ id: 1 }))


//UPDATE a book

store.dispatch(updateBook({
    id: 2,
    title: 'Learn React in 24h'
}))


// -->> CART ATIONS <<--
//ADD to cart

store.dispatch(addToCart([{
    id: 1
}]));