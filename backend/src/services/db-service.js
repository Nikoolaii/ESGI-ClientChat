import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
    uri = process.env.DB_LINK;

    constructor() {
        console.log(this.uri);
        this.client = new MongoClient(this.uri);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected to MongoDB");
        } catch (e) {
            console.error(e);
        }
    }

    async getCollection(collectionName) {
        return this.client.db("messages").collection(collectionName).find().toArray();
    }

    async insertOne(collectionName, data) {
        await this.client.db("messages")
            .collection(collectionName)
            .insertOne(data, (err, result) => {
                if (err) throw err;
                return result;
            });
    }
}
