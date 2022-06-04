const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zjbev.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const partCollections = client.db('my-app').collection('parts');
        const orderCollections = client.db('my-app').collection('orders');
        const profileCollections = client.db('my-app').collection('profiles');

        // this api for all parts
        app.get('/part', async (req, res) => {
            const query = {};
            const cursor = partCollections.find(query);
            const parts = await cursor.toArray();
            res.send(parts);
        });
        // this api for specific part
        app.get('/part/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const part = await partCollections.findOne(query);
            res.send(part);
        });
        // this api for post/add parts 
        app.post('/part', async (req, res) => {
            const parts = req.body;
            const query = { productName: parts.productName, description: parts.description, minimumQuantity: parts.minimumQuantity, availableQuantity: parts.availableQuantity, price: parts.price, image: parts.image }
            const newParts = await partCollections.insertOne(query);
            res.send(newParts);
        })
        // this api for all order post 
        app.post('/order', async (req, res) => {
            const order = req.body;
            const query = { name: order.name, email: order.email, address: order.address, phone: order.phone, productName: order.productName, minimumQuantity: order.minimumQuantity }
            const result = await orderCollections.insertOne(query);
            res.send(result);
        });
        // this api for profile updata 
        app.post('/profile', async (req, res) => {
            const profile = req.body;
            const query = { name: profile.name, email: profile.email, education: profile.education, location: profile.location, phone: profile.phone, linkedin: profile.linkedin };
            const result = await profileCollections.insertOne(query);
            res.send(result);
        });

    }
    finally {

    }

}

run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('Hello my server')
})

app.get('/hero', (req, res) => {
    res.send('Hero meets hero ku')
})

app.listen(port, () => {
    console.log('My server is ready', port)
})