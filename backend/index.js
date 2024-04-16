import {SocketService} from "./src/services/socket-service.js";
import {ApiService} from "./src/services/api-service.js";

const socketProvider = new SocketService();
socketProvider.connectSocket();
socketProvider.startEvent();

const APIProvider = new ApiService(socketProvider);
APIProvider.startServer();


