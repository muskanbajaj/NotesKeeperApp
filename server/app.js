const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(cors({origin:true, credentials:true}));


const port = process.env.PORT || 8080;

const server = app.listen(port, ()=>
    console.log(`Server is running on port ${port}`)
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-muskan:muskan12@cluster0.db3fl.mongodb.net/notesKeeperApp", {useNewUrlParser: true});

const itemsSchema = {
  title: String,
  content: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  title:"testing",
  content:"hello world"
});


const defaultItems = [item1];

// const listSchema = {
//   items: [itemsSchema]
// };

// const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.send({message:item1});
    } else {
      res.send({message: foundItems});
    }
  });

});

// app.get("/:customListName", function(req, res){
//   const customListName = _.capitalize(req.params.customListName);

//   List.findOne({name: customListName}, function(err, foundList){
//     if (!err){
//       if (!foundList){
//         //Create a new list
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });
//         list.save();
//         res.redirect("/" + customListName);
//       } else {
//         //Show an existing list

//         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//       }
//     }
  // });



// });

app.post("/post", function(req, res){

  const itemName = req.body.newItem;
  // const listName = req.body.list;

 // console.log(req.body);

  const item = new Item({
    title: req.body.title,
  content:itemName
  });

    item.save();
    // res.redirect("/");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.newItem;
  const listName = req.body.title;
    // console.log(checkedItemId);
    Item.findByIdAndDelete(checkedItemId, function(err){
          if(err){
           console.log(err);
          }
        });
        

    // Item
    //     .findByIdAndUpdate(checkedItemId);
      res.redirect("/");
 });