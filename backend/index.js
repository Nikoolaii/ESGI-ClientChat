import {Socket} from "./socket.js";
import {API} from "./api.js";

const socketProvider = new Socket();
socketProvider.connectSocket();
socketProvider.startEvent();

const APIProvider = new API(socketProvider);
APIProvider.startServer();


