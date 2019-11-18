const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
const uuidV1 = require('uuid/v1');

class ChainUtil {
    static genKeyPair(secret) {
      return eddsa.keyFromSecret(secret);
    }

    static id(){
        return uuidV1();
    }

    static verifySignature(publicKey,signature,dataHash){
        return ec.keyFromPublic(publicKey).verify(dataHash,signature);
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }
}
module.exports = ChainUtil;