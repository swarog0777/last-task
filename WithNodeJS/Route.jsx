const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const NavLink = ReactRouterDOM.NavLink;

class Nav extends React.Component {

    render() {
        return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className={"nav-item nav-link"} exact to={"/register"}> Новый профиль </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/profile"}> Редактирование профиля </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/input"}> Вход </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/home"}> Дома </NavLink>
        </nav>
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Nav/>
            <Switch>
                <Route exact path={"/register/"} component={register}/>
                <Route path={"/profile/"} component={profile}/>
                <Route path={"/input/"} component={input}/>
                <Route path={"/home"} component={home}/>
            </Switch>
        </div>
    </Router>
    , document.getElementById("App"))