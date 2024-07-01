const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGO_URL || "";
const client = new MongoClient(connectionString);

let db;

const connectToDb = async () => {
    if(!db){
        try{
            const conn = await client.connect();
            db = conn.db();
        } catch (e){
            throw e;
        }
    }
    return db;
}

module.exports = connectToDb;