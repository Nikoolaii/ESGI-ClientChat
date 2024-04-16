import {MongoClient} from 'mongodb';

export class Database {
    uri = "mongodb+srv://nikolailemerre:ZzhFhLEY15PGHRbP@chat-app.wnfgghk.mongodb.net/?retryWrites=true&w=majority&appName=chat-app";

    constructor() {
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
        await this.client.db("messages")
            .collection(collectionName)
            .find()
            .toArray((err, result) => {
                if (err) throw err;
                return result;
            });
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
