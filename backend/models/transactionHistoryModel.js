const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionHistorySchema = mongoose.Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	trans_id: { type: Schema.Types.ObjectId, ref: "Transaction" }
});

module.exports = mongoose.model("TransactionHistory", TransactionHistorySchema);
