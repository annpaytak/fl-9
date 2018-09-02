function userCard(key){
	let balance = 100,
	transactionLimit = 100,
	tax = 0.005,
	historyLogs = [],
	operationTime = new Date().toLocaleString('en-GB');
	return{
		getCardOptions(){ 
			return {key, balance, transactionLimit, historyLogs};
		},
		putCredits(amount){
			balance += amount;
			historyLogs.push({
				operationType: `Received credits`, credits: amount, operationTime
			});
		},
		takeCredits(amount){
			balance -= amount;
			historyLogs.push({
				operationType: `Withdrawal of credits`, credits: amount, operationTime
			});
		},
		setTransactionLimit(amount){
			transactionLimit = amount;
			historyLogs.push({
				operationType: 'Transaction limit change', credits: amount, operationTime
			});
		},
		transferCredits(amount, card){
			const amountWTax = amount + amount * tax;
			if(amountWTax > balance){
				console.log('Balance exceeded');
			}else if(amountWTax > transactionLimit){
				console.log('Transaction limit exceeded');
			}else{
				this.takeCredits(amountWTax);
				card.putCredits(amount);
			}
		}
	};
}

class UserAccount {
	constructor(name){
		this.name = name;
		this.cards = [];
		this.maxQCards = 3;
	}
	addCard(){
		if(this.cards.length > this.maxQCards){
			console.log('You have reached max quantity of cards');
		}else{
			this.cards.push(userCard(this.cards.length + 1));
		}
	}
	getCardByKey(key){
		return this.cards[key - 1];
	}
}