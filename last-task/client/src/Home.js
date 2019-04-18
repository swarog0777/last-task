import React, {Component} from "react"
import  {Redirect} from "react-router-dom" ;
import Selhome from "./selhome"
import Redhome from "./redhome"
import {gethomeName} from "./homs";

class Home extends Component {
    constructor(props) {
        super(props);
        this.formData = gethomeName();
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)
        this.listRoom = this.formData.map((room, index) =>
            <option key={index} value={room}>{room}</option>)
        this.state = {
            name: "",
            index: ""
        }
    }


    editRecord(value,input,button) {
        var select = (input=="t1"?"s1":"s2")
        if (document.getElementById(input).value.replace(/\s/g, '') == '') {
            document.getElementById(button).className = "btn-danger btn";
            document.getElementById(input).style.borderColor = '#FF0000';
            return;
        }
        document.getElementById(button).className = "btn-success btn";
        document.getElementById(input).style.borderColor = "";
        document.getElementById(select)[document.getElementById(select).selectedIndex].text = value;
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)

    }


    changeRecord(select) {
        var input=(select=="s1")?"t1":"t2";
        document.getElementById(input).value = document.getElementById(select).options[document.getElementById(select).selectedIndex].text
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form name="f1">
                        <Selhome listItems={this.listItems} name={"Дома"} id={"s1"}
                                 change={this.changeRecord.bind(this)}/>
                        <Redhome onClick={this.editRecord.bind(this)} label={"Редактировать дом"} id={"t1"} btn={"b1"}/>
                        <Selhome listItems={this.listRoom} name={"Комнаты"} id={"s2"}
                                 change={this.changeRecord.bind(this)}/>
                        <Redhome onClick={this.editRecord.bind(this)} label={"Редактировать комнату"} id={"t2"}
                                 btn={"b2"}/>
                    </form>
                </div>
            </div>
        )

    }
}

export default Home;