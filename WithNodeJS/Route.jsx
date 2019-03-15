const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const NavLink = ReactRouterDOM.NavLink;







class Nav extends React.Component {
    render() {
        return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className={"nav-item nav-link"} exact to={"/register"} activeStyle={{color: "red", fontWeight: "bold"}}> Новый профиль {"  "} </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/profile"} activeStyle={{color: "green", fontWeight: "bold"}}> Редактирование
                профиля{"  "}  </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/input"} activeStyle={{color: "yellow", fontWeight: "bold"}}> Вход{"  "}  </NavLink>
            <NavLink className={"nav-item nav-link"} to={"/home"} activeStyle={{color: "pink", fontWeight: "bold"}}> Дома{"  "} </NavLink>
        </nav>
    }
}

ReactDOM.render(<Router>
    <div>
        <Nav/>
        <Switch>
            <Route exact path={"/register"} component={register}/>
            <Route path={"/profile"} component={profile}/>
            <Route path={"/input"} component={input}/>
            <Route path={"/home"} component={home}/>
        </Switch>
    </div>
</Router>, document.getElementById("App"))