const appRouter = require("express").Router();
const appController = require("../controllers/appController");

appRouter.post("/currency", appController.addCurrency);
appRouter.post("/transaction", appController.createTransaction);
appRouter.get("/history/:user_id", appController.getTransactionHistory);
appRouter.get("/status/:transaction_id", appController.getTransactionStatus);

module.exports = appRouter;
