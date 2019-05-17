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
        label: 'Имя',
        value: ''

    },
    {
        name: 'age',
        validateRe: /^\d+$/,
        type: 'number',
        label: 'Возраст',
        value: ''
    },

    {
        name: 'password',
        validateRe: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        type: 'password',
        label: 'Пароль',
        value: ''
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
        this.closeMessage = this.closeMessage.bind(this);
        this.updateSelect= this.updateSelect.bind(this)
    }

    closeDialog() {
        this.setState({showModal: false});
    }

    closeMessage() {
        this.setState({showMessage: false});
    }

    reqSuccess() {
        this.setState({showSpinner: false, showMessage: true,variantMessage : "success" ,message: "Данные успешно изменены"});
        setTimeout(this.closeMessage, 5000)
    }

    reqError(message) {
        this.setState({showSpinner: false, showMessage: true, variantMessage : "danger" ,message: message});
        setTimeout(this.closeMessage, 5000)
    }

    successAuth() {
        this.setState({noAuthMessage: true});
    }

    errorAuth(user) {
        user.age = (user.age == 'undefined') ? '' : user.age;
        user.name = (user.name == 'undefined') ? '' : user.name;
        user.sex = (user.sex == 'undefined') ? '' : user.sex;
        registerProfs[1].value = user.age;
        registerProfs[0].value = user.name;
        this.setState({auth: false, age: user.age, name: user.name, sex:user.sex});
    }

    goToLogin() {
        this.setState({auth: true});
    }

    hashCode = function () {
        if (this.formData.password) {
            var hash = 0, i, chr;
            if (this.formData.password.length === 0) return hash;
            for (i = 0; i < this.formData.password.length; i++) {
                chr = this.formData.password.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        }
        else
            return '';
    }

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
        this.setState ({sex:val})

    }

    render() {
        return (
            <div className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">PROFILE</h1>
                </div>
                <div className="container container_root">
                    {this.state.auth && <Redirect to="/login"/>}
                    <div className="form-group">
                        {registerProfs.map((registerProf) =>
                            <Inp label={registerProf.label} onBlur={this.updateData.bind(this)}
                                 name={registerProf.name} type={registerProf.type}
                                 value={registerProf.value}
                                     r={registerProf.validateRe}/>
                        )}
                        <div className="input-group-append">
                            <label style={{opacity: "0.5"}}
                                   className="form-control border-top-0 border-right-0 border-left-0 border-bottom-0 col-lg-2">Пол</label>
                            <select name={"sex"} className={"form-control col-lg-10"} id={"sex"} value={this.state.sex}
                                    onChange={this.updateSelect.bind(this)}>
                                <option value="" selected disabled hidden> </option>
                                <option value={"Мужской"}>Мужской</option>
                                <option value={"Женский"}>Женский</option>
                            </select>
                        </div>
                        <div className={"input-group-append"} style={{marginLeft : "105px"}}>
                            <button onClick={this.handleSubmit.bind(this)} style={{
                                borderRadius: "21px",
                                width: "104px",
                                backgroundColor: "#49b651",
                                color: "white",
                                marginRight: "5px"
                            }}
                                    className="btn" disabled={this.state.showSpinner}> {this.state.showSpinner ?
                                <Spinner animation="border"/> : "Изменить"}
                            </button>
                            <Delete/>
                        </div>
                    </div>
                    {this.state.showModal &&
                    <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}}>
                        <p>Пожалуйста проверьте введенные данные</p>
                        <button id="close" className={" btn btn-dark "} onClick={this.closeDialog.bind(this)}>Закрыть
                        </button>
                    </div>}
                    {this.state.showMessage &&
                    <Alert className={"p-3 mb-2 text-dark "} variant={this.state.variantMessage}>
                        <p>{this.state.message}</p>
                    </Alert>}
                    <Modal show={this.state.noAuthMessage} onHide={this.goToLogin}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Пожалуйста авторизуйтесь
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="col-centered">
                                <button onClick={this.goToLogin}
                                        className={"btn btn-primary center-block float-right"}>Представиться
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