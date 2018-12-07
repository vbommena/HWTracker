const express = require('express')
const pg = require('pg');
var path = require("path");
const app = express()
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var user = "";
app.set('view engine', 'ejs');
var client = new pg.Client({
    user: "esijiopzwrpisz",
    password: "0e12254844a007713161373b426528ef20a87be02da9da4cb641d1242767133d",
    database: "db1spps0dlvmqh",
    port: 5432,
    host: "ec2-54-197-234-33.compute-1.amazonaws.com",
});
client.connect();

app.use(express.static(__dirname));
app.get("/",function(req,res){
  res.render("index");
})

function getUserInformation(){
  console.log(user);
  const queri = "SELECT * FROM " + user + " ORDER BY days_remaining ASC";
  var result = [];
  return client.query(queri).then((res) =>{
       return res;
  })
  .catch(console.error("error"))
}

app.get("/list", function(req, res1){
  var arrs = [];
  return getUserInformation().then((res) => {
      Object.keys(res).forEach(function(key) {
        value = res[key];
        if(key == 'rows' ) {
          Object.keys(value).forEach(function(key) {
            hwValue = value[key];
            arrs.push(hwValue["homework"]);
          })
        }
      });
      res1.render('list', {arrs : arrs} );
  })
})

app.post("/removeHW", function(req, res1) {
  var name = req.body.hwName;
  console.log("CALLED END POINT")
  const check = "DELETE FROM " + user + " WHERE homework = " + name;
  client.query(check, (err, res) => {
    if(err){
      console.log("User does not exist " + user);
    } else {
        res1.redirect("list");
    }
  })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/addHW", function(req, res1){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var name = req.body.hwName;
  var date = req.body.calender;
  var submission = new Date(date);
  var diff = req.body.diff;
  var diffDays = date_diff_indays(mm, submission);
  diffDays = diffDays - 17638;
  /*if (diffDays < 0){
    res1.redirect("list");
  }*/
  const check = "INSERT INTO " + user + " VALUES ('" + user + "', '"+ name + "', '" + diffDays + "', '"  + diff + "')";
  client.query(check, (err, res) => {
    if(err){
      console.log("User does not exist " + user);
    } else {
        res1.redirect("list");
    }
  })
})




app.get("/lists", function(req, res1){
  var arrs = [];
  res1.render('list', {arrs : arrs} );
})

var date_diff_indays = function(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

app.post("/login",function(req,res){
    var password = req.body.psw;
    var username = req.body.uname;
    if (verify(username, password) == true){
      user = username;
      res.redirect("list");
    } else {
      console.log("user does not exist");
    }
})


function verify(username, password){
  const check = "SELECT * FROM login WHERE login.password = '" + password + "' AND login.username = '" + username +"'";
  client.query(check, (err, res) => {
    if(err){
      console.log("User does not exist verify");
      return false;
    } else {
      return true;
    }
  })
  return true;
}

app.post('/signup',function(req,res1){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.psw;
    var username = req.body.username;
    const check = "SELECT " + username + "FROM login";
    client.query(check, (err, res) => {
      if(err){
        user = username;
        const text = ("CREATE TABLE " + username +"(username text, homework text, days_remaining int, difficulty int)");
        client.query(text,(err, res) => {
          if (err) {
            console.log("ERROR IN QUERY1!!");
          } else {
            console.log("QUERY1 SUCCESS!!")
          }
        })
        const text_1 = ("INSERT INTO login VALUES ('" + username + "', '" + password + "', '" + name + "', '" + email + "')");
        client.query(text_1,(err, res) => {
          if (err) {
            console.log("ERROR IN QUERY2!!");
          } else {
            console.log("QUERY2 SUCCESS!!")
          }
        })
        res1.redirect("lists");
      } else {
        console.log("User exists");
      }
    })
})

server.listen(process.env.PORT || 8080,function(){
  console.log("app running");
})
