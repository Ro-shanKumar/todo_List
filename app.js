const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require(__dirname + "/data.js")
console.log(data);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', '.ejs');


let items = [];
let workItems = [];


app.get("/", function(rep, res){
  let day = data.getDay();
  res.render("lists", {listTitle: day, newItems: items});
});
app.get("/work", function(req, res){
  res.render("lists", {listTitle: "Work", newItems: workItems})
})


app.post("/work", function(req,  res){
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
})
app.post("/", function(req, res){
  let title = req.body.button;
  let item = req.body.newItem;
  if(title === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
})

app.listen(3000, function(req, res){
  console.log("Server running at port 3000")
});
