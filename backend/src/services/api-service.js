import express from "express";
import cors from "cors";

export class ApiService {
    app = express();
    ExpressPort = 4000;

    constructor(socketProvider) {
        this.app.use(cors());
        this.app.get("/", (req, res) => {
            res.send(socketProvider.messages);
        });
    }

    startServer() {
        this.app.listen(this.ExpressPort, () => {
            console.log(`Server is running on port ${this.ExpressPort}`);
        });
    }
}