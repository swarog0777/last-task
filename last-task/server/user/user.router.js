const User = require("../user/mongoose");
const m = require("../helpers/m");

function validateUserInfo(req) {
    let isValid = false
    for (let properti in req.body) {
        console.log(properti.name)
        switch (properti) {
            case ("name") :
                isValid = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name);
                break;
            case ("age") :
                isValid = /^\d+$/.test(req.body.age);
                break;
            case ("sex") :
                (req.body.sex == "Мужской" || req.body.sex == ("Женский"));
                break;
            case ("password") :
                /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password);
        }
    }
    return isValid;
}

exports.editUser = function (req, res) {
    var invalidInfo = validateUserInfo(req);
    if (!invalidInfo) {
        m.ecb(422, "Проверьте введеные значения", res);
    }
    else {
        console.log(req.body);
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

