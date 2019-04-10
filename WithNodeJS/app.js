const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./auth/auth.router");
const user = require("./user/user.router");
const token = require("./helpers/useToken")
const m=require("./helpers/m")
var db = require("./helpers/db")

app.use(express.static('/home/user/work/Learning/WithNodeJS'));
app.use(bodyParser.urlencoded({extended: false}));


app.post("/register", auth.register, token.create);
app.post("/login", auth.login, token.create);

app.post("/user",token.check,function (req,res) {
    m.scb("Sucessful",res);
});
app.put("/user", token.check, user.editUser);
app.delete("/user", token.check, user.delete);

app.use("*", function (request, response) {
    response.sendFile(__dirname + "/Route.html");
});

app.listen(3000);