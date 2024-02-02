const express = require("express");
const axios = require("axios");
const dataRoutes = require("./routes");
const path = require("path");

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));
app.use(express.static(path.join(__dirname,'public')));

app.use("/",dataRoutes);



app.listen(8001,() => {
    console.log("Server is now running!");
});