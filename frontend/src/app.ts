import '../scss/style.scss';
import {Connexion} from './connect';
import {Message} from './message';
import {User} from './user';

const messages: Message[] = [];
let user: User = null;
let connexion: Connexion = null;
let socket: any = null;

// Event handler for the form submission
const form = document.getElementById('connect-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    try {
        connexion = new Connexion();
        user = connexion.createConnexion(username);
        socket = connexion.socket;
        startListening();
    } catch (e) {
        alert(e.message);
    }
});

// Event handler for message sending
const messageButton = document.getElementById('messageButton');
messageButton.addEventListener('click', function (event) {
    event.preventDefault();
    const form = (document.getElementById('messageForm') as HTMLFormElement);
    const data = new FormData(form);
    const messageInput = (document.getElementById('messageInput') as HTMLInputElement);

    messageInput.value = "";
    if (messageInput) {
        const messageContent = data.get('messageInput').toString();
        const message = new Message(messageContent, user);
        messages.push(message);
        showMessage(message);
        sendMessageToSocket(message, connexion);
    }
});

function startListening() {
    getMessages();
    // Event handler for message receiving
    socket.on('message', (arg: any) => {
        arg.timestamp = new Date(arg.timestamp);
        showMessage(arg);
    });
}

function showMessage(message: Message) {

    const messagesLogs = document.getElementById('messageLogs'); // Changed 'messageLogs' to 'messagesLogs'
    const messageElement = document.createElement('div');
    const username = localStorage.getItem('username');

    if (message.user.username === username) {
        messageElement.classList.add('messageByUser');
    } else {
        messageElement.classList.add('messageByOther');
    }

    messageElement.innerHTML = `
    <p class="messageUser">${message.user.username}</p>
    <p class="messageContent">${message.content}</p>
    <p class="messageDate">${message.timestamp.toLocaleString()}</p>
  `;
    messagesLogs.appendChild(messageElement);
}

// Test if the user is already set in the local storage
const username = localStorage.getItem('username');
if (username) {
    connexion = new Connexion();
    user = connexion.createConnexion(username);
    socket = connexion.socket;
    startListening();
}

function sendMessageToSocket(message: Message, connexion: Connexion) {
    socket.emit('message', message);
}

function getMessages() {
    fetch('http://localhost:4000/')
        .then(response => response.json())
        .then(data => {
            data.forEach((message: any) => {
                message.timestamp = new Date(message.timestamp);
                messages.push(message);
                showMessage(message);
            });
        });
}