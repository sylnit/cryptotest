const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: String,
	description: String,
	email: String,
	bitcoin_wallet_id: String,
	bitcoin_wallet_balance: Schema.Types.Decimal128,
	ethereum_wallet_id: String,
	ethereum_wallet_balance: Schema.Types.Decimal128,
	max_trans_amount: Schema.Types.Decimal128,
	transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
});

module.exports = mongoose.model("User", UserSchema);
