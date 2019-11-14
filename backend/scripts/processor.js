const Transaction = require("../models/transactionModel");
const TransactionHistory = require("../models/transactionHistoryModel");

Transaction.find({ transaction_status: "PENDING" }, (err, transactions) => {
	if (err) {
		return;
	}
	transactions.forEach(item => {
		const source_user = User.find({ _id: item.source_user_id });
		let currency_type = item.currency_type;
		let currency_wallet_balance = item.currency_type + "_wallet_balance";
		//check

		if (
			source_user[currency_type] &&
			source_user[currency_wallet_balance] &&
			source_user[currency_wallet_balance] >= item.currency_amount
		) {
			//valid transaction, so proceed
			let target_user = User.find({ _id: item.target_user_id });
			source_user[currency_wallet_balance] -= item.currency_amount;
			source_user.save();
			target_user[currency_wallet_balance] += item.currency_amount;
			if(await target_user.save()){
				item.transaction_status = 'COMPLETED';
				item.save();
			}
		}
	});
});
