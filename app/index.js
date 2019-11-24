const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2pserver.js');
const blockchain = new Blockchain();
const p2pserver = new P2pServer(blockchain);
const Wallet = require('../wallet/wallet');
const TransactionPool = require('../wallet/transaction-pool');

//get the port from the user or set the default port
console.log(process.env.HTTP_PORT);
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app  = express();
const wallet = new Wallet(Date.now().toString());
const transactionPool = new TransactionPool();

//using the blody parser middleware
app.use(bodyParser.json());

// create a new blockchain instance


//EXPOSED APIs

//api to get the blocks
app.get('/blocks',(req,res)=>{

    
    res.json(blockchain.chain);

});

app.get('/transactions',(req,res)=>{
    console.log("inside trans");
    res.json(transactionPool.transactions);
  });

//api to add blocks
app.post('/mine',(req,res)=>{
    let dataa = JSON.stringify(req.body.data);
    console.log(dataa);
    const blockb = blockchain.addBlock(dataa);
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
    res.redirect("/transactions");
});

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
})

p2pserver.listen(); // starts the p2pserver


