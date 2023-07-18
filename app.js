

const express = require("express");


const bodyParser = require("body-parser");


const date = require(__dirname + "/date.js");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Ash:King@cluster0.br50zfd.mongodb.net/todolist');


const itemsSchmea= {
  name:String
}

const Item= mongoose.model("item",itemsSchmea);

const item1=new Item({
  name:"welcome to do list"
})

const item2=new Item({
  name:"Hit the + button to add"
})

const item3=new Item({
  name:"check the box to delete"
})

const deafultitems=[item1,item2,item3]



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));



const listSchema={
  name:String,
  items:[itemsSchmea]
};

const list = mongoose.model("List", listSchema)






















app.get("/", function(req, res) {




  Item.find({}).then(function (data) {

    if (data.length===0){
      Item.insertMany(deafultitems).then(function (err) {
        if(!err){

          console.log("added successfully")
        }
      })
      res.redirect("/")

    }else {


      res.render("list", {listTitle: "today", newListItems: data});
    }



  })


});






app.post("/", function(req, res){

  const itemName=req.body.newItem;

  let newitem= new Item({
    name:itemName
  })
  newitem.save()

  res.redirect("/")

});

app.post("/delete",function (req, res) {
 let check= req.body.checkbox

  if (check){
    Item.findByIdAndDelete(check).then(function (err) {
      if(!err){
        console.log("deleted")
      }
    })
  }



res.redirect("/")
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
