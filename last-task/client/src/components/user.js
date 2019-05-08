import React, {Component} from "react"
import {Redirect} from "react-router-dom" ;
import Inp from "./child";
import {makeRequest} from "../conteiners/requset";
import Delete from "./delete";
import {Alert} from "react-bootstrap";
import {Spinner} from "react-bootstrap";
import {Modal} from "react-bootstrap";

const registerProfs = [
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
    },

    {
        name: 'password',
        validateRe: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        type: 'password',
        label: 'Пароль'
    }

];

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showMessage: false,
            message: "",
            spiner: false
        };
        this.formData = {};
        this.formValid = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelect = this.updateSelect.bind(this);
        this.reqSuccess = this.reqSuccess.bind(this);
        this.reqError = this.reqError.bind(this);
        this.errorAuth = this.errorAuth.bind(this);
        this.successAuth = this.successAuth.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    closeDialog() {
        this.setState({showModal: false});
    }

    closeMessage() {
        this.setState({showMessage: false});
    }

    reqSuccess() {
        this.setState({showSpinner: false, showMessage: true, message: "Данные успешно изменены"});
    }

    reqError(message) {
        this.setState({showSpinner: false, showError: true, message: message});
    }

    successAuth() {
        this.setState({noAuthMessage: true});
    }

    errorAuth() {
        this.setState({auth: false});
    }

    goToLogin() {
        this.setState({auth: true});
    }

    hashCode = function () {
        var hash = 0, i, chr;
        if (this.formData.password.length === 0) return hash;
        for (i = 0; i < this.formData.password.length; i++) {
            chr = this.formData.password.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };

    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('sex', this.formData.sex);
        localStorage.setItem('name', this.formData.name);
        localStorage.setItem('age', this.formData.age);
        localStorage.setItem('password', this.hashCode());
        this.setState({showSpinner: true}, makeRequest(this.formData, "PUT", "/user", undefined, this.reqSuccess, this.reqError));
    }

    componentWillMount() {
        makeRequest(undefined, "POST", "/user", "user", this.successAuth, this.errorAuth);
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
    };

    updateSelect(e) {
        var val = e.target.value;
        this.formData[e.target.name] = val;
    }

    render() {
        return (
            <div className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">Пользователь</h1>
                </div>
                <div className="container container_root">
                    {this.state.showMessage &&
                    <Alert className={"p-3 mb-2 text-dark "} variant="success">
                        <p>{this.state.message}</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeMessage.bind(this)}>Закрыть
                        </button>
                    </Alert>}
                    {this.state.auth && <Redirect to="/login"/>}
                    {registerProfs.map((registerProf) =>

                        <Inp label={registerProf.label} onBlur={this.updateData.bind(this)}
                             name={registerProf.name} type={registerProf.type}
                             r={registerProf.validateRe}/>
                    )}
                    <div className="input-group-append">
                        <label style={{opacity: "0.5"}}
                               className="form-control border-top-0 border-right-0 border-left-0 border-bottom-0 col-lg-2">Пол</label>
                        <select name={"sex"} className={"form-control col-lg-10"} id={"sex"}
                                onChange={this.updateSelect.bind(this)}>
                            <option value={"Мужской"}>Мужской</option>
                            <option value={"Женский"}>Женский</option>
                        </select>
                    </div>
                    <div className={"input-group-append"}>
                        <button onClick={this.handleSubmit.bind(this)} style={{marginRight: "5px"}}
                                className="btn btn-primary" disabled={this.state.showSpinner}> {this.state.showSpinner ?
                            <Spinner animation="border"/> : "Изменить"}
                        </button>
                        <Delete/>
                    </div>
                    {this.state.showModal &&
                    <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}}>
                        <p>Пожалуйста проверьте введенные данные</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeDialog.bind(this)}>Закрыть
                        </button>
                    </div>}
                    <Modal show={this.state.noAuthMessage} onHide={this.goToLogin}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Пожалуйста авторизуйтесь
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="col-md-3 col-centered">
                                <button onClick={this.goToLogin}
                                        className={"btn btn-primary center-block"}>Представиться
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default User;