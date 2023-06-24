const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const nodemailer=require('nodemailer')
let formidable = require('formidable');
let fs = require('fs');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");


app.use(bodyParser.json());
app.use(express.static('public'))





app.use(cors())

const port = process.env.PORT ||9000

//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "pranicure",

	// host: "bvccsm8jfuuoms3dyzxc-mysql.services.clever-cloud.com",
	// user: "ufc6wtg8pxguvx91",
	// password: "DFSXXuSMABl6C9ONUzj2",
	// database: "bvccsm8jfuuoms3dyzxc",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});


app.post("/login", (req, res) => {
	let sql = `SELECT * FROM std_user where email="${req.body.user}" `;
	let query = conn.query(sql, (err, result) => {
		if (result.length!=0) {
		if (req.body.Pass==result[0].password) {
			res.send(JSON.stringify({ status: 200, error: null, response: result }));
		}
		else{
			res.send(JSON.stringify({ status: 500, error: null, response: result }));
			
		}
	}
	else{
		res.send(JSON.stringify({ status: 700, error: null, response: result }));

	}
	})

	})
app.post("/signup", (req, res) => {
	const date = new Date();

// Format the date as "dd/mm/yy"
const formattedDate = date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit'
});

// Get the day of the week
const dayOfWeek = date.toLocaleString('en-US', {
  weekday: 'long'
});

// Combine the formatted date and day of the week
const timeString = `${formattedDate} ${dayOfWeek}`;
	let data = { user_id: req.body. Userid,username: req.body.Usr, user_type: req.body.Mode , 
		password:req.body.passwd, email:req.body.Mail, phone_number	:req.body.Phone, address:req.body.address,profile_picture:req.body.img, created_at:timeString
	};
	let sql = "INSERT INTO std_user SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});



app.post("/signupemail",async (req, res) => {

	let data = { email_id: req.body.Mail , otp:req.body.Otp,phone:req.body.Phone};

	let sqld = `DELETE FROM otp where email_id="${req.body.Mail}" `;
		let queryd = conn.query(sqld, (err, result) => {
			if (err) throw err;




	
	
		let sql = "INSERT INTO otp SET ?";
		let query = conn.query(sql, data, (err, result) => {
			if (err) res.send(JSON.stringify({ status: 500, error: null}));
			else{

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
					to: req.body.Mail,
					// subject:'Personal Secret Key From SH....Chat',
					subject: "OTP from ParniCure",
					html: `<h4>Dear ${req.body.Usr},</h4>
					<h5>Here is your OTP FOR Creating Account</h5>
					<h3>${req.body.Otp}</h3>`,
					// html:`<p>Don't share This qr <b> </b> </p><p>
					// <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}" alt=""></p>`
				  };
				
				  transporter.sendMail(mailoptions, async function (err, info) {
					if (err) {
						res.send(JSON.stringify({ status: 500, error: null, response: "New Record is Added successfully" }));
					 
				  }
				  else{
				  
					res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
				
				  }
				  
				  });
			}
		})
	})
	
	
});



app.get("/validateotp", (req, res) => {
	console.log(req.query.mail)
	console.log(req.query.mail)
	console.log(req.query.otpval)
	// console.log(req.query.otpval)

	let sql = `SELECT * FROM otp where email_Id="${req.query.mail}" `;
	let query = conn.query(sql, (err, result) => {
		console.log(result[0].otp)
		if (req.query.otpval!=result[0].otp) {
			res.send(JSON.stringify({ status: 500, error: null, response: result }));
		}

		else if(req.query.otpval==result[0].otp){
		

					res.send(JSON.stringify({ status: 200, error: null, response: result }));

		}
		else{
			res.send(JSON.stringify({ status: 700, error: null, response: result }));
			
		}
		
	});
});
app.post(
	"/upload",
	// upload.single("picfile" /* name attribute of <file> element in your form */),
	(req, res) => {
		let form = new formidable.IncomingForm();
		form.parse(req, function (error, fields, file) {
			let filepath = file.picfile.filepath;
			let newpath = "C:/PraniCare/userapp/public/profileimages/";
			
			newpath += file.picfile.originalFilename;
			console.log(filepath)
		
			//Copy the uploaded file to a custom folder
			fs.rename(filepath, newpath,  err => {
				if (err) res.send(JSON.stringify({ status: 500, error: 1, response:newpath}));
		
				res.send(JSON.stringify({ status: 200, error: null, response:newpath}))
			  });
			
			  
		  });
		}
  );


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