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

    }

    closeDialog() {
        this.setState({showModal: false});
        this.forceUpdate();
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
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.formValid)
            this.setState({showSpinner: true}, makeRequest(this.formData, "POST", "/login", undefined, this.reqSuccess, this.reqError))
        else {
            this.setState({showModal: true});
            this.forceUpdate();
        }
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
        this.formValid = valid;
    };

    /* todo componentWillUnmount(){
        this.props.refreshNav();
         <img src={sign_in}
                         style={{
                             width: "100%",
                             height: "182px",
                             borderTopLeftRadius: "10px",
                             borderTopRightRadius: "10px",
                             filter: "brightness(40%)"
                         }}
                         className="img-responsive"/>
    }*/

    render() {
        return (
            <div className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">SIGN IN</h1>
                </div>
                <div className="container container_root">
                    {this.state.showError &&
                    <Alert className={"p-3 mb-2 text-dark "} variant="danger"><p>{this.state.message}</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeMessage.bind(this)}>Закрыть
                        </button>
                    </Alert>}
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
                    {this.state.showModal &&
                    <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}}>
                        <p>Пожалуйста проверьте введенные данные</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeDialog.bind(this)}>Закрыть
                        </button>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Login;