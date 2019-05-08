import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {makeRequest} from "../conteiners/requset";
import Inp from "./child"
import {Alert} from "react-bootstrap";
import {Spinner} from "react-bootstrap";

const registerFields = [

    {
        name: 'email',
        validateRe: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,
        type: 'email',
        label: 'Email'

    },
    {
        name: 'login',
        validateRe: /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/,
        type: 'text',
        label: "Логин"
    },
    {
        name: 'password1',
        validateRe: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        type: 'password',
        label: 'Пароль'
    },
    {
        name: 'password2',
        validateRe: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        type: 'password',
        label: 'Повторите пароль'
    },
    {
        name: 'name',
        validateRe: /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/,
        type: 'text',
        label: 'Имя'

    },
    {
        name: 'age',
        validateRe: /^\d+$/,
        type: 'number',
        label: 'Возраст'
    }
]

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false

        };
        this.formData = {};
        this.formValid = {};
        this.handleSubmit = this.handleSubmit.bind(this);
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

    hashCode = function () {
        var hash = 0, i, chr;
        if (this.formData.password1.length === 0) return hash;
        for (i = 0; i < this.formData.password1.length; i++) {
            chr = this.formData.password1.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };

    reqSuccess() {
        this.setState({redirect: true})
    }

    reqError(message) {
        this.setState({showSpinner: false, redirect: false, showError: true, message: message});
    }

    handleSubmit(e) {
        console.log(this.formData)
        e.preventDefault();
        if (this.formValid && (this.formData.password1 === this.formData.password2)) {
            localStorage.setItem('email', this.formData.email);
            localStorage.setItem('login', this.formData.login);
            localStorage.setItem('name', this.formData.name);
            localStorage.setItem('age', this.formData.age);
            localStorage.setItem('password', this.hashCode());
            this.setState({showSpinner: true}, makeRequest(this.formData, "POST", "/register", undefined, this.reqSuccess, this.reqError))
        }
        else {
            this.setState({showModal: true});
            this.forceUpdate();
        }
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
        this.formValid = valid;

    };

    render() {
        return (
            <div id="f1" className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">Регистрация</h1>
                </div>
                <div className="container container_root">
                    {this.state.showError &&
                    <Alert className={"p-3 mb-2 text-dark "} variant="danger"><p>{this.state.message}</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeMessage.bind(this)}>Закрыть
                        </button>
                    </Alert>}
                    {this.state.redirect && <Redirect to="/user"/>}
                    {registerFields.map((registerField) =>
                        <Inp label={registerField.label} onBlur={this.updateData.bind(this)}
                             name={registerField.name} type={registerField.type}
                             r={registerField.validateRe}/>
                    )}
                    <button onClick={this.handleSubmit.bind(this)} disabled={this.state.showSpinner}
                            style={{borderRadius: "21px", width: "165px", backgroundColor: "#49b651", color: "white"}}
                            className="root_button btn ">{this.state.showSpinner ?
                        <Spinner animation="border"/> : "Создать профиль"}</button>
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

export default Register;