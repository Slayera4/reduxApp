"use strict"
import {createStore} from 'redux';
import reducers from './reducers/index'
//STEP3 define reducers


//STEP 1 create store
const store = createStore(reducers);

store.subscribe(function(){
    console.log('current state is: ', store.getState())
})
//STEP 2 create and dispatch actions

store.dispatch({type:"POST_BOOK", payload:[{
    id:1,
    title:'this is the book title',
    description: "this is the book description",
    price: 33.33},
    {
    id:2,
    title:'this is the book title',
    description: "this is the book description",
    price: 50
    }
]

});

// DISPATCH a second action
// DELETE a book
store.dispatch({type:"DELETE_BOOK", payload:{id:1,},
});

//UPDATE a book

store.dispatch({
    type:"UPDATE_BOOK",
    payload: {
        id:2,
        title:'Learn React in 24h'
    }
})