import React,{Component} from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Nav from "./nav.js";
import Register from "./register";
import User from "./user";
import Login from "./Login";
import Home from "./Home";

class App extends Component{
    render(){
        return(
    <Router>
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
