import React, {Component} from "react"
import {Redirect} from "react-router-dom" ;
import {makeRequest, userRequest} from "../conteiners/requset";

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false}
    }

    deleteModel() {
        this.setState({redirect:  makeRequest(undefined, "DELETE","/user",undefined)});
    }

    render() {
        return (

            <button className="btn btn-primary " onClick={this.deleteModel.bind(this)}>Удалить
                профиль {this.state.redirect && <Redirect to="/login"/>} </button>


        )

    }
}

export default Delete;