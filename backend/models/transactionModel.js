const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = mongoose.Schema({
	currency_amount: Schema.Types.Decimal128,
	currency_type: String,
	source_user_id: { type: Schema.Types.ObjectId, ref: "User" },
	target_user_id: { type: Schema.Types.ObjectId, ref: "User" },
	timestamp_created: { type: Date, default: Date.now },
	timestamp_processed: { type: Date, default: null },
	transaction_status: {
		type: String,
		enum: ["PENDING", "CANCELLED", "COMPLETED", "FAILED"],
		default: "PENDING"
	}
});

module.exports = mongoose.model("Transaction", TransactionSchema);
