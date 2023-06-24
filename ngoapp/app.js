

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const https = require('https')
const fs = require('fs')
app.use(bodyParser.json());
app.use(express.static('public'))

const port = process.env.PORT ||7000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// parse application/json

const httpsOptions = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
  }

//Create Database Connection



app.listen(port, () => {
	console.log("server started on port 7000...");
});