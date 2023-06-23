

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
// app.use(express.static('public'))

const port = process.env.PORT ||9000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
	// host: "localhost",
	// user: "root",
	// password: "",
	// database: "api",

	host: "bvccsm8jfuuoms3dyzxc-mysql.services.clever-cloud.com",
	user: "ufc6wtg8pxguvx91",
	password: "DFSXXuSMABl6C9ONUzj2",
	database: "bvccsm8jfuuoms3dyzxc",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});



app.post("/signup", (req, res) => {
	let data = { name: req.body.name, phone: req.body.phone , roll:req.body.roll};
	let sql = "INSERT INTO testapi SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

app.listen(port, () => {
	console.log("server started on port 9000...");
});