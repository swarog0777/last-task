const registerInps = [

    {
        name: 'login',
        validateRe: /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/,
        type: 'text',
        label: "Логин"
    },
    {
        name: 'password',
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Пароль'
    }
]


class input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password1: "",
            validlogin: "",
            validpass1: "",

        }
        this.formData = {};
        this.formValid = {};
    }
    closeDialog(){
        this.setState({showModal : false});
        this.forceUpdate();
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
        this.formValid = valid;
    };

    render() {
        return (
            <form method="post" action="/register" className="container" onSubmit={this.handleSubmit}>
                {registerInps.map( (registerInp)=>
                    <Inp label={registerInp.label} onBlur={this.updateData.bind(this)}
                         name={registerInp.name} type={registerInp.type}
                         r={registerInp.validateRe}/>
                )}


                <button type="submit" className="btn btn-primary">Войти</button>
                {this.state.showModal &&
                <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}} >
                    <p>Пожалуйста проверьте введенные данные</p>
                    <button id="close" className={" btn btn-dark "} onClick={ this.closeDialog.bind(this)}>Закрыть</button>
                </div>}
            </form>
        )

    }
}