import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (block: Block): boolean =>
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.data === "string" &&
    typeof block.timestamp === "number"
      ? true
      : false;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const firstBlock: Block = new Block(
  0,
  "4q289304yu0",
  "",
  "Hello there?",
  202008042025
);

let blockchain: Block[] = [firstBlock];

const getBlock = (): Block[] => blockchain;

const getLatestBlock = (): Block => {
  const block = getBlock();
  return block[block.length - 1];
};

const getHash = (block: Block): string =>
  Block.calculateHash(
    block.index,
    block.previousHash,
    block.timestamp,
    block.data
  );

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const isBlockValid = (block: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(block)) {
    return false;
  } else if (prevBlock.index + 1 !== block.index) {
    return false;
  } else if (prevBlock.hash !== block.previousHash) {
    return false;
  } else if (
    prevBlock.timestamp > block.timestamp &&
    prevBlock.timestamp !== 202008042025
  ) {
    return false;
  } else if (getHash(block) !== block.hash) {
    return false;
  } else return true;
};

const createBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const index: number = previousBlock.index + 1;
  const previousHash: string = previousBlock.hash;
  const timestamp: number = getNewTimestamp();
  const hash: string = Block.calculateHash(
    index,
    previousHash,
    timestamp,
    data
  );
  const newBlock: Block = new Block(index, hash, previousHash, data, timestamp);
  console.log("GO", newBlock, getLatestBlock());
  return newBlock;
};

const addBlock = (block: Block): void | boolean => {
  if (isBlockValid(block, getLatestBlock())) {
    blockchain = [...blockchain, block];
  } else {
    console.log("Invalid block has been input.");
    return false;
  }
};

addBlock(createBlock("Hey"));
addBlock(createBlock("Bye"));
addBlock(createBlock("What's up?"));
addBlock(createBlock("Is it ok to go?"));

console.log(blockchain);
