import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {makeRequest} from "../conteiners/requset";
import Inp from "./child";
import {Alert} from "react-bootstrap";
import {Spinner} from "react-bootstrap";
import sign_in from "./untitled.png"
import style from "./root.css"

const registerInps = [

    {
        name: 'user',
        validateRe: /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/,
        type: 'text',
        label: "Логин"
    },
    {
        name: 'password',
        validateRe: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        type: 'password',
        label: 'Пароль'
    }
]


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            redirect: false,
            message: ""
        }
        this.formData = {};
        this.formValid = false;
        this.reqSuccess = this.reqSuccess.bind(this);
        this.reqError = this.reqError.bind(this);
        this.closeMessage = this.closeMessage.bind(this);

    }

    closeMessage() {
        this.setState({showError: false});
        this.forceUpdate();
    }

    reqSuccess() {
        this.setState({redirect: true})
    }

    reqError(message) {
        this.setState({showSpinner: false, redirect: false, showError: true, message: message});
       setTimeout(this.closeMessage, 5000)
    }

    handleSubmit(e) {
        e.preventDefault();
            this.setState({showSpinner: true}, makeRequest(this.formData, "POST", "/login", undefined, this.reqSuccess, this.reqError))
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
        this.formValid = valid;
    };

    /* todo componentWillUnmount(){
        this.props.refreshNav();
         <button id="close" className={" btn btn-dark "} onClick={this.closeMessage.bind(this)}>Закрыть
                        </button>
    }*/

    render() {
        return (
            <div className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">SIGN IN</h1>
                </div>
                <div className="container container_root">
                    {this.state.redirect && <Redirect to="/user"/>}
                    <div className="form-group">
                        {registerInps.map((registerInp) =>
                            <Inp label={registerInp.label} onBlur={this.updateData.bind(this)}
                                 name={registerInp.name} type={registerInp.type}
                                 r={registerInp.validateRe}/>
                        )}
                        <button onClick={this.handleSubmit.bind(this)}
                                style={{
                                    borderRadius: "21px",
                                    width: "104px",
                                    backgroundColor: "#49b651",
                                    color: "white"
                                }}
                                disabled={this.state.showSpinner}
                                className="  btn root_button">{this.state.showSpinner ?
                            <Spinner animation="border"/> : "Войти"}</button>
                    </div>
                    {this.state.showError &&
                    <Alert className={"p-3 mb-2 text-dark "} variant="danger"><p>{this.state.message}</p>
                    </Alert>}
                </div>
            </div>
        )
    }
}

export default Login;