import React,{Component} from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Nav from "./components/nav.js";
import Register from "./components/register";
import User from "./components/user";
import Login from "./components/Login";
import Home from "./components/Home";
import history from "./conteiners/history";

class App extends Component{
    render(){
        return(
    <Router history={history} forceRefresh={true}>
        <div>
            <Nav/>
            <Switch>
                <Route exact path={"/register"}
                       component={Register}/>
                <Route path={"/user"} component={User}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/home"} component={Home}/>
            </Switch>
        </div>
    </Router>
)}}

export default App;
