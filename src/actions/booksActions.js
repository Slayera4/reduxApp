
export function postBooks(book){
    return {type:"POST_BOOK", payload:book}
}
//GET BOOKS
export function getBooks(){
    return {type:"GET_BOOK"}
}
//DELETE A BOOK
export function deleteBook(book){
    return {type:"DELETE_BOOK", payload:book}
}
//UPDATE A BOOK
export function updateBook(book){
    return {type:"UPDATE_BOOK", payload:book}
}