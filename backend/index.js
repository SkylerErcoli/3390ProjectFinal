const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://skyler:system32@cluster0.dfvt4dx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    
        const database = client.db('Bank');
        const bank = database.collection('Bank');
        let query = { first_name: 'Testing' };
    
        app.get('/user', async (req, res) => {
          const user = await bank.findOne(query);
          res.json({ user });
        });
    
        app.post('/userupdate', async (req, res) => {
            const receivedEmail = req.body.email;
            console.log('Received Email:', receivedEmail);
          
            const newQuery = { email: receivedEmail };
            const newUser = await bank.findOne(newQuery);
          
            if (newUser) {
              query = newQuery;
              res.json({  newUser });
            } else {
              
            }
          });

        app.post('/transfer', async (req, res) => {
            try{
                const senderid = req.body.senderid;
                const transferid = req.body.transferid;
                transferamount = req.body.transferamount;
                console.log('Received transfer request to:', transferid);
                console.log('Amount to transfer: ', transferamount);
                const transferFromQuery = { id: senderid };
                const transferToQuery = { id: transferid};

                const fromUser = await bank.findOne(transferFromQuery);
                newBalance = parseFloat((fromUser.balance - transferamount).toFixed(10));
                //if( newBalance > 0.0) {
                await bank.findOneAndUpdate({id: senderid}, {$set: {balance: newBalance}}, function(err, pass) {
                    if (err) { throw err; }
                    else {  }
                });

                const toUser = await bank.findOne(transferToQuery);
                const receiverBalance = parseFloat(toUser.balance);
                transferamount = parseFloat(transferamount);
                newBalance2 = parseFloat((receiverBalance + transferamount).toFixed(2));

                await bank.findOneAndUpdate({id: transferid}, {$set: {balance: newBalance2}}, function(err, pass) {
                    if (err) { console.log(err); }
                    else {  }
                });

            } catch (error) {
                console.error('Error processing transfer:', error);
            }
  
        });
    
        app.listen(8000, () => {
          console.log('Server is running on port 8000.');
        });
    } finally {
      //console.log('Before Close');
      //await client.close();
    }
  }
  run().catch(console.dir);


