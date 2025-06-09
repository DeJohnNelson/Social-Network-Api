import express from 'express';
import { MongoClient } from 'mongodb';
import db from './config/connection'; 

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(connectionStringURI);
const dbName = 'frienddb';

async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    // You can now use `db.collection('yourCollection')` to interact with MongoDB

    app.get('/', (req, res) => {
      res.send('Express + MongoDB server is running!');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});