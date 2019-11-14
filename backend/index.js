const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const indexRoutes = require("./routes/indexRoute");
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

let app = express();

const port = process.env.PORT || 8080;

const url = "mongodb://localhost:27017/crypto_db";

Mongoose.connect(url, { useNewUrlParser: true });

const db = Mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connect to Database"));

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api", authMiddleware.checkToken, appRoutes);

app.listen(port, () => {
	console.log(`Running backend api on ${port}`);
});
