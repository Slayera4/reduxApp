"use strict"
import axios from 'axios'


let newCart = []
export function addToCart(book) {
    newCart = [...newCart, book]
    console.log(newCart)
      return function (dispatch) {
        axios.post("/api/cart", newCart)
            .then(function (response) {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data
                })
            })
            .catch(function (err) {

                dispatch({
                    type: "ADD_TO_CART_REJECTED", 
                    msg:  'error when adding to the cart'
                })
            })
    }  
}


// GET CART
export function getCart() {
    return function (dispatch) {
        axios.get("/api/cart")
            .then(function (response) {
                dispatch({
                    type: "GET_CART",
                    payload: response.data
                })
                newCart=response.data
                console.log(newCart)
            })
            .catch(function (err) {
                dispatch({
                    type: "GET_CART_REJECTED",
                    payload: err
                })
            })
    }
}

export function updateCart(_id, unit, cart) {

    //Create a copy of the current array of books
    const currentBookToUpdate = cart
    //Determine at wich index in books array is the book to be updated
    const indexToUpdate = currentBookToUpdate.findIndex(
        function (book) {
            return book._id === _id;
        }
    )
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    }



    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

    return function (dispatch) {
        axios.post("/api/cart", cartUpdate).then(
            function (response) {
                dispatch({ type: "UPDATE_CART", payload: response.data })
            }
        ).catch(function (err) {
            dispatch({ type: "UPDATE_REJECTED", msg: 'error when adding to the cart' })
        })
    }
}

export function deleteFromCart(cart) {
    return { type: "DELETE_FROM_CART", payload: cart }
}
