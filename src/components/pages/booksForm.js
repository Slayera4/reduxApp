import React from 'react'
import {Well,Panel, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

class BooksForm extends React.Component{
    render(){
        return(
            <Well>
                <Panel>
                    <Panel.Body>
                        <FormGroup controlId="title">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Enter Title" ref="title"/>
                        </FormGroup>
                        <FormGroup controlId="description">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="text" placeholder="Enter Description" ref="description"/>
                        </FormGroup>
                        <FormGroup controlId="price">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl type="text" placeholder="Enter Price" ref="price"/>
                        </FormGroup>
                    </Panel.Body>
                </Panel>
            </Well>
        )
    }
}

export default BooksForm