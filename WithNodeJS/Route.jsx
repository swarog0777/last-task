const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const NavLink = ReactRouterDOM.NavLink;

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
    }

    componentWillMount() {
        console.log(this.state.auth)
        if (userAuthorizationRequest("route"))
            this.setState({auth: true})
        else
            this.setState({auth: false})
    }

    render() {
        console.log(this.state.auth);
        return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className={"nav-item nav-link"} exact to={"/register"}> Новый профиль </NavLink>
            {this.state.auth &&
            <NavLink className={"nav-item nav-link"} to={"/user"}> Редактирование профиля </NavLink>}
            <NavLink className={"nav-item nav-link"} to={"/login"}> Вход </NavLink>
            {this.state.auth && <NavLink className={"nav-item nav-link"} to={"/home"}> Дома </NavLink>}
        </nav>
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Nav/>
            <Switch>
                <Route exact path={"/register/"} component={register}/>
                <Route path={"/user/"} component={profile}/>
                <Route path={"/login/"} component={input}/>
                <Route path={"/home/"} component={home}/>
            </Switch>
        </div>
    </Router>
    , document.getElementById("App"));