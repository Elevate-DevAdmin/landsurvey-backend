const express = require("express");
const {
  readInvoice,
  readTaskByClientId,
  generateInvoice,
  downloadInvoice,
  invoicePaymentReceived,
  getInvoiceItem,
  readWebookInvoice,
  readInvoiceById,
  updateGeneratedInvoice,
  deleteInvoice,
} = require("../controller/invoice.controller");
const route = express.Router();

route.get("/", readInvoice);
route.get("/client/:client_id", readTaskByClientId);
route.post("/generate_invoice", generateInvoice);
route.post("/update_generated_invoice/:invoice_id", updateGeneratedInvoice);
route.get("/generate_token/:qb_invoice_id", downloadInvoice);
route.get("/payment_receive", invoicePaymentReceived);
route.post("/delete", deleteInvoice);

route.get("/all_item", getInvoiceItem);
route.get("/one/:id", readInvoiceById);
module.exports = route;
