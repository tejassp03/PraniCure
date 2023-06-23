

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const nodemailer = require("nodemailer");
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



app.post("/signupmail", (req, res) => {
	let data = { name: req.body.Usr, email: req.body.mail , otp:req.body.otp};
	let sql = "INSERT INTO testapi SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});



async function mail1(to, sub, body,res) {
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      service: "gmail", // true for 465, false for other ports
      auth: {
        user: "webdearsproject@gmail.com", // generated ethereal user
        pass: "iefrtrdbsudvpsyx", // generated ethereal password
      },
    });
  
    var mailoptions = {
      from: "webdearsproject@gmail.com",
      to: to,
      // subject:'Personal Secret Key From SH....Chat',
      subject: sub,
      html: body,
      // html:`<p>Don't share This qr <b> </b> </p><p>
      // <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}" alt=""></p>`
    };
  
    transporter.sendMail(mailoptions, async function (err, info) {
      if (err) {
        res.send({ data: 0 });
        return false;
    }
    else{
    
        res.send({ data: 1 });
        return true;
    }
    
    });
}
app.listen(port, () => {
	console.log("server started on port 9000...");
});