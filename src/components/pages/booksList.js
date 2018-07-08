import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions'
import { Row, Col, Grid, Carousel } from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm'
import Cart from './cart';
class BooksList extends React.Component {
    componentDidMount() {
        //Dispatch an action
        this.props.getBooks();
    }
    render() {
        const bookList = this.props.books.map(function (booksArr) {
            return (
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price} />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x300" src="/images/book1.jpeg" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x300" src="/images/book2.jpg" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x300" src="/images/book3.jpg" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>;
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row style={{ marginTop: '15px' }}>
                    {bookList}
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBooks: getBooks }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList)