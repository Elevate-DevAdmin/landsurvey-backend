const express = require("express");
const { readJob, readJobById, createJob, updateJob, deleteJob, readAllJob, managerReadJob, JobSearch } = require("../controller/job.controller");
const route = express.Router();

route.get("/", readJob)
route.get("/search", JobSearch);
route.get("/manager/:id", managerReadJob)
route.get("/one/:id", readJobById)
route.get("/all", readAllJob)
route.post("/create", createJob)
route.post("/update/:id", updateJob)
route.post("/delete/:id", deleteJob)

module.exports = route