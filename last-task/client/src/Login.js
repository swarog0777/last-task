import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {authRequest} from "./requset";
import Inp from "./child"

const registerInps = [

    {
        name: 'user',
        validateRe: /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/,
        type: 'text',
        label: "Логин"
    },
    {
        name: 'password',
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Пароль'
    }
]


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            redirect : false
        }
        this.formData = {};
        this.formValid = false;
    }

    closeDialog() {
        this.setState({showModal: false});
        this.forceUpdate();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.formValid)
            this.setState({redirect : authRequest(this.formData,"/login")});
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
    }*/

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit.bind(this)}>
                {this.state.redirect && <Redirect to="/user" />}
                {registerInps.map((registerInp) =>
                    <Inp label={registerInp.label} onBlur={this.updateData.bind(this)}
                         name={registerInp.name} type={registerInp.type}
                         r={registerInp.validateRe}/>
                )}
                <button type="submit" className="btn btn-primary">Войти</button>
                {this.state.showModal &&
                <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}}>
                    <p>Пожалуйста проверьте введенные данные</p>
                    <button id="close" className={" btn btn-dark "} onClick={this.closeDialog.bind(this)}>Закрыть
                    </button>
                </div>}
            </form>
        )
    }
}

export default Login;