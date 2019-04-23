const User = require("../user/mongoose");
const m = require("../helpers/m");

function validateUserInfo(req) {
    /*var isValidName = /^([A-zА-я]+[,.]?[ ]?|[a-z]+['-]?)+$/.test(req.body.name),
        isValidAge = /^\d+$/.test(req.body.age),
        isValidSex = (req.body.sex == "Мужской" || req.body.sex == ("Женский")),
        isValidPassword = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g.test(req.body.password);*/


    return isValidAge && isValidName && isValidPassword && isValidSex;
}

exports.editUser = function (req, res) {
    var invalidInfo = validateUserInfo(req);

    if (!invalidInfo) {
        m.ecb(422, "Проверьте введеные значения", res);
    }
    console.log(req.body);
    User.updateOne({_id: req.id}, {
        $set: req.body
        /*sex: req.body.sex,
        name: req.body.name,
        age: req.body.age,
        password: req.body.password*/
    }, function (err, user) {
        if (err)
            m.ecb(500, "Ошибка на сервере", res);
        else {
            console.log("занес", user);
            m.scb('Successful', res);
        }
    })
};

exports.delete = function (req, res) {
    User.remove({_id:req.id}, function (err, user) {
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

