const jwt = require("jsonwebtoken")
const m = require("./m")

exports.check = function (req, res, next) {
    var token = req.headers.authorization;
    if (token != "null" && token != undefined) {
        jwt.verify(token, 'secret', function (err, token_data) {
            req.id = token_data;
            next();
        })
    }
    else m.ecb(401, "Пожалуйста войдите в профиль", res);
};

exports.create = function (req, res) {
    var token = jwt.sign(req.id, 'secret');
    m.scb("Authorization successful", res, token);
}