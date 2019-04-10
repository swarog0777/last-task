const registerFields = [

    {
        name: 'email',
        validateRe: /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i,
        type: 'email',
        label: 'Электронная почта'

    },
    {
        name: 'login',
        validateRe: /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/,
        type: 'text',
        label: "Логин"
    },
    {
        name: 'password1',
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Пароль'
    },
    {
        name: 'password2',
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Повторите пароль'
    },
    {
        name: 'name',
        validateRe: /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/,
        type: 'text',
        label: 'Имя'

    },
    {
        name: 'age',
        validateRe: /^\d+$/,
        type: 'number',
        label: 'Возраст'
    }
]

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
        this.formData = {};
        this.formValid = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeDialog() {
        this.setState({showModal: false});
        this.forceUpdate();
    }

    hashCode = function () {
        var hash = 0, i, chr;
        if (this.formData.password1.length === 0) return hash;
        for (i = 0; i < this.formData.password1.length; i++) {
            chr = this.formData.password1.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    handleSubmit(e) {
        console.log(this.formData)
        e.preventDefault();
        if (this.formValid && (this.formData.password1 == this.formData.password2)) {
            localStorage.setItem('email', this.formData.email);
            localStorage.setItem('login', this.formData.login);
            localStorage.setItem('name', this.formData.name);
            localStorage.setItem('age', this.formData.age);
            localStorage.setItem('password', this.hashCode());
            authRequest(this.formData,"/register");
        }
        else {
            this.setState({showModal: true});
            this.forceUpdate();
        }
    }

    updateData(value, valid, name) {
        this.formData[name] = value;
        this.formValid = valid;

    };

    render() {
        return (
            <form id="f1" className="container" onSubmit={this.handleSubmit.bind(this)}>
                {registerFields.map((registerField) =>
                    <Inp label={registerField.label} onBlur={this.updateData.bind(this)}
                         name={registerField.name} type={registerField.type}
                         r={registerField.validateRe}/>
                )}

                <button type={"submit"} className="btn btn-primary">Принять</button>
                {this.state.showModal &&
                <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}}>
                    <p>Пожалуйста проверьте введенные данные</p>
                    <button id="close" className={" btn btn-dark "} onClick={this.closeDialog.bind(this)}>Закрыть
                    </button>
                </div>}
            </form>
        )

    }
}