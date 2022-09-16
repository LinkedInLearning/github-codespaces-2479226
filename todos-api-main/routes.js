const express = require('express');


const router = express.Router();

router.get("/", function(req, res) {
  res.send("Remote Interface for To-Do Items");
});

router.post("/add-item", async function(req, res) {
  
  const payload = req.body;

  //console.log(payload);

  let todo_info = {
    task : payload.task,
    completed : false,
    created_at : currentTime()
  }
  
  const save_webhook = await req.db
  .collection("todos")
  .insertOne(todo_info);

  res.status(201).send({
    message: "Todo item successfully added"
  });
});

router.get("/list", async function(req, res) {
  console.log(req.body);
  
  const todos = await req.db
  .collection("todos")
  .find()
  .toArray();

  res.status(200).send(todos);
});

function currentTime() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  return dateTime;
}

module.exports = router;
