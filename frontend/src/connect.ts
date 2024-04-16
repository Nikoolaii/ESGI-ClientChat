import {User} from './user';
import {io} from "socket.io-client";


export class Connexion {
    user: User;
    socket: any;

    constructor() {
        this.socket = io("ws://localhost:3000");
    }

    createConnexion(username: string) {
        this.socket.on("hello", (arg: any) => {
            console.log(arg);
        })

        if (this.testIfEmpty(username)) {
            throw new Error('Le nom d\'utilisateur ne peut pas être vide.');
        }
        this.storeInLocalStorage(username);
        const modal = document.getElementById('modalLogin');
        modal.style.display = 'none';
        this.user = new User(username);
        console.log(`Connected as ${this.user.username}`);
        return this.user;
    }

    testIfEmpty(string: string) {
        return string === '';
    }

    storeInLocalStorage(param: string) {
        localStorage.setItem('username', param);
    }

}