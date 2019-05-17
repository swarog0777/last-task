const User = require("../user/mongoose");
const m = require("../helpers/m");

function validateUserInfo(req, res) {
    let isValid = true
    for (let properti in req.body) {
        console.log(properti)
        switch (properti) {
            case ("name") :
                isValid = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name);
                if (!isValid)
                    m.ecb(400,"Некорректное имя пользователя", res)
                break;
            case ("age") :
                isValid = ((/^\d+$/.test(req.body.age))&&(req.body.age >= 3 && req.body.age <= 150));
                if (!isValid)
                    m.ecb(400, "Некорректный возраст",res)
                break;
            case ("sex") :
                isValid = (req.body.sex == "Мужской" || req.body.sex == ("Женский"));
                if (!isValid)
                    m.ecb(400, "Некорректный пол", res)
                break;
            case ("password") :
                isValid = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password);
                if (!isValid)
                    m.ecb(400,"Некорректный пароль, пароль должен содержать: не менее 8 символов, не менее 1 цифры, не менее 1 буквы в нижнем регистре" ,res)
        }
        if (isValid == false)
            return false
    }
    return true;

}

exports.editUser = function (req, res) {
    var invalidInfo = validateUserInfo(req, res);
    if (invalidInfo)
    {
        User.updateOne({_id: req.id}, {
            $set: req.body
        }, function (err, user) {
            if (err)
                m.ecb(500, "Ошибка на сервере", res);
            else {
                console.log("занес", user);
                m.scb('Successful', res);
            }
        })
    }
};

exports.delete = function (req, res) {
    User.remove({_id: req.id}, function (err, user) {
        if (err) {
            console.log("Ошибка:", err);
            m.ecb(500, "Ошибка на сервере", res);
        }
        else {
            console.log("удалил", user);
            m.scb("Successful", res);
        }
    })
};

exports.infoUser = function (req, res) {
    User.findOne({_id: req.id}, function (err, user) {
        if (err)
            m.ecb(500, "Ошибка на сервере", res)
        else {
            res.status(200).send({user})
        }
    })
}
