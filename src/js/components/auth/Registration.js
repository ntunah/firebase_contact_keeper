import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { firebaseConnect } from "react-redux-firebase"
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert"

class Registration extends Component {
    state ={
        email: '',
        password: ''
    }
    componentWillMount(){
        const {allowRegistration} = this.props.settings
        if(!allowRegistration){
            this.props.history.push('/')
        }
        
    }
    onChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e =>{
        e.preventDefault()
        const {firebase, notifyUser} = this.props
        const {email, password} = this.state

        firebase.createUser({
            email,
            password
        }).catch(
            error => notifyUser('User already exist', 'error')
        )

    }

    render() {
        const {message, messageType} = this.props.nofity
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {message ? (
                                <Alert 
                                message={message}
                                messageType= {messageType}
                                />
                            ): null}
                            <h1 className="text-center pd-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock"/> 
                                    Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={this.onChange}
                                        value = {this.state.email}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={this.onChange}
                                        value = {this.state.password}
                                        className="form-control"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-primary btn-block"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Registration.propType ={
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state,props)=>({
        nofity: state.notify,
        settings: state.settings
    }),{
        notifyUser
    })
)(Registration)
