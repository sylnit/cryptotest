require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwtPrivateKey = process.env.JWT_PRIVAT_KEY;
const salt = bcrypt.genSaltSync(saltRounds);
exports.getHash = plainPassword => {
	const hash = bcrypt.hashSync(plainPassword, salt);
	return hash;
};

exports.generateToken = payload => {
	let token = null;
	try {
		token = jwt.sign(payload, jwtPrivateKey, {
			issuer: "Salamantex",
			subject: payload.email,
			expiresIn: "5h",
			algorithm: "RS256"
		});
	} catch (e) {
		console.log(e);
	}
	return token;
};
