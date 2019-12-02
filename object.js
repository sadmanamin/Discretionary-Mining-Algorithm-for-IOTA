const Accounts = require('./account');
const Stake = require('./stake');

const account = new Accounts();
const stake = new Stake();

module.exports = {
    account,
    stake
};