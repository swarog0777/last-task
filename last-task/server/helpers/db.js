const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true});