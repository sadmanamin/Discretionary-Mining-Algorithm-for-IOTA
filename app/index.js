const express = require('express');
const Blockchain = require('../blockchain');
const Miner = require('../miner');
const bodyParser = require('body-parser');
const P2pserver = require('./p2pserver.js');
const blockchain = new Blockchain();
//const miner = require('../object');

const Wallet = require('../wallet/wallet');
const TransactionPool = require('../wallet/transaction-pool');
const stringify = require('json-stringify-safe');
const miner = new Miner();

//get the port from the user or set the default port
console.log(process.env.HTTP_PORT);
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app  = express();
const wallet = new Wallet(Date.now().toString());
const transactionPool = new TransactionPool();
console.log(miner);
const p2pserver = new P2pserver(blockchain,transactionPool,miner);
console.log(p2pserver);
//using the blody parser middleware
app.use(bodyParser.json());

// create a new blockchain instance


//EXPOSED APIs

//api to get the blocks
app.get('/blocks',(req,res)=>{

    
    res.json(blockchain.chain);

});

app.get('/transactions',(req,res)=>{
    console.log(transactionPool.transactions);
    //console.log(blockchain.chain);
    res.json(stringify(transactionPool.transactions));
  });

//api to add blocks
app.post('/mine',(req,res)=>{
    let dataa = JSON.stringify(req.body.data);
    console.log(dataa);
    const blockb = blockchain.addBlock(dataa,wallet,HTTP_PORT);
    console.log(Date.now().toString());
    console.log(`New block added: ${blockb.toString()}`);
    p2pserver.syncChain();
    res.redirect('/blocks');
});

app.post("/transact", (req, res) => {
    const { to, amount, type } = req.body;
    console.log(to+" "+amount+" "+type+" "+blockchain+" "+transactionPool);
    const transaction = wallet.createTransaction(
       to, amount, type, blockchain, transactionPool
    );
    //console.log(blockchain.addBlock("yao"));
    p2pserver.broadcastTransaction(transaction);
    res.redirect("/transactions");
});

app.get("/participants", (req,res)=>{
    res.json(miner.miners);
});

app.post("/addrequest", (req, res) => {
    const fee = req.body.fee;
    console.log(fee);
    const time = Date.now().toString();
    miner.insertParticipant(fee,time,parseInt(HTTP_PORT));
    p2pserver.broadcastMiner(fee,time,parseInt(HTTP_PORT));
    res.redirect("/participants");
});

app.post("/sort", (req, res) => {
    miner.sort();
    res.redirect("/participants");
});

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
})

p2pserver.listen(); // starts the p2pserver


