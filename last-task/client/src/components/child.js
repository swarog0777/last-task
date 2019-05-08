import React, {Component} from "react";

class Inp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            valid: ""
        }
        this.updateData = this.updateData.bind(this);
    }

    updateData(e) {
        var val = e.target.value;
        var valid = this.validate(val);
        this.setState({value: val, valid})
    }

    validate(val) {
        var r = this.props.r;
        return (r.test(val));
    }

    render() {
        var color = this.state.valid === true ? "#79c877" : "red";
        return (
            <div className="form-group">
                <div className="input-group-append  ">
                    <label className="form-control border-top-0 border-right-0 border-left-0 border-bottom-0"
                           style={{opacity: "0.5"}}>{this.props.label}</label>
                    <input name={this.props.name} type={this.props.type}
                           className="form-control border-top-0 border-right-0 border-left-0 col-lg-10"
                           id={this.props.name}
                           placeholder="Введите значение"
                           onChange={this.updateData}
                           onBlur={() => this.props.onBlur(this.state.value, this.state.valid, this.props.name)}
                           style={{
                               borderColor: color,
                               borderRadius: "0px",
                               opacity: "0.8"
                           }}
                           value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}

export default Inp;