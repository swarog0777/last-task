class Redhome extends React.Component {
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
        console.log(this.value)
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
                            <input type="text" id={this.props.id} placeholder="Выберите объект"
                                   className="form-control btn-group " onChange={this.changeInput}/>
                            <div className="input-group-append">
                                <input type="button" onClick={() => this.props.onClick(this.state.val)} value="Save"
                                       id={this.props.btn} className="btn btn-outline-secondary"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}