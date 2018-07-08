import React from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import { deleteFromCart, updateCart, getCart } from '../../actions/cartActions';
import { bindActionCreators } from 'redux';

class Cart extends React.Component {
    componentDidMount(){
        this.props.getCart()
    }
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({ showModal: true })
    }

    close() {
        this.setState({ showModal: false })
    }

    onDelete(_id) {
        //Create a copy of the current array of books
        const currentCartToDelete = this.props.cart
        //Determine at wich index in books array is the book to be deleted
        const indexToDelete = currentCartToDelete.findIndex(
            function (cart) {
                return cart._id === _id;
            }
        )
        let cartAfterDelete = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)]


        this.props.deleteFromCart(cartAfterDelete)
    }



    renderCart() {
        var self = this;
        const cartItemsList = this.props.cart.map(function (cartArr) {
            return (
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
                                    qty. <Label bsStyle="success">{cartArr.quantity}</Label>
                                </h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{ minWidth: '300px' }}>
                                    <Button onClick={()=>self.onDecrement(cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                    <Button onClick={()=>self.onIncrement(cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                    <span>      </span>
                                    <Button bsStyle="danger" bsSize="small" onClick={() => self.onDelete(cartArr._id)}>DELETE</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            )
        });
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    Cart
            </Panel.Heading>
                <Panel.Body>
                    {cartItemsList}
                    <Row>
                        <Col xs={12}>
                            <h6> Total amount: {this.props.totalAmount}</h6>
                            <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
                                PROCEED TO CHECKOUT
                        </Button>
                        </Col>
                    </Row>
                    <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank You!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <h6>Your order has been saved</h6>
                            <p>You will recieve an email confimation</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Col xs={6}>
                                <h6>total $: {this.props.totalAmount}</h6>
                            </Col>
                            <Button onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Panel.Body>
            </Panel>


        )
    }

    renderEmpty() {
        return (<div></div>)
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1, this.props.cart)
    }

    onDecrement(_id, quantity){
        if(quantity>1){
            this.props.updateCart(_id, -1, this.props.cart)

        }
    }

    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        deleteFromCart: deleteFromCart,
        updateCart: updateCart,
        getCart:getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)