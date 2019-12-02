const I = require('../config');
const ChainUtil = require('../chain-util')
const Transaction = require('../transaction')

class Wallet {
    constructor(secret) {
      this.balance = 0;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
      //this.balance = I.INITAL_BALANCE;
      console.log("yao")
    }

    createTransaction(to, amount, type, blockchain, transactionPool) {
      this.balance = this.getBalance(blockchain);
      if (amount > this.balance) {
        console.log(
          `Amount: ${amount} exceeds the current balance: ${this.balance}`
        );
        return;
      }
      let transaction = Transaction.newTransaction(this, to, amount, type);
      transactionPool.addTransaction(transaction);
      return transaction;
    }

    getBalance(blockchain) {
      return blockchain.getBalance(this.publicKey);
    }

    getPublicKey() {
      return this.publicKey;
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
      return this.keyPair.sign(dataHash).toHex();
    }
}
module.exports = Wallet;