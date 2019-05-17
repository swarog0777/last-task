import React, {Component} from "react"
import  {Redirect} from "react-router-dom" ;
import Selhome from "./selhome"
import Redhome from "./redhome"
import {gethomeName} from "../conteiners/homs";
import {makeRequest} from "../conteiners/requset";
import {Modal} from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
        this.formData = gethomeName();
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)
        this.listRoom = this.formData.map((room, index) =>
            <option key={index} value={room}>{room}</option>)
        this.state = {
            name: "",
            index: ""
        }
        this.errorAuth = this.errorAuth.bind(this);
        this.successAuth = this.successAuth.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }


    editRecord(value,input,button) {
        var select = (input=="t1"?"s1":"s2")
        if (document.getElementById(input).value.replace(/\s/g, '') == '') {
            document.getElementById(button).className = "btn-danger btn";
            document.getElementById(input).style.borderColor = '#FF0000';
            return;
        }
        document.getElementById(button).className = "btn-success btn";
        document.getElementById(input).style.borderColor = "";
        document.getElementById(select)[document.getElementById(select).selectedIndex].text = value;
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)

    }

    goToLogin() {
        this.setState({auth: true});
    }

    successAuth() {
        this.setState({noAuthMessage: true});
    }

    errorAuth() {
        this.setState({auth: false});
    }

    componentWillMount() {
        makeRequest(undefined, "POST", "/user", "user", this.successAuth, this.errorAuth);
    }

    changeRecord(select) {
        var input=(select=="s1")?"t1":"t2";
        document.getElementById(input).value = document.getElementById(select).options[document.getElementById(select).selectedIndex].text
    }

    render() {
        return (
            <div className="root">
                <div className="logo">
                    <div className="filter"/>
                    <h1 className="text_logo">HOMES</h1>
                </div>
                <div className="container container_root">
                    <div className="form-group">
                        {this.state.auth && <Redirect to="/login"/>}
                        <Selhome listItems={this.listItems} name={"Дома"} id={"s1"}
                                 change={this.changeRecord.bind(this)}/>
                        <Redhome onClick={this.editRecord.bind(this)} label={"Ред. дом"} id={"t1"} btn={"b1"}/>
                        <Selhome listItems={this.listRoom} name={"Комнаты"} id={"s2"}
                                 change={this.changeRecord.bind(this)}/>
                        <Redhome onClick={this.editRecord.bind(this)} label={"Ред. комнату"} id={"t2"}
                                 btn={"b2"}/>
                    </div>
                </div>
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
        )

    }
}

export default Home;