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
        .json({ message: "The action information could not be received", err });
    });
});

//PROJECTS

module.exports = server;
