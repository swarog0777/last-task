const User = require("../user/mongoose");
const m = require("../helpers/m");

function validRegister(req) {
    var isValidName = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name),
        isValidAge = /^\d+$/.test(req.body.age),
        isValidEmail = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i.test(req.body.email),
        isValidLogin = /^[a-zA-Z0-9]{1}[a-zA-Z0-9]{3,20}$/.test(req.body.login),
        isValidPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password1)
    return isValidPassword && isValidName && isValidAge && isValidEmail && isValidLogin;
}


exports.register = function (req, res, next) {
    var invalidInfo = validRegister(req);
    if (!invalidInfo)
        m.ecb(422, "Проверьте введеные значения", res)
    User.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password1
    }, function (err, user) {
        if (err) {
            console.log("Ошибка:",err);
            m.ecb(500, "Логин уже используется", res);
        }
        else {
            req.id = user.id;
            next();
        }
    });
}

exports.login = function (req, res, next) {
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

