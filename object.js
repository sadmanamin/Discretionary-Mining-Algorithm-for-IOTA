const Accounts = require('./account');
const Stake = require('./stake');
const Miner = require('./miner');

const account = new Accounts();
const stake = new Stake();
const miner = new Miner();

module.exports = {
    account,
    stake,
    miner
};