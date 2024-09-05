## SVM Transfer Bot

SVM Transfer Bot can transfer random amount of gas token or native coin (between 0.00001 to 0.0001) of SVM blockchains (mainnet and testnet) automatically from a wallet that you want to other wallets (randomly interval between transfers 10s to 15s). I join many cryptocurrency airdrops and I usually use such bots that I code for projects that have testnet tasks (for example, the Sonic project recently).


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/0xArashz/svm-transfer-bot.git
   ```

2. Navigate into the project directory:

   ```bash
   cd svm-transfer-bot
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Prepare input files:

   - Create `.env` in the root and replace the `RPC_URL` and `PRIVATE_KEY` values:

   ```bash
   RPC_URL=SVM_BLOCKCHAIN_RPC_URL
   PRIVATE_KEY=SENDER_WALLET_PRIVATE_KEY
   ```

   - Create `recipients.json` in the root with an array of recipients SVM addresses (as many as you want):

   ```json
   [
     "RECIPENT_ADDRESS_01",
     "RECIPENT_ADDRESS_02",
     "RECIPENT_ADDRESS_03"
   ]
   ```


### Usage

Run bot:

```bash
npm start
```

<div>
    <img src="https://github.com/user-attachments/assets/6e4f7a73-c7b9-40f6-b55b-cdcc23d11631" width="100%">
</div>

NOTE: sometimes, due to network or even operating system malfunctions, you may receive errors that are not related to errors in the code, such as being reverted by the VM. This code is better to run in
Linux and if you get an error related to the code, it is most likely the problem with the amount of coins that is sent, and you can re-run the code by increasing its interval (above 0.001) in line 30.
