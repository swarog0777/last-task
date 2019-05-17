import React, {Component} from "react";
import {Redirect, NavLink} from "react-router-dom";
import {makeRequest, userAuthorizationRequest} from "../conteiners/requset";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            redirect: false
        };
        this.reqSuccess = this.reqSuccess.bind(this);
        this.reqError = this.reqError.bind(this);
    }

    logOut() {
        localStorage.removeItem("token");
        this.setState({redirect: true});
    }

    reqSuccess() {
        this.setState({auth: false});
    }

    reqError() {
        this.setState({auth: true});
    }

    componentWillMount() {
        makeRequest(undefined, "POST", "/user", "route", this.reqSuccess, this.reqError)
    };

    render() {
        return (<nav
                className="navbar navbar-expand-lg navbar-light  " style={{backgroundColor: "#7eb699"}}>
                {this.state.redirect && <Redirect to="/login"/>}
                {!this.state.auth &&
                < NavLink
                    className={"nav-item "}
                    exact activeStyle={{color:"black"}}
                    to={"/register"}> Новый
                    профиль </NavLink>}
                {this.state.auth &&
                < NavLink
                    className={"nav-item nav-link"}
                    to={"/user"} activeStyle={{color:"black"}}> Редактирование
                    профиля </NavLink>}

                {!this.state.auth && < NavLink
                    className={"nav-item nav-link"} activeStyle={{color:"black"}}
                    to={"/login"}> Вход </NavLink>}

                {this.state.auth && < NavLink
                    className={"nav-item nav-link"} activeStyle={{color:"black"}}
                    to={"/home"}> Дома </NavLink>}

                {this.state.auth &&
                < button
                    className={"nav-item nav-link btn"}
                    style={{
                        borderRadius: "21px",
                        width: "104px",
                        backgroundColor: "#49b651",
                        color: "white"
                    }}
                    onClick={this.logOut.bind(this)
                    }>
                    Выйти </button>}
            </nav>
        )
    }
}

export default Nav;