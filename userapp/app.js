

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))

const port = process.env.PORT ||7000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Create Database Connection



app.listen(port, () => {
	console.log("server started on port 9000...");
});