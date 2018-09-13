const SHA256 = require('crypto-js');

class transactions{
    constructor(fromAddress, toAdress, amount){
        this.fromAddress = fromAddress;
        this.toAdress = toAdress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){

        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this-this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2017", "Genesis block", "0");
    }  
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Data.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transactions){
        this.pendingTransactions.push(transactions);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let bmoCoin = new Blockchain();
bmoCoin.createTransaction(new Transactions("address1, address 2", 100));
bmoCoin.createTransaction(new Transactions("address2, address 1", 50));

console.log("\n Starting the miner...");
bmoCoin.minePendingTransactions('bmo-address');

console.log("\nBalance of BMO is", bmoCoin.getBalanceOfAddress('bmo-address'));

console.log("\n Starting the miner again...");
bmoCoin.minePendingTransactions('bmo-address');

console.log("\nBalance of BMO is", bmoCoin.getBalanceOfAddress('bmo-address'));

/*console.log("Mining block 1...");
bmoCoin.addBlock(new Block(1, "10/07/2017", {amount: 4}));

console.log("Mining block 2...");
bmoCoin.addBlock(new Block(2, "12/07/2017", {amount: 10}));*/

