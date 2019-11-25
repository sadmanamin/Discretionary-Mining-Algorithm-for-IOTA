class Stake {
    constructor() {
      this.addresses = [];
      this.balance = {};
    }
  
    initialize(address) {
      if (this.balance[address] == undefined) {
        this.balance[address] = 0;
        this.addresses.push(address);
      }
    }
  
    addStake(from, amount) {
      this.initialize(from);
      this.balance[from] += amount;
    }
  
    getStake(address) {
      this.initialize(address);
      return this.balance[address];
    }
  
    getMax(addresses) {
      let balance = -1;
      let leader = undefined;
      addresses.forEach(address => {
        if (this.getBalance(address) > balance) {
          leader = address;
        }
      });
      return leader;
    }
  
    update(transaction) {
      let amount = transaction.output.amount;
      let from = transaction.input.from;
      this.addStake(from, amount);
    }
  }
  
  module.exports = Stake;