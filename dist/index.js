"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (block) => typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.data === "string" &&
    typeof block.timestamp === "number"
    ? true
    : false;
const firstBlock = new Block(0, "4q289304yu0", "", "Hello there?", 202008042025);
let blockchain = [firstBlock];
const getBlock = () => blockchain;
const getLatestBlock = () => {
    const block = getBlock();
    return block[block.length - 1];
};
const getHash = (block) => Block.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const isBlockValid = (block, prevBlock) => {
    if (!Block.validateStructure(block)) {
        return false;
    }
    else if (prevBlock.index + 1 !== block.index) {
        return false;
    }
    else if (prevBlock.hash !== block.previousHash) {
        return false;
    }
    else if (prevBlock.timestamp > block.timestamp &&
        prevBlock.timestamp !== 202008042025) {
        return false;
    }
    else if (getHash(block) !== block.hash) {
        return false;
    }
    else
        return true;
};
const createBlock = (data) => {
    const previousBlock = getLatestBlock();
    const index = previousBlock.index + 1;
    const previousHash = previousBlock.hash;
    const timestamp = getNewTimestamp();
    const hash = Block.calculateHash(index, previousHash, timestamp, data);
    const newBlock = new Block(index, hash, previousHash, data, timestamp);
    console.log("GO", newBlock, getLatestBlock());
    return newBlock;
};
const addBlock = (block) => {
    if (isBlockValid(block, getLatestBlock())) {
        blockchain = [...blockchain, block];
    }
    else {
        console.log("Invalid block has been input.");
        return false;
    }
};
addBlock(createBlock("Hey"));
addBlock(createBlock("Bye"));
addBlock(createBlock("What's up?"));
addBlock(createBlock("Is it ok to go?"));
console.log(blockchain);
//# sourceMappingURL=index.js.map