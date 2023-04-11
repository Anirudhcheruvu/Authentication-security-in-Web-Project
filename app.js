//jshint esversion:6
require('dotenv').config;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema  = new mongoose.Schema({
email:String,
password:String
});



const User = new mongoose.model("User",userSchema);
 
const app = express();
 
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
 

app.get("/",function(req,res){ 

    res.render("home");
});

app.get("/login",function(req,res)
{
    res.render("login");

});
app.get("/register",function(req,res)
{
    res.render("register");
    
});

app.post("/register",function(req,res)
{
    req.body.username;
    req.body.password;

    const user = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    user.save()
    .then(doc=>
        {
            res.render('secrets');
            console.log(doc);
        })
    .catch(err=>
        {
            res.render(err);
        });
});

app.post("/login",function(req,res)
{
    req.body.username;
    req.body.password;

    User.findOne({email:req.body.username}).then(docs=>{
        if(docs)
        {
            if(docs.password===md5(req.body.password))
            {
                res.render('secrets');
                console.log("login succesful");
            }
            else{
                res.redirect('/');
                console.log("check password");
            }
               
        }
        else{
            res.redirect('/');
            console.log("check username");
        }
    })
    .catch(err=>
        {
            console.log(err);
        })

});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});