const SHA256 = require('crypto-js/sha256');

class Block {
    
    constructor(timestamp, lastHash, hash, data, validator, signature,HTTP_PORT) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.validator = validator;
      this.signature = signature;
      this.HTTP_PORT = HTTP_PORT;
    }
  
    toString() {
      return `Block - 
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash}
          Hash      : ${this.hash}
          Data      : ${this.data}
          Validator : ${this.validator}
          Signature : ${this.signature}
          Port      : ${this.HTTP_PORT}`;
    }

    static genesis() {
        return new this(`genesis time`, "----", "genesis-hash", []);
    }

    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static createBlock(lastBlock, data, wallet,HTTP_PORT) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        // get the validators public key
        let validator = wallet.getPublicKey();
        
        // Sign the block
        let signature = Block.signBlockHash(hash, wallet);
        return new this(timestamp, lastHash, hash, data, validator, signature,HTTP_PORT);
    }

    static signBlockHash(hash, wallet) {
        return wallet.sign(hash);
    }

    static blockHash(block){
        //destructuring
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp,lastHash,data);
    }

    
  }

  module.exports = Block;