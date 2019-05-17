require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("<h1>You are running now!</h1>");
});

//ACTIONS

//get all of the actions
server.get("/actions", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error getting action information!", err });
    });
});

//actions by id
server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: "There is no action with the specified ID!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error", err });
    });
});

//post new action

server.post("/actions", (req, res) => {
  actions
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating a new action" });
    });
});

//PROJECTS

module.exports = server;
