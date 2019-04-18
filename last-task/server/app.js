const express = require("express");
const app = express();
const db=require("./helpers/db");
require("./helpers/routs")(app);


app.listen(3001);
