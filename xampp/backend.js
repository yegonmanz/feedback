const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Replace with your MongoDB URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

client.connect().then(() => {
    const db = client.db('feedbackDB');
    const collection = db.collection('feedbacks');

    app.post('/submitFeedback', async (req, res) => {
        const feedback = req.body;
        try {
            await collection.insertOne(feedback);
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.json({ success: false });
        }
    });

    app.get('/feedbacks', async (req, res) => {
        try {
            const feedbacks = await collection.find().toArray();
            res.json(feedbacks);
        } catch (error) {
            console.error(error);
            res.json([]);
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}).catch(error => console.error(error));
