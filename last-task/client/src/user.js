import React, {Component} from "react"
import  {Redirect} from "react-router-dom" ;
import Inp from "./child";
import {userRequest,userAuthorizationRequest} from "./requset";
import Delete from "./delete";

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
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Пароль'
    }

];


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            age: "",
            name: "",
            sex: "",
            validname: "",
            validpass1: "",
            validage: "",
            validsex: ""

        };
        this.formData = {};
        this.formValid = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelect = this.updateSelect.bind(this);
    }

    closeDialog() {
        this.setState({showModal: false});
        this.forceUpdate();
    }

    hashCode = function () {
        var hash = 0, i, chr;
        if (this.formData.password.length === 0) return hash;
        for (i = 0; i < this.formData.password.length; i++) {
            chr = this.formData.password.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.formValid) {
            localStorage.setItem('sex', this.formData.sex);
            localStorage.setItem('name', this.formData.name);
            localStorage.setItem('age', this.formData.age)
            localStorage.setItem('password', this.hashCode());
            userRequest(this.formData, "PUT");
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

    updateSelect(e) {
        var val = e.target.value;
        this.formData[e.target.name] = val;
        if (val == "Мужской" || val == "Женский")
            this.formValid = true;
        else this.formValid = false
    }

    /*componentWillMount() {

    }*/

    render() {
        return (

            <form className={"container"}>
                {userAuthorizationRequest("user") && <Redirect to="/login" />}
                {registerProfs.map((registerProf) =>

                    <Inp label={registerProf.label} onBlur={this.updateData.bind(this)}
                         name={registerProf.name} type={registerProf.type}
                         r={registerProf.validateRe}/>
                )}
                <div className="form-group">
                    <label>Пол</label>
                    <select name={"sex"} className={"form-control "} id={"sex"}
                            onChange={this.updateSelect.bind(this)}>
                        <option value={"Мужской"}>Мужской</option>
                        <option value={"Женский"}>Женский</option>
                    </select>
                </div>
                <div>
                    <button onClick={this.handleSubmit.bind(this)} style={{marginRight: "5px"}}
                            className="btn btn-primary">Изменить
                    </button>
                    <Delete/>
                </div>
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

export default User;