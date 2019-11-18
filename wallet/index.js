
class Index{
sign(dataHash){
    return this.keyPair.sign(dataHash);
}
}
module.exports = Index;