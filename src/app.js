"use strict"
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, deleteBook, updateBook } from './actions/booksActions';
import {logger} from 'redux-logger';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import BookList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
//STEP3 define reducers


//STEP 1 create store
const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware);

/* store.subscribe(function () {
    console.log('current state is: ', store.getState())
}) */

const Routes = (
    <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/" component={Main}>
    <IndexRoute
   component={BookList}/>
    <Route path="/admin"
component={BooksForm}/>
 <Route path="/cart"
component={Cart}/>
 </Route>
 </Router>
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