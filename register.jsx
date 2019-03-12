class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            login: "",
            password1: "",
            password2: "",
            age: "",
            name: "",
            validemail: "",
            validlogin: "",
            validpass1: "",
            validpass2: ""

        };
        this.formData = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(email) {
        var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
        return r.test(email);
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

    updateDataPassword2(val) {
        var pass1 = this.state.password1
        var valid = (pass1 == val);
        this.setState({password2: val, validpass2: valid})
    }

    hashCode = function () {
        var hash = 0, i, chr;
        if (this.state.password1.length === 0) return hash;
        for (i = 0; i < this.state.password1.length; i++) {
            chr = this.state.password1.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.validemail === true && this.state.validlogin === true && this.state.validpass1 === true && this.state.validpass2 === true) {
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('login', this.state.login);
            localStorage.setItem('name', this.state.name);
            localStorage.setItem('age', this.state.age)
            localStorage.setItem('password', this.hashCode())
        }
        else alert("Пожалуйста проверьте введенные данные")
    }

    updateDataEmail = (value) => {
        console.log(value);
        var valid = this.validateEmail(value);
        this.setState({email: value, validemail: valid});
    };
    updateDataName = (value) => {
        this.setState({name: value});
    };
    updateDataAge = (value) => {
        this.setState({age: value});
    };

    render() {
        var colorEmail = this.state.validemail === true ? "green" : "red";
        var colorLogin = this.state.validlogin === true ? "green" : "red";
        var colorPass1 = this.state.validpass1 === true ? "green" : "red"
        var colorPass2 = this.state.validpass2 === true ? "green" : "red"
        return (
            <form method="post" action="#" className="container" onSubmit={this.handleSubmit}>
                <Child label={"Электронная почта"} onChange={this.updateDataEmail.bind(this)} name={"email"}
                       type={"email"}
                       color={colorEmail} val={this.state.email}/>
                <Child label={"Логин"} onChange={this.updateDataLogin.bind(this)} name={"login"} color={colorLogin}
                       type={"text"}
                       val={this.state.login}/>
                <Child label={"Пароль"} onChange={this.updateDataPassword1.bind(this)} name={"password1"}
                       color={colorPass1} type={"password"}
                       val={this.state.password1}/>
                <Child label={"Повторите пароль"} onChange={this.updateDataPassword2.bind(this)} name={"password2"}
                       color={colorPass2} type={"password"}
                       val={this.state.password2}/>
                <Child label={"Имя"} onChange={this.updateDataName.bind(this)} name={"name"} type={"text"} color={""}
                       val={this.state.name}/>
                <Child label={"Возраст"} onChange={this.updateDataAge.bind(this)} name={"age"} type={"number"}
                       color={""} val={this.state.age}/>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        )

    }
}