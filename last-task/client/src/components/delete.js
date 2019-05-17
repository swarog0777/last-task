import React, {Component} from "react"
import {Redirect} from "react-router-dom" ;
import {makeRequest} from "../conteiners/requset";
import {Modal} from "react-bootstrap";

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteModel = this.deleteModel.bind(this);
        this.reqSuccess = this.reqSuccess.bind(this);
        this.reqError = this.reqError.bind(this);
        this.messageClose = this.messageClose.bind(this);
    }

    handleClose() {
        this.setState({show: false})
    }

    messageClose() {
        this.setState({showMessage: false, redirect: true});
    }

    handleShow() {
        this.setState({show: true})
    }

    reqSuccess() {
        this.setState({redirect: true, showMessage: true, show: false, message: "Данные успешно удалены"});
    }

    reqError(message) {
        this.setState({redirect: false, showError: true, message: message});
    }

    deleteModel() {
        makeRequest(undefined, "DELETE", "/user", undefined, this.reqSuccess, this.reqError);
    }

    render() {
        return (
            <div>
                {this.state.redirect && !(this.state.showMessage) && <Redirect to="/login"/>}
                <button className="btn" style={{
                    borderRadius: "21px",
                    width: "104px",
                    backgroundColor: "#49b651",
                    color: "white"
                }} onClick={this.handleShow}>Удалить
                </button>
                {<Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Вы уверены что хотите удалить профиль?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="btn-group float-right">
                        <button onClick={this.handleClose} className="btn btn-secondary">Отмена</button>
                        <button onClick={this.deleteModel} className="btn btn-primary ml-1 ">Да,абсолютно уверен</button>
                        </div>
                    </Modal.Body>
                </Modal>}
                {<Modal show={this.state.showMessage} onHide={this.messageClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.message}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <button onClick={this.messageClose} className="btn btn-secondary">Закрыть</button>
                    </Modal.Body>
                </Modal>}
            </div>
        )

    }
}

export default Delete;