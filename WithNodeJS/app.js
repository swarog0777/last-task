const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const userScheme = new Schema({
    login: String,
    email: String,
    sex: String,
    name: String,
    age: Number,
    password: String
}, {versionKey: false});
app.use(express.static('/home/user/work/Learning/WithNodeJS'));


mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true});
const User = mongoose.model("User", userScheme);

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post("/register", urlencodedParser, function (request, response) {
    console.log(request.body.password1);
    User.create({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        login: request.body.login,
        password: request.body.password1
    }, function (err, doc){
        console.log("Сохранен объект user", doc);
    })
});

app.post()
app.use("*", function (request, response) {
    response.sendFile(__dirname + "/Route.html");
});

app.listen(3000);