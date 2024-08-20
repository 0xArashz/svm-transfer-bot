const fs = require("fs");
const bs58 = require("bs58");
const web3 = require("@solana/web3.js");
require("dotenv").config();


const rpcURL = process.env.RPC_URL;
const connection = new web3.Connection(rpcURL, "confirmed");
const privateKey = process.env.PRIVATE_KEY;
const recipients = JSON.parse(
    fs.readFileSync("./recipients.json", "UTF-8")
);
const senderPublicKey = web3.Keypair.fromSecretKey(bs58.decode(privateKey));
const recipientsPublicKey = recipients.map(
    address => new web3.PublicKey(address)
);

const getRandomAmount = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(8);
};

const getRandomDelay = () => {
    return Math.floor(Math.random() * 6 + 10) * 1000;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let txCount = 0;
const sendTransaction = async () => {
    try {
        for (let recipientPublicKey of recipientsPublicKey) {
            const lamportsToSend = Math.floor(web3.LAMPORTS_PER_SOL * getRandomAmount(0.00001, 0.0001));
            const txData = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                    fromPubkey: senderPublicKey.publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: lamportsToSend,
                })
            );
            await web3.sendAndConfirmTransaction(connection, txData, [senderPublicKey]);
            txCount++;
            console.log(
                "\x1b[37m%s\x1b[0m",
                `--> #${txCount < 10 ? "0" + txCount : txCount} TRANSFER ${(lamportsToSend * Math.pow(10, -9)).toFixed(8)} COIN TO ${recipientPublicKey} DONE \u2705`
            );
            if (txCount !== recipientsPublicKey.length) {
                const interval = getRandomDelay();
                await sleep(interval);
            } else {
                console.log("\n");
                process.exit();
            }
        }
    } catch (error) {
        console.error("\x1b[31m%s\x1b[0m", `ERROR: ${error.message}`);
    }
};

process.stdout.write("\x1Bc");
console.log("\x1b[37m%s\x1b[0m", "##################################################");
console.log("\x1b[37m%s\x1b[0m", "#                                                #");
console.log("\x1b[37m%s\x1b[0m", "#             DEVELOPER: 0xArashz                #");
console.log("\x1b[37m%s\x1b[0m", "#     GITHUB: https://github.com/0xArashz        #");
console.log("\x1b[37m%s\x1b[0m", "#                                                #");
console.log("\x1b[37m%s\x1b[0m", "##################################################\n\n");
sendTransaction();