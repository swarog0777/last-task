const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const userScheme = new Schema({
    login: String,
    email: String,
    sex: String,
    name: String,
    age: Number,
    password: String,
    token: String
}, {versionKey: false});
app.use(express.static('/home/user/work/Learning/WithNodeJS'));

mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true});
const User = mongoose.model("User", userScheme);
const urlencodedParser = bodyParser.urlencoded({extended: false});
mongoose.set('useFindAndModify', false);

app.post("/register", urlencodedParser, function (req, res) {
    User.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password1
    }, function (err, doc) {
        if (err) {
            res.status(500).send({error: err});
        }
        else {
            console.log("Сохранен объект user", doc);
            var token = jwt.sign(doc.id, 'secret');
            res.status(200).send({auth: true, token: token});
        }
    });
});

app.post("/input", urlencodedParser, function (req, res) {
    User.findOne({login: req.body.user}, function (err, doc) {
        if (doc.password == req.body.password) {
            var token = jwt.sign(doc.id, 'secret');
            res.status(200).send({auth: true, token: token});
            console.log("Верный пароль");
        }
        else {
            res.status(400).send({error: "Неверный пароль"});
        }
    })
})

app.post("/profile", urlencodedParser, function (req, res) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'secret', function (err, token_data) {
            console.log(token_data);
            req.id = token_data;
        })
        User.findByIdAndUpdate(req.id, {
            sex: req.body.sex,
            name: req.body.name,
            age: req.body.age,
            password: req.body.password
        }, function (err, doc) {
            if (err)
                res.status(500).send({eror: err});
            else {
                console.log("занес", doc);
                res.status(200).send({auth: true, token: token});
            }
        })
    }
    else res.status(401).send({error: "Пожалуста войдите в профиль"})
})

app.post("/delete", urlencodedParser, function (req, res) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'secret', function (err, token_data) {
            req.id = token_data;
        })
        User.findByIdAndRemove(req.id, function (err, doc) {
            if (err)
                res.status(500).
            else
            {
                console.log("удалил", doc);
                res.status(200).send({auth: true, token: token});
            }
        })
    }
    else
        res.redirect("/input")
})
app.use("*", function (request, response) {
    response.sendFile(__dirname + "/Route.html");
});

app.listen(3000);