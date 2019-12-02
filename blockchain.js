const Block = require('./block');
const Stake = require("./stake");
const Account = require("./account");
const Validators = require("./validators");
const { account } = require("./object");
const { stake } = require("./object");

let chain; 
class Blockchain{
    
    constructor(){
        this.chain = [Block.genesis()];
        this.stakes = new Stake();
        this.accounts = new Account();
        this.validators = new Validators();
    }

    addBlock(data,wallet,HTTP_PORT) {
        const blocka = Block.createBlock(this.chain[this.chain.length-1],data,wallet,HTTP_PORT);
        this.chain.push(blocka);

        return blocka;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        for(let i = 1 ; i<chain.length; i++){
            const blockaa = chain[i];
            const lastBlock = chain[i-1];
            if((blockaa.lastHash !== lastBlock.hash) || (
                blockaa.hash !== Block.blockHash(blockaa)))
            return false;
        }

        return true;

    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Recieved chain is not longer than the current chain");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Recieved chain is invalid");
            return;
        }
        
        console.log("Replacing the current chain with new chain");
        this.chain = newChain; 
    }

    getBalance(publicKey) {
        return account.getBalance(publicKey);
    }

    getLeader() {
        return stake.getMax(this.validators.list);
    }

    createBlock(transactions, wallet) {
        const block = Block.createBlock(
          this.chain[this.chain.length - 1],
          transactions,
          wallet
        );
        return block;
    }

    isValidBlock(block) {
        const lastBlock = this.chain[this.chain.length - 1];
        /**
         * check hash
         * check last hash
         * check signature
         * check leader
         */
        if (
          block.lastHash === lastBlock.hash &&
          block.hash === Block.blockHash(block) &&
          Block.verifyBlock(block) &&
          Block.verifyLeader(block, this.getLeader())
        ) {
          console.log("block valid");
          this.addBlock(block);
          return true;
        } else {
          return false;
        }
    }

    executeTransactions(block) {
        block.data.forEach(transaction => {
          switch (transaction.type) {
            case TRANSACTION_TYPE.transaction:
              this.accounts.update(transaction);
              this.accounts.transferFee(block, transaction);
              break;
            case TRANSACTION_TYPE.stake:
              this.stakes.update(transaction);
              this.accounts.decrement(
                transaction.input.from,
                transaction.output.amount
              );
              this.accounts.transferFee(block, transaction);
    
              break;
            case TRANSACTION_TYPE.validator_fee:
              if (this.validators.update(transaction)) {
                this.accounts.decrement(
                  transaction.input.from,
                  transaction.output.amount
                );
                this.accounts.transferFee(block, transaction);
              }
              break;
          }
        });
    }

}

module.exports = Blockchain;