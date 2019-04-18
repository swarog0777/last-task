const bodyParser = require("body-parser");
const auth = require("../auth/auth.router");
const user = require("../user/user.router");
const token = require("./useToken")
const m = require("./m");

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));

    app.post("/register", auth.register, token.create);
    app.post("/login", auth.login, token.create);

    app.post("/user", token.check, function (req, res) {
        m.scb("Sucessful", res);
    });
    app.put("/user", token.check, user.editUser);
    app.delete("/user", token.check, user.delete);
}

