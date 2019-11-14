const { Validator } = require("node-input-validator");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const TransactionHistory = require("../models/transactionHistoryModel");

exports.addCurrency = (req, res) => {
	const { user_id, currency_type, wallet_id, amount } = req.body;
	const v = new Validator(req.body, {
		user_id: "required|string",
		currency_type: "required|string",
		wallet_id: "required|string",
		amount: "required|decimal"
	});
	v.check().then(matched => {
		if (!matched) {
			res.json({
				status_code: 422,
				status: "Failure",
				msg: "Validation errors",
				errors: v.errors
			});
		}
		const user = User.findOne({ _id: user_id });
		if (currency_type == "BitCoin") {
			user.bitcoin_wallet_id = wallet_id;
			user.bitcoin_wallet_balance = amount;
			user.save();
			res.json({
				status_code: 200,
				status: "Success",
				msg: "Currency successfully added"
			});
		} else if (currency_type == "Ethereum") {
			user.ethereum_wallet_id = wallet_id;
			user.ethereum_wallet_balance = amount;
			user.save();
			res.json({
				status_code: 200,
				status: "Success",
				msg: "Currency successfully added"
			});
		} else {
			//Invalid currency type supplied.
		}
	});
};

exports.createTransaction = (req, res) => {
	//
	const { amount, currency_type, source_user_id, target_user_id } = req.body;
	const v = new Validator(req.body, {
		amount: "required|decimal",
		currency_type: "required|string",
		source_user_id: "required|integer",
		target_user_id: "required|integer"
	});

	v.check().then(matched => {
		if (!matched) {
			res.json({
				status_code: 422,
				status: "Failure",
				msg: "Validation errors",
				errors: v.errors
			});
		}
		//create the transaction
		const transaction = new Transaction({
			amount,
			currency_type,
			source_user_id,
			target_user_id
		});
		transaction.save(err => {
			if (err) {
				return next(err);
			}
			res.json({
				status_code: 200,
				status: "Success",
				msg: "Transaction successfully saved"
			});
		});
	});
};

exports.getTransactionHistory = (req, res) => {
	//
	const { user_id } = req.params;
	const v = new Validator(req.params, {
		user_id: "required|string"
	});
	v.check().then(matched => {
		if (!matched) {
			res.json({
				status_code: 422,
				status: "Failure",
				msg: "Validation errors",
				errors: v.errors
			});
		}
		TransactionHistory.find({ source_user_id: user_id }, (err, docs) => {
			if (err) {
				res.json({});
			}
			res.json({
				status_code: 200,
				status: "Success",
				msg: "Transaction History retrieved",
				data: docs
			});
		});
	});
};

exports.getTransactionStatus = (req, res) => {
	//
	const { transaction_id } = req.params;
	const v = new Validator(req.params, {
		transaction_id: "required"
	});
	v.check().then(matched => {
		if (!matched) {
			res.json({
				status_code: 422,
				status: "Failure",
				msg: "Validation errors",
				errors: v.errors
			});
		}
		if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
			res.json({
				status_code: 422,
				status: "Failure",
				msg: "Validation errors",
				errors: "Invalid ID field"
			});
		}
		Transaction.findOne({ _id: transaction_id }, (err, trans) => {
			if (err) {
				res.json({
					status_code: 422,
					status: "Failure",
					msg: "Validation errors",
					errors: err
				});
			}
			res.json({
				status_code: 200,
				status: "Success",
				data: trans && trans.status ? trans.status : "Unknown",
				msg: "Transaction successfully retrieved"
			});
		});
	});
};
