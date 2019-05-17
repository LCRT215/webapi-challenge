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

// update action
server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actions
    .update(id, changes)
    .then(action => {
      if (action) {
        res.status(200).json({ message: "Action has been updated!" });
      } else {
        res
          .status(500)
          .json({ message: "There was an error updating the action!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the action!", err });
    });
});

// delete action
server.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleting the action" });
    });
});

//PROJECTS

// get all of the projects
server.get("/projects", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error getting action information!", err });
    });
});

//projects by id
server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
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

//post new project
server.post("/projects", (req, res) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating a new project" });
    });
});

// update project **ERRORS**
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actions
    .update(id, changes)
    .then(project => {
      if (project) {
        res.status(200).json({ message: "project has been updated!" });
      } else {
        res
          .status(500)
          .json({ message: "There was an error updating the project!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the project!", err });
    });
});

// delete project
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleting the project" });
    });
});

// get projects -> actions (actions are nested in projects)
//does order matter here??
server.get("/actions/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectActions(id)
    // ^ from module exports in projectModel.js
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          message: "this project does not have actions"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting project actions",
        err
      });
    });
});
module.exports = server;
