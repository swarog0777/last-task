class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password1: "",
            age: "",
            name: "",
            sex: "",
            validname: "",
            validpass1: "",
            validage: "",
            validsex: ""

        };
        this.formData = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validatePassword1(password) {
        var r = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
        return (r.test(password));
    }

    validateName(name) {
        var r = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
        return (r.test(name))
    }

    validateAge(age) {
        if (age < 0 || age > 150)
            return false;
        return true;

    }

    validateSex(sex) {
        var r = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
        return (r.test(sex));
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
        if (this.state.validname === true && this.state.validage === true && this.state.validpass1 === true && this.state.validsex === true) {
            localStorage.setItem('sex', this.state.sex);
            localStorage.setItem('name', this.state.name);
            localStorage.setItem('age', this.state.age)
            localStorage.setItem('password', this.hashCode())
        }
        else alert("Пожалуйста проверьте введенные данные")
    }

    updateDataName = (value) => {
        var valid = this.validateName(value);
        this.setState({name: value, validname: valid});
    };
    updateDataAge = (value) => {
        var valid = this.validateAge(value);
        this.setState({age: value, validage: valid});
    };
    updateDataSex = (value) => {
        var valid = this.validateSex(value);
        this.setState({sex: value, validsex: valid})

    }

    updateDataPassword1(value) {
        console.log(this.state.password1.length)
        var valid = this.validatePassword1(value);
        this.setState({password1: value, validpass1: valid})
    }

    render() {
        var colorName = this.state.validname === true ? "green" : "red";
        var colorAge = this.state.validage === true ? "green" : "red";
        var colorPass1 = this.state.validpass1 === true ? "green" : "red"
        var colorSex = this.state.validsex === true ? "green" : "red"
        return (
            <form method="post" action="#" className="container" onSubmit={this.handleSubmit}>
                <Child label={"Имя"} onChange={this.updateDataName.bind(this)} name={"name"} type={"text"}
                       color={colorName}
                       val={this.state.name}/>
                <Child label={"Возраст"} onChange={this.updateDataAge.bind(this)} name={"age"} type={"number"}
                       color={colorAge} val={this.state.age}/>
                <Child label={"Пол"} onChange={this.updateDataSex.bind(this)} name={"sex"}
                       color={colorSex} type={"text"}
                       val={this.state.sex}/>
                <Child label={"Смена пароля"} onChange={this.updateDataPassword1.bind(this)} name={"password1"}
                       color={colorPass1} type={"password"}
                       val={this.state.password1}/>

                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        )

    }
}