import React, {Component} from "react"
import {Redirect} from "react-router-dom" ;
import {userRequest} from "./requset";

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false}
    }

    deleteModel() {
        this.setState({redirect: userRequest(this.formData, "DELETE")});

    }

    render() {
        return (

            <button className="btn btn-primary " onClick={this.deleteModel.bind(this)}>Удалить
                профиль {this.state.redirect && <Redirect to="/login"/>} </button>


        )

    }
}

export default Delete;