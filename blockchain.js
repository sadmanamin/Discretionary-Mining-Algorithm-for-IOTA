const Block = require('./block');
let chain; 
class Blockchain{
    
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
      const blocka = Block.createBlock(this.chain[this.chain.length-1],data);
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
        return this.accounts.getBalance(publicKey);
    }

    getLeader() {
        return this.stakes.getMax(this.validators.list);
    }

}

module.exports = Blockchain;