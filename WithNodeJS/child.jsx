class Inp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: "",
        valid : ""
        }
        this.updateData=this.updateData.bind(this);
    }
    updateData(e){
        var val=e.target.value;
        var valid = this.validate(val);
        this.setState({value : val, valid})
    }
    validate(val){
        var r=this.props.r;
       return(r.test(val))
    }

    render() {
        var color = this.state.valid === true ? "green" : "red";
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} type={this.props.type} className="form-control" id={this.props.name}
                       placeholder="Введите значение"
                       onChange={this.updateData} onBlur={() => this.props.onBlur(this.state.value,this.state.valid,this.props.name)}
                       style={{borderColor: color}}
                       value={this.state.value}
                />
            </div>
        )
    }

}