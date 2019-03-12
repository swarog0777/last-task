class input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password1: "",
            validlogin: "",
            validpass1: "",

        }
    }

    validateLogin(login) {
        var r = /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/;
        return r.test(login);
    }

    updateDataLogin(value) {
        var valid = this.validateLogin(value);
        this.setState({login: value, validlogin: valid})
    }

    validatePassword1(password) {
        var r = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
        return (r.test(password));
    }

    updateDataPassword1(value) {
        console.log(this.state.password1.length)
        var valid = this.validatePassword1(value);
        this.setState({password1: value, validpass1: valid})
    }


    render() {
        var colorLogin = this.state.validlogin === true ? "green" : "red";
        var colorPass1 = this.state.validpass1 === true ? "green" : "red"
        return (
            <form method="post" action="#" className="container">
                <Child label={"Логин"} onChange={this.updateDataLogin.bind(this)} name={"login"} color={colorLogin}
                       type={"text"}
                       val={this.state.login}/>
                <Child label={"Пароль"} onChange={this.updateDataPassword1.bind(this)} name={"password1"}
                       color={colorPass1} type={"password"}
                       val={this.state.password1}/>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        )

    }
}