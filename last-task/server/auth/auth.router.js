const User = require("../user/mongoose");
const m = require("../helpers/m");

function validRegister(req,res) {
    let isValid = true
    for (let properti in req.body) {
        console.log(properti)
        switch (properti) {
            case ("name") :
                isValid = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name);
                if (!isValid)
                    m.ecb(400, "Некорректное имя пользователя", res)
                break;
            case ("age") :
                isValid = ((/^\d+$/.test(req.body.age)) && (req.body.age >= 3 && req.body.age <= 150));
                if (!isValid)
                    m.ecb(400, "Некорректный возраст", res)
                break;
            case ("email") :
                isValid = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i.test(req.body.email);
                if (!isValid)
                    m.ecb(400, "Некорректный email", res)
                break;
            case ("login") :
                isValid = /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/.test(req.body.login);
                if (!isValid)
                    m.ecb(400, "Некорректный login", res)
                break;
            case ("password1") :
                isValid = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password1);
                if (!isValid)
                    m.ecb(400, "Некорректный пароль, пароль должен содержать: не менее 8 символов, не менее 1 цифры, не менее 1 буквы в нижнем регистре", res)
        }
        if (isValid == false)
            return false
    }
    return true;
    /*var isValidName = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name),
        isValidAge = (/^\d+$/.test(req.body.age) && (req.body.age < 150) && (req.body.age > 3)),
        isValidEmail = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i.test(req.body.email),
        isValidLogin = /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/.test(req.body.login),
        isValidPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password1)

    return isValidPassword && isValidName && isValidAge && isValidEmail && isValidLogin;*/
}

function validLogin(req) {
    var isValidLogin = /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/.test(req.body.user),
        isValidPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password)
    return isValidLogin && isValidPassword;
}


exports.register = function (req, res, next) {
    var invalidInfo = validRegister(req,res);
    if (!invalidInfo) {
        User.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            login: req.body.login,
            password: req.body.password1
        }, function (err, user) {
            if (err) {
                User.findOne({email: req.body.email}, function (err, user) {
                    if (user == null) {
                        User.findOne({login: req.body.login}, function (err, user) {
                                if (user == null)
                                    m.ecb(500, "Ошибка на сервере", res);
                                else
                                    m.ecb(500, "Такой login уже существует", res);
                            }
                        )
                    }
                    else
                        m.ecb(500, "Такой email уже существует", res);
                })
            }
            else {
                req.id = user.id;
                next();
            }
        });
    }
}

exports.login = function (req, res, next) {
    var invalidInfo = validLogin(req);
    if (!invalidInfo) {
        m.ecb(400, "Проверьте введеные значения", res);
    }
    else {
        User.findOne({login: req.body.user}, function (err, user) {
            if (!user)
                m.ecb(400, "Пользователь не найден", res)
            else if (user.password == req.body.password) {
                req.id = user.id;
                next();
            }
            else {
                m.ecb(400, "Неверный пароль", res);
            }
        })
    }
}


