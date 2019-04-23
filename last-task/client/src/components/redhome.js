import React, {Component} from "react";

class Redhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ""
        }
        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(e) {
        console.log(e.target.value)
        this.setState({val: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <label className=""> {this.props.label} </label>
                </div>
                <div className="form-inline">
                    <div className="input-group row">
                        <div className="col-xs-4">
                            <div className="input-group-append">
                                <input type="text" id={this.props.id} placeholder="Выберите объект"
                                       className="form-control btn-group " onChange={this.changeInput}/>
                                <input type="button" onClick={() => this.props.onClick(this.state.val, this.props.id, this.props.btn)} value="Save"
                                       id={this.props.btn} className="btn btn-outline-secondary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Redhome;