import React, {Component} from "react";

class Selhome extends Component {

    render() {
        return (
            <div className="input-group-append ">
                <label style={{opacity: "0.5"}}
                       className="form-control border-top-0 border-right-0 border-left-0 border-bottom-0 col-lg-2">{this.props.name}
                       </label>
                <select name={this.props.name} className="form-control col-lg-10" id={this.props.id}
                        onChange={() => this.props.change(this.props.id)}>
                    {this.props.listItems}
                </select>
            </div>
        )
    }
}

export default Selhome;