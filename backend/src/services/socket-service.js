import {Server} from "socket.io";
import {Database} from "./db-service.js";

export class SocketService {
    port = 3000;
    io = null;
    messages = [];
    dbProvider = new Database();

    constructor() {
        this.getMessages().then(r => {
            console.log("Messages loaded");
        });
    }

    connectSocket() {
        this.io = new Server(this.port, {
            cors: {
                origin: "*",
            }
        });
        if (this.io) {
            console.log(`Socket is running on port ${this.port}`);
        }
    }

    startEvent() {
        this.io.on("connection", (socket) => {
            socket.on("message", (arg) => {
                console.log("Message sent by :", arg.user.username)
                this.newMessage(arg);
                this.getMessages()
                socket.broadcast.emit("message", arg);
            });
        });
    }

    async getMessages() {
        await this.dbProvider.connect();
        this.messages = await this.dbProvider.getCollection("messages");
    }

    async newMessage(data) {
        await this.dbProvider.connect();
        await this.dbProvider.insertOne("messages", data);
    }
}