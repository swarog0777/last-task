class home extends React.Component {
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


    editHome(value) {
        if (document.getElementById("t1").value.replace(/\s/g, '') == '') {
            document.getElementById("b1").className = "btn-danger btn";
            document.getElementById("t1").style.borderColor = '#FF0000';
            return;
        }
        document.getElementById("b1").className = "btn-success btn";
        document.getElementById("t1").style.borderColor = "";
        document.getElementById("s1")[document.getElementById("s1").selectedIndex].text = value;
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)

    }

    editRoom(value) {
        if (document.getElementById("t2").value.replace(/\s/g, '') == '') {
            document.getElementById("b2").className = "btn-danger btn";
            document.getElementById("t2").style.borderColor = "#FF0000";
            return;
        }
        document.getElementById("b2").className = "btn-success btn";
        document.getElementById("t2").style.borderColor = '';
        document.getElementById("s2")[document.getElementById("s2").selectedIndex].text = value;
        this.listItems = this.formData.map((house, index) =>
            <option key={index} value={house}>{house}</option>)

    }

    changeHome() {
        document.getElementById("t1").value = document.getElementById("s1").options[document.getElementById("s1").selectedIndex].text
    }

    changeRoom() {
        document.getElementById("t2").value = document.getElementById("s2").options[document.getElementById("s2").selectedIndex].text
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form name="f1">
                        <Selhome listItems={this.listItems} name={"Дома"} id={"s1"}
                                 change={this.changeHome.bind(this)}/>
                        <Redhome onClick={this.editHome.bind(this)} label={"Редактировать дом"} id={"t1"} btn={"b1"}/>
                        <Selhome listItems={this.listRoom} name={"Комнаты"} id={"s2"}
                                 change={this.changeRoom.bind(this)}/>
                        <Redhome onClick={this.editRoom.bind(this)} label={"Редактировать комнату"} id={"t2"}
                                 btn={"b2"}/>
                    </form>
                </div>
            </div>
        )

    }


}