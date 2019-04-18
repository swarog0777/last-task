import React, {Component} from "react";
import {Redirect, NavLink} from "react-router-dom";
import {userAuthorizationRequest} from "./requset";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            redirect: false
        };
        this.userUnauthorization = this.userUnauthorization.bind(this);
    }

    userUnauthorization() {
        console.log('sfsasadfa');
        localStorage.removeItem("token");
        this.setState({redirect: true});
    }

    componentWillMount() {
        console.log("Did Mount");
        if (userAuthorizationRequest("route"))
            this.setState({auth: true});
        else
            this.setState({auth: false})
    }

    render() {
        return (<nav
            className="navbar navbar-expand-lg navbar-light bg-light">
            {this.state.redirect && <Redirect to="/login"/>}

            {!this.state.auth &&
            < NavLink
                className={"nav-item nav-link"}
                exact
                to={"/register"}> Новый
                профиль </NavLink>}
            {this.state.auth &&
            < NavLink
                className={"nav-item nav-link"}
                to={"/user"}> Редактирование
                профиля </NavLink>}

            {!this.state.auth && < NavLink
                className={"nav-item nav-link"}
                to={"/login"}> Вход </NavLink>}

            {this.state.auth && < NavLink
                className={"nav-item nav-link"}
                to={"/home"}> Дома </NavLink>}

            {this.state.auth &&
            < button
                className={"nav-item nav-link btn btn-primary"}
                onClick={this.userUnauthorization
                }>
                Выйти </button>}
        </nav>
        )
    }
}

export default Nav;