require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

let fs = require('fs');
let path = require('path');
app.set('view engine', 'ejs');

// Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
let headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000 // 30 days
};


app.use('/js',express.static(__dirname+'/www/js'));
app.use('/css',express.static(__dirname+'/www/css'));
app.use('/data',express.static(__dirname+'/www/data'));
app.use('/img',express.static(__dirname+'/www/img'));
app.use('/json',express.static(__dirname+'/www/json'));
app.use('/views',express.static(__dirname+'/views/'));


// Connection to mongo
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/LoLDashboard';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// API
const APIRoutes = require("./api/routes");
app.use(APIRoutes);

// redirections
app.get('/summonerPage',function(req,res){
  res.render('pages/summonerPage.ejs',{name:'', summonerLevel:-1,profileIconId:-1});
});

app.get('/',(req,res) => {
    res.render("pages/index.ejs");
});


const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('app listening on port 3000!')
})