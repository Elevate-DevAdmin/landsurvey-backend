const express = require("express");
const { createAccountService } = require("../services/createAccount.service");
const { forgotPasswordService } = require("../services/forgotPassword.service");
const route = express.Router();

route.post("/forgot-password/add", forgotPasswordService)
route.post("/create-account/add", createAccountService)


module.exports = route