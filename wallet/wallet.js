const I = require('../config');
const ChainUtil = require('../chain-util')
const Transaction = require('../transaction')

class Wallet {
    constructor(secret) {
      this.balance = 0;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
      this.balance = I.INITAL_BALANCE;
      console.log("yao")
    }

    createTransaction(to, amount, type, blockchain, transactionPool) {
        let transaction = Transaction.newTransaction(this, to, amount,                                                                                                    type);
        transactionPool.addTransaction(transaction);
        return transaction;
    }

    hellu(){
      console.log("dsfdf");
    }
  
    toString() {
      return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
    }

    sign(dataHash){
      return this.keyPair.sign(dataHash);
    }
}
module.exports = Wallet;