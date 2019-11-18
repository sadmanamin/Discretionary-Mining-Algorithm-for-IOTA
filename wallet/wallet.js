const {INITAL_BALANCE} = require('../config');

class Wallet {
    constructor(secret) {
      this.balance = 0;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
      this.balance = INITIAL_BALANCE;
    }

    createTransaction(to, amount, type, blockchain, transactionPool) {
        let transaction = Transaction.newTransaction(this, to, amount,                                                                                                    type);
        transactionPool.addTransaction(transaction);
        return transaction;
    }
  
    toString() {
      return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
    }
}