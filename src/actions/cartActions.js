"use strict"

export function addToCart(cart){
    return {type:"ADD_TO_CART", payload:cart}
}

export function updateCart(_id, unit){
    return {type:"UPDATE_CART", _id: _id, unit: unit}
}

export function deleteFromCart(cart){
    return {type:"DELETE_FROM_CART", payload:cart}
}
