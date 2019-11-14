require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPrivateKey = process.env.JWT_PRIVAT_KEY;

const checkToken = (req, res, next) => {
	let token = req.headers["x-access-token"] || req.headers["authorization"];
	if (token && token.startsWith("Bearer")) {
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(token, jwtPrivateKey, (err, decoded) => {
			if (err) {
				res.json({
					status_code: 422,
					status: "Failure",
					msg: "Token is not valid"
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({
			status_code: 200,
			status: "Success",
			msg: "Auth token is not supplied"
		});
	}
};

module.exports = { checkToken };
