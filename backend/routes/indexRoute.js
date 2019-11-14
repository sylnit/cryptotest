const indexRouter = require("express").Router();

indexRouter.get("/", (req, res) => {
	res.json(
		"Welcome. Check https://github.com/sylnit/cryptotest/blob/master/README.md for instructions on this API."
	);
});

module.exports = indexRouter;
