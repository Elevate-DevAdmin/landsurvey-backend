const express = require("express");
const { createUser, readUser, updateUser, deleteUser, readUserById, readUserByRole, editUser, changePassword, initialChangePassword } = require("../controller/user.controller");
const route = express.Router();

route.get("/", readUser)
route.get("/:role", readUserByRole)
route.get("/one/:id", readUserById)
route.post("/create", createUser)
route.post("/update/:id", updateUser)
route.post("/edit/:id", editUser)
route.post("/change-password/:id", changePassword)
route.post("/initial-change-password/:id", initialChangePassword)
route.post("/delete/:id", deleteUser)

module.exports = route