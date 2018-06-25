"use strict"

//CART REDUCERS

export function cartReducers(state={cart:[]}, action){
    switch(action.type){
        case("ADD_TO_CART"):
        /* return{cart:[...state.cart, ...action.payload], totalAmount:totals(action.payload).amount,
            totalQty: totals(action.payload).qty
        } */

        return {cart:[...state.cart, ...action.payload], totalAmount:totals(state.cart,action.payload).amount, totalQty: totals(state.cart,action.payload).qty
        }

        case("DELETE_FROM_CART"):
        return{cart:[...action.payload], totalAmount:totalsUpdateAndDelete(action.payload).amount,
            totalQty: totalsUpdateAndDelete(action.payload).qty}

        case("UPDATE_CART"):
                    //Create a copy of the current array of books
                    const currentBookToUpdate = [...state.cart]
                    //Determine at wich index in books array is the book to be updated
                    const indexToUpdate = currentBookToUpdate.findIndex(
                        function(book){
                            return book._id === action._id;
                        }
                    )
                    const newBookToUpdate = {
                        ...currentBookToUpdate[indexToUpdate],
                        quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
                    }
        

                    
                       let cartUpdate =  [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]
                    return {...state, cart:cartUpdate, totalAmount:totalsUpdateAndDelete(cartUpdate).amount, totalQty: totalsUpdateAndDelete(cartUpdate).qty
                    }
    }
    return state

}


// CALCULATE TOTALS

export function totalsUpdateAndDelete(payloadArr){

    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity
    }).reduce(function(a, b){return a + b; }, 0)

    
    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0)
    return{amount: totalAmount.toFixed(2), qty: totalQty}
}
export function totals(cart,payloadArr){
    console.log(payloadArr)
    let totalAmount = 0
    let totalQuty = 0
    console.log("this is the cart")
    console.log(cart)
    if(cart.length===0){
    payloadArr.map(function(book){
        const localResult = book.quantity*book.price
        totalAmount=totalAmount+localResult
        totalQuty = totalQuty + book.quantity
        console.log(totalAmount)
    })}else{
        payloadArr.map(function(book){
            const localResult = book.quantity*book.price
            totalAmount=cart.map(function(book2){
                return book2.quantity*book2.price
            })
            totalAmount=Number(totalAmount)+Number(localResult)
        })


        payloadArr.map(function(book){
            const localQty = book.quantity
            totalQuty = cart.map(function(book2){
                return book2.quantity
            })
            console.log("total cart" + totalQuty)
            console.log("total payload" + localQty)

            totalQuty = Number(totalQuty) + Number(localQty)
            console.log("total " + totalQuty)

        })
    }
/*     const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0) */
    return{amount: Number(totalAmount), qty: totalQuty}
    
}