

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const https = require('https')
const fs = require('fs')
let cron = require('node-cron')
app.use(bodyParser.json());
app.use(express.static('public'))

const port = process.env.PORT ||7000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// parse application/json

// const httpsOptions = {
// 	key: fs.readFileSync('key.pem'),
// 	cert: fs.readFileSync('cert.pem')
//   }

//Create Database Connection
let task=cron.schedule("*/5 * * * * *", function() {
    let sql = `SELECT * FROM cases where status="1"`;
	let query = conn.query(sql, async (err,result) => {
  
  if (err) {
			  console.log(err)
			//   res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
			}
			else{
                let resulte = Object.values(JSON.parse(JSON.stringify(result)));
                resulte.forEach(function(itemm){
                    let sql1 = `SELECT latitude,longitude FROM ngo `;
                    let str='';
                        let query1 = conn.query(sql, async (err,resultt) => {
                            if (err) {}
                            else{
                                let resultet = Object.values(JSON.parse(JSON.stringify(resultt)));
                                resultet.forEach(function(item,k){
                                    

                                })
                               
                             
                                  
                                  

                            }
                        })
                });
              
			}
  
	})

})


app.listen(port, () => {
	console.log("server started on port 7000...");
});