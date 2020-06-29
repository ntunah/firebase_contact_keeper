import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types"
import  { compose } from "redux"
import { connect } from "react-redux"

 class AddClient extends Component {
     state ={
         firstname: '',
         lastname: '',
         phone: '',
         email: '',
         balance: ''
     }
     onSubmit = (e) =>{
         e.preventDefault();

         // getting the inserted values
         const newClient = this.state

         const {firestore , history} = this.props

         // handling balance input
         if (newClient.balance === ''){newClient.balance = 0}

         firestore.add({
             collection: 'clients'
         },newClient).then(
             () => history.push('/'))
        
     }

     onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
     }

    render() {
        const {firstname,
        lastname ,
        phone,
        email,
        balance} =this.state
        const {disableBalanceOnAdd} = this.props.settings

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link" >
                            <i className="fas fa-arrow-circle-left"/>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-hearder">Add Client</div>
                    <div className="card-body">
                        <form  onSubmit={this.onSubmit}>
                            <div className ="form-group">
                                <label htmlFor="firstname">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name = "firstname"
                                    minLength = "3"
                                    required
                                    value = {firstname}  
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className ="form-group">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name = "lastname"
                                    minLength = "3"
                                    required
                                    value = {lastname}  
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className ="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name = "email"
                                    required
                                    value = {email}  
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className ="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name = "phone"
                                    minLength = "10"
                                    required
                                    value = {phone}  
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className ="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name = "balance"
                                    value = {balance}  
                                    onChange={this.onChange}
                                    disabled = {disableBalanceOnAdd}
                                />
                                <input
                                  type="submit" 
                                  value="Add Client" 
                                  className="btn btn-primary btn-block"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    fireStore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient)
