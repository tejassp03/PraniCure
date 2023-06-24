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

	function ty(mail,pass){
		console.log(mail+"p")
		let transporter = nodemailer.createTransport({
				
		  service: 'gmail',
		  auth: {
			user: 'webdearsproject@gmail.com', // generated ethereal user
			pass: 'iefrtrdbsudvpsyx', // generated ethereal password
		  },
		  });
		  var mailoptions={
		  from:'webdearsproject@gmail.com',
		  to:mail,
		  subject:'Password For Login',
		  html:`<!DOCTYPE html>
		  <html lang="en">
		  <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
			  *
			  {
				margin:0px;
				padding:0px;
				
			  }
			
			  
			  
		  
			  .qr img
			  {
				
				height:180px;
				width:180px;
				margin:20px;
				background-color:white;
				
			  }
			  
			 
			</style>
			 
		  </head>
		  <body>
		 
			  
		  
				  <div class="qr" style="position:absolute;right:10px;bottom:10px">
				  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pass}" alt="">
				  </div>
				
			  
			   
		   
		  </body>
		  </html>`,
		
		  }
		
		  
		  transporter.sendMail ( mailoptions,  function(err,ressinfo){
		  if(err){
				console.log(err)
				console.log("888888")
				console.log(info)
		
		  }
		  else{
			console.log("sent")
		  }
		})
	  }
	  app.post("/mail", (req,res) => {
		async function mail(req,res){
		let transporter = nodemailer.createTransport({
		  
		  service: 'gmail', 
		  auth: {
			user: 'webdearsproject@gmail.com', // generated ethereal user
			pass: 'iefrtrdbsudvpsyx', // generated ethereal password
		  },
		});
		var digits = '1234567890';
		var otpp = ''
		for (i = 0; i < 4; i++) {
		  otpp += digits[Math.floor(Math.random() * 10)];
		}
		var mailoptions={
		from:'webdearsproject@gmail.com',
		to:req.body.tomail,
		subject:'OTP FROM UID',
		html:`<p>One Time PASSWORD FOR UID IS <b>${otpp} </b> </p>`
		}
	   await transporter.sendMail ( mailoptions,  function(err,info){
		if(err){
		  res.send(JSON.stringify({ status: 500, error: null}))
	  
		}
		else{
		  
		  let sqld = `DELETE FROM otp where email_Id="${req.body.tomail}" `;
		  let queryd = conn.query(sqld, (err, result) => {
			if (err) throw err;
	  
	  
	  
	  
		
		  let data = { email_Id:req.body.tomail, otp:otpp,phone:req.body.phone_no || 0};
		  let sql = "INSERT INTO otp SET ?";
		  let query = conn.query(sql, data, (err, result) => {
			if (err) res.send(JSON.stringify({ status: 500, error: null}));
			else{
	  
			  res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
			}
			// res.send(JSON.stringify({ status: 200, }))
		  })
		})
		}
	  
		})
	  }
	  mail(req,res)
	  
	  })
	app.get("/qr", (req, res) => {
		console.log(req.query.Email)
		 let sql = `SELECT password FROM std_user where email="${req.query.Email}"`;
			let query = conn.query(sql, (err, result) => {
			 
			  console.log(result)
			  if(result.length !=0){
			
			  if ( result[0].password) {
				 
				ty(req.query.Email,result[0].password)
				res.send(JSON.stringify({ status: 200, error: null, response: "qr sent" }));
			  }
		  
			
			  else{
				res.send(JSON.stringify({ status: 700, error: null, response: result }));
				
			  }
			  
			}else{
			  res.send(JSON.stringify({ status: 800, error: null, response: "New Record is Added successfully" }));
			}
			});
		
		
		
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
		password:req.body.passwd, email:req.body.Mail, phone_number	:req.body.Phone, address:req.body.address,lat:req.body.lat,lon:req.body.lon,profile_picture:req.body.img, created_at:timeString
	};
	let sql = "INSERT INTO std_user SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

app.get("/fetch", (req, res) => {


	let sqll = `SELECT * FROM cases `;
	let query = conn.query(sqll,(err, result) => {
		if (err) throw err;
	
		
		res.send(JSON.stringify({ status: 500, error: null, response: result }));
	
	
		})
	});
	app.post("/updateprof", (req, res) => {

		let sql =`UPDATE std_user SET username= '${req.body.Username}',address='${req.body.address}',phone_number='${req.body.Phone}',password='${req.body.Pass}',lat='${req.body.lat}',lon='${req.body.lon}',profile_picture='${req.body.img}' WHERE user_id='${req.body.Uid}'`;
		let query = conn.query(sql, async (err,result) => {
	  
	  if (err) {
				  console.log(err)
				  res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
				}
				else{
				  res.send(JSON.stringify({ status: 200, error: null, response: "Updated"}));
				}
	  
		})
	  
	  
	  }) 
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
app.get("/glbsearch", (req, res) => {
	console.log(req.query.search)
	let sql = `SELECT * FROM cases WHERE address LIKE "%${req.query.search}%" OR description LIKE "%${req.query.search}%" OR case_id LIKE "%${req.query.search}%"
	OR phone_number LIKE "%${req.query.search}%" OR created_at LIKE "%${req.query.search}%"`;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;

		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.post("/casedesp", (req, res) => {
	// let sql = `SELECT D.UID,D.Profile,D.Fname, D.Lname ,F.Relation FROM details D,family F WHERE D.UID=F.UID and F.FAM_ID=D.Fam_id and F.FAM_ID='${req.query.fam}' `;
	let sql = `SELECT * FROM cases where case_id="${req.body.caseid}"`;
	let query = conn.query(sql, async (err,result) => {
  
  if (err) {
			  console.log(err)
			  res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
			}
			else{
			  res.send(JSON.stringify({ status: 200, error: null, response: result[0]}));
			}
  
	})
  
  
  })  

  app.post("/orderlist", (req, res) => {
	let sql = `SELECT * FROM cases where user_id="${req.body.uid}"`;
	let query = conn.query(sql, async (err,result) => {
  
  if (err) {
			  console.log(err)
			  res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
			}
			else{
			  res.send(JSON.stringify({ status: 200, error: null, response: result[0]}));
			}
  
	})
  
  
  })  

app.post("/loadprof", (req, res) => {

	let sql = `SELECT * FROM std_user where user_id="${req.body.Uid}"`;
	let query = conn.query(sql, async (err,result) => {
  
  if (err) {
			  console.log(err)
			  res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
			}
			else{
			  res.send(JSON.stringify({ status: 200, error: null, response: result[0]}));
			}
  
	})
  
  
  })  

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