const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zt7la.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const usersCollections = client.db('foodExpress').collection('users');
        // user api 
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = usersCollections.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


    }
    finally {

    }

}

run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('Hello my server')
})

app.listen(port, () => {
    console.log('My server is ready', port)
})