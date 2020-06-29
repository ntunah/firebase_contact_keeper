import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { firebaseConnect } from "react-redux-firebase"
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert"

class Login extends Component {
    state ={
        email: '',
        password: ''
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

        firebase.login({
            email,
            password
        }).catch(
            error => notifyUser('Invalid login details', 'error')
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
                                    Login
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
                                    value="Login"
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

Login.propType ={
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state,props)=>({
        nofity: state.notify
    }),{
        notifyUser
    })
)(Login)
