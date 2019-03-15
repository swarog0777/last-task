const registerProfs=[
    {
        name: 'name',
        validateRe: /\w+/,
        type: 'text',
        label: 'Имя'

    },
    {
        name: 'age',
        validateRe: /^\d+$/,
        type: 'number',
        label: 'Возраст'
    },
    {
        name: 'sex',
        validateRe:/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
        type: 'text',
        label: 'Пол'
    },
    {
        name: 'password',
        validateRe: /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g,
        type: 'password',
        label: 'Пароль'
    }

];


class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            age: "",
            name: "",
            sex: "",
            validname: "",
            validpass1: "",
            validage: "",
            validsex: ""

        };
        this.formData = {};
        this.formValid = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.closeDialog=this.closeDialog().bind(this);
    }
    closeDialog(){
        this.setState({showModal : false});
        this.forceUpdate();
    }
    hashCode = function () {
        var hash = 0, i, chr;
        if (this.formData.password.length === 0) return hash;
        for (i = 0; i < this.formData.password.length; i++) {
            chr = this.formData.password.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    handleSubmit(e) {
        //e.preventDefault();
        if (this.formValid) {
            localStorage.setItem('sex', this.formData.sex);
            localStorage.setItem('name', this.formData.name);
            localStorage.setItem('age', this.formData.age)
            localStorage.setItem('password', this.hashCode())
        }
        else {
            this.setState({showModal: true});
            this.forceUpdate();
        }
    }

    updateData(value, valid,name) {
        this.formData[name] = value;
        this.formValid = valid ;
    };

    render() {
        return (
            <form method="post" action="/profile" className="container" onSubmit={this.handleSubmit}>

                {registerProfs.map( (registerProf)=>

                    <Inp label={registerProf.label} onBlur={this.updateData.bind(this)}
                         name={registerProf.name} type={registerProf.type}
                         r={registerProf.validateRe}/>
                )}
                <button type="submit" className="btn btn-primary">Войти</button>
                    {this.state.showModal &&
                    <div className={"p-3 mb-2 text-dark "} style={{backgroundColor: "#f6f7fd"}} >
                        <p>Пожалуйста проверьте введенные данные</p>
                        <button id="close" className={" btn btn-dark "} onClick={ this.closeDialog.bind(this)}>Закрыть</button>
                    </div>
                    }
            </form>
        )

    }

}