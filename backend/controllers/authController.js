const User = require("../models/userModel");
const jwtUtil = require("../utils/jwtUtils");

exports.login = (req, res) => {
	const { email, password } = req.body;
	const hashedPassword = jwtUtil.getHash(password);
	User.count({ email, password: hashedPassword }, (err, count) => {
		if (err) {
			return false;
		}
		if (count > 0) {
			const token = jwtUtil.generateToken({ email: email });
			res.json({
				status_code: 200,
				status: "Success",
				token
			});
		} else {
			res.json({
				status_code: 401,
				status: "Failed",
				msg: "Invalid username and or password"
			});
		}
	});
};

exports.register = (req, res) => {
	const { name, description, email, password } = req.body;
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) {
			res.json({
				status_code: 401,
				status: "Failure",
				msg: err
			});
		}
		if (existingUser) {
			res.json({
				status_code: 401,
				status: "Failure",
				msg: "User already exists"
			});
		} else {
			const hashedPassword = jwtUtil.getHash(password);
			const newUser = new User();
			newUser.name = name;
			newUser.description = description;
			newUser.email = email;
			newUser.password = hashedPassword;
			newUser.save((err, registeredUser) => {
				if (err) {
					res.json({
						status_code: 401,
						status: "Failure",
						msg: err
					});
				}
				if (registeredUser) {
					//generate token and send
					const token = jwtUtil.generateToken({ email: email });
					res.json({
						status_code: 200,
						status: "Success",
						token
					});
				} else {
					res.json({
						status_code: 401,
						status: "Failure",
						msg: "Registration failed."
					});
				}
			});
		}
	});
};
