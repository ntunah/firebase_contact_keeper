import React, { Component } from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firestore"
import PropTypes from "prop-types"
import Spinner from "../layout/Spinner"
import {Link} from "react-router-dom"

class EditClient extends Component {
    constructor(props){
        super(props)
        // Create refs
        this.firstnameInput = React.createRef();
        this.lastnameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = e =>{
        e.preventDefault();

        const {client , firestore, history} = this.props

        //Updated client
        const updClient ={
            firstname: this.firstnameInput.current.value,
            lastname: this.lastnameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.firstnameInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        }

        firestore.update({
            collection: 'clients',
            doc: client.id
        }, updClient).then(
            history.push('/')
        )

    }

    render() {
        const { client} = this.props
        const { disableBalanceOnEdit} = this.props.settings

        if (client){
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"/>
                                Back To Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            Edit Client
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstname">first Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        minLength="3"
                                        required
                                        ref={this.firstnameInput}
                                        defaultValue={client.firstname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">LAst Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        minLength="3"
                                        required
                                        ref={this.lastnameInput}
                                        defaultValue={client.lastname}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        ref={this.emailInput}
                                        defaultValue={client.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        minLength="10"
                                        required
                                        ref={this.phoneInput}
                                        defaultValue={client.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="balance"
                                        ref={this.balanceInput}
                                        defaultValue={client.balance}
                                        disabled = {disableBalanceOnEdit}
                                    />
                                </div>

                                <input
                                 type="submit" 
                                 value="Edit Client" 
                                 className ="btn btn-success btn-block"/>

                            </form>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Spinner/>
        }
        
    }
}

EditClient.protoTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props =>
        [{ collection: 'clients', storeAs: 'client',
        doc: props.match.params.id}]),
        connect((
            {firestore: {ordered}, settings}, props)=>({
                client: ordered.client && ordered.client[0],
                settings
            }))
)(EditClient)
