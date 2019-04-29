import React, {Component} from "react";

class Selhome extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <label>{this.props.name} </label>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <select name={this.props.name} className="form-control" id={this.props.id}
                                onChange={() => this.props.change(this.props.id)}>
                            {this.props.listItems}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Selhome;