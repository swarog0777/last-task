class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""}
    }


    render() {
        var color = this.props.color
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} type={this.props.type} className="form-control" id={this.props.name}
                       placeholder="Введите значение"
                       onChange={() => this.props.onChange(document.getElementById(this.props.name).value)}
                       style={{borderColor: color}}
                       value={this.props.val}
                />
            </div>
        )
    }

}