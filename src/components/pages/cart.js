import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteFromCart} from '../../actions/cartActions'
import { bindActionCreators } from 'C:/Users/Slasher/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-redux/node_modules/redux';
import { runInThisContext } from 'vm';

class Cart extends React.Component{

    onDelete(_id){
         //Create a copy of the current array of books
         const currentCartToDelete = this.props.cart
         //Determine at wich index in books array is the book to be deleted
         const indexToDelete = currentCartToDelete.findIndex(
             function(cart){
                 return cart._id === _id;
             }
         )
         let cartAfterDelete = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)]


        this.props.deleteFromCart(cartAfterDelete)
    }

    renderCart(){
        var self =this;
        const cartItemsList = this.props.cart.map(function(cartArr){
            return(
                <Panel key={cartArr._id}>
                <Panel.Body>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>
                                {cartArr.title}
                            </h6><span>      </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>
                                usd. {cartArr.price}
                            </h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>
                                qty. <Label bsStyle="success"></Label>
                            </h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                            <Button bsStyle="default" bsSize="small">-</Button>
                            <Button bsStyle="default" bsSize="small">+</Button>
                            <span>      </span>
                            <Button bsStyle="danger" bsSize="small" onClick={()=> self.onDelete(cartArr._id)}>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel.Body>
                </Panel>
            )
        });
        return(
        <Panel bsStyle="primary">
            <Panel.Heading>
                Cart
            </Panel.Heading>
            <Panel.Body>
                {cartItemsList} 
            </Panel.Body>
        </Panel>
    )
    }

    renderEmpty(){
        return(<div></div>)
    }

    render(){
        if (this.props.cart[0]) {
            return this.renderCart();
        }else{
            return this.renderEmpty();
        }
    }
}
function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({deleteFromCart:deleteFromCart},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)