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
            <div className="homeRed input-group-append">
                    <label className="form-control border-top-0 border-right-0 border-left-0 border-bottom-0 col-lg-2" style={{opacity: "0.5"}}> {this.props.label} </label>
                            <div className="input-group-append col-xs-4 form-inline">
                                <input type="text" id={this.props.id} placeholder="Выберите объект"
                                       className="form-control btn-group " onChange={this.changeInput}/>
                                <input type="button" onClick={() => this.props.onClick(this.state.val, this.props.id, this.props.btn)} value="Save"
                                       id={this.props.btn} className="btn btn-outline-secondary"/>
                            </div>
            </div>
        )
    }
}

export default Redhome;