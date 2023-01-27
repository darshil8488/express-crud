const express = require("express");
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const controller = require('./Controllers/index')

const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/student').then(function(){
    console.log("successfully connected to Database");
}).catch(function(err){
    console.log("can not connect database",err);
    process.exit();
})


app.get("/",(req , res)=>{
    res.send("Okk Node is truning Complate");
})
 

app.post("/create" , function(req,res){
    controller.createNote(req,res);
})

app.get("/student" , function(req,res){
    controller.findAllNotes(req,res);
})


app.get("/student/:id" , function(req,res){
    controller.findNote(req,res);
})


app.put("/update" , function(req,res){
    controller.updateNote(req,res);
})


app.delete("/delete/:id" , function(req,res){
    controller.deleteNote(req,res);
})





app.listen(8000, ()=> console.log("server is runing in port 8000!"));
