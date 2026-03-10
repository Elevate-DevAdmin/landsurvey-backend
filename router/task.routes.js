const express = require("express");
const { readTask, readTaskById, createTask, updateTask, deleteTask, TaskInitalData, readAllTask, updateTaskStatus, TaskSearch, updateTaskEstimatedHours, totalEstimatedBillableCost } = require("../controller/task.controller");
const route = express.Router();

route.get("/", readTask)
route.get("/all", readAllTask)
route.get("/one/:id", readTaskById)
route.get("/inital", TaskInitalData)
route.post("/create", createTask)
route.post("/update/:id", updateTask)
route.post("/delete/:id", deleteTask)
route.post("/update_status/:id", updateTaskStatus);
route.get("/totalEstimatedBillableCost/:status", totalEstimatedBillableCost);
route.get("/dwr/search", TaskSearch);
route.post("/updateTaskEstimatedHours/:id", updateTaskEstimatedHours);

module.exports = route