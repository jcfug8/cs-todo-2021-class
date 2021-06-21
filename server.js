// This file is in charge of api endpoints and the
// api server stuff

// import express so you can use it
const express = require("express");
const store = require("./model");
// instantiate your app/server
const app = express();

// tell our app to use json (this is an example of a middleware but this one
// is implemented for us)
app.use(express.json({}));

// this is where we will do our own middleware
app.use((req, res, next) => {
  console.log(
    "Time: ",
    Date.now(),
    " - Method: ",
    req.method,
    " - Path: ",
    req.originalUrl,
    " - Body: ",
    req.body
  );
  next();
});

// Get - gets all of the todos (does not have a URL param)
app.get("/todo", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("getting all todos");
  // return all of the todos in the store
  res.send(JSON.stringify(store));
});

// Get - gets the todo with the given id
app.get("/todo/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`getting todo with id: ${req.params.id}`);
  // lets check if the todo exisits
  if (store[req.params.id] === undefined) {
    // if it doesn't, send back and error
    res.status(404).send(
      JSON.stringify({
        error: "not found",
      })
    );
    return;
  }
  // success
  res.send(JSON.stringify(store[req.params.id]));
});

let nextID = 0;

// Post - crates one todo (does not have a URL param)
app.post("/todo", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`creating a todo with body`, req.body);
  // put todo into store using the id in the body
  req.body.id = nextID;
  store[nextID] = req.body;
  nextID++;
  // return the newly create todo
  res.status(201).send(JSON.stringify(store[req.body.id]));
});

// Delete - deletes the todo with the given id
app.delete("/todo/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`deleting todo with id: ${req.params.id}`);
  if (store[req.params.id] === undefined) {
    // if it doesn't, send back and error
    res.status(404).send(
      JSON.stringify({
        error: "not found",
      })
    );
    return;
  }
  // success
  // save the to-be delete todo in a var so we can return it
  let todo = store[req.params.id];
  // delete the todo
  delete store[req.params.id];
  // return the deleted todo
  res.send(JSON.stringify(todo));
});

// Patch - updates the todo with the given id
app.patch("/todo/:id", function (req, res) {
  console.log(`updating todo with id: ${req.params.id} with body`, req.body);

  if (store[req.params.id] === undefined) {
    // if it doesn't, send back and error
    res.status(404).send(
      JSON.stringify({
        error: "not found",
      })
    );
    return;
  }
  // success

  // check if name is in the body
  if (req.body.name !== undefined) {
    // if it is update
    store[req.params.id].name = req.body.name;
  }

  // check if description is in the body
  if (req.body.description !== undefined) {
    // if it is update
    store[req.params.id].description = req.body.description;
  }

  // check if done is in the body
  if (req.body.done !== undefined) {
    // if it is update
    store[req.params.id].done = req.body.done;
  }

  // check if deadline is in the body
  if (req.body.deadline !== undefined) {
    // if it is update
    store[req.params.id].deadline = req.body.deadline;
  }

  res.send(store[req.params.id]);
});

// Put - replaces the todo with the given id`
app.put("/todo/:id", function (req, res) {
  console.log(`replacing todo with id: ${req.params.id} with body`, req.body);
  if (store[req.params.id] === undefined) {
    // error
    // if it doesn't, send back and error
    res.status(404).send(
      JSON.stringify({
        error: "not found",
      })
    );
    return;
  }
  // replace
  store[req.params.id] = req.body;
  // success
  res.send(JSON.stringify(store[req.params.id]));
});

module.exports = app;
