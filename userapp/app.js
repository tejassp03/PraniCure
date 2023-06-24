

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))

const port = process.env.PORT ||7000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// parse application/json



//Create Database Connection


app.listen(port, ()=>{
    console.log(`Listening port on ${port}`)
});