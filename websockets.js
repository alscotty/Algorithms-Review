// client + server
// web sockets
//  128kb size requests - >= get's split 1 at a time, chunks (any order)
//     send back acknowledgement
//     if not received in 5 sec, client send again
//  reliability

 

class HttpClient {
    constructor() {
        this.messages = [];
        this.client = null;
        this.server = null;
    }

    setClient(client) {
        this.client = client;
    }

    setServer(server) {
        this.server = server;
    }

    emit(message, timeout = 5000) {
        if (this.server) {
            this.server.handleMessage(message);
        }
    }

    handleMessage(message) {
        const bytes = message.length * 2;
        const kilobytes = (bytes / 1024).toFixed(2);
        // console.log("Message: ", message);
        console.log(`Message size: ${kilobytes} KB`);

        let kmLimit = 1;
        if (kilobytes > kmLimit) {
            let remainingMessage = message;
            console.log("Message is too large, splitting into chunks");
            while (remainingMessage.length > 0) {
                const chunk = remainingMessage.slice(0, kmLimit);
                this.messages.push(chunk);
                this.client.onMessage(chunk);
                remainingMessage = remainingMessage.slice(kmLimit);
            }
        } else {
            this.messages.push(message);
            this.client.onMessage(message);
        }
    }
}

class Client {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.httpClient.setClient(this);
    }

    emit(message) {
        this.httpClient.emit(message);
    }

    onMessage(message) {
        console.log('Client received:', message);
    }
}

class Server {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.httpClient.setServer(this);
        this.serverMessages = [];
    }

    handleMessage(message) {
        console.log("Server handling message: ", message);
        this.serverMessages.push(message);
        this.httpClient.handleMessage(message);
    }

    onMessage(message) {
        console.log('Server received:', message);
    }
}

// Example usage
const httpClient = new HttpClient();
const client = new Client(httpClient);
const server = new Server(httpClient);

// Test the communication
// console.log("Sending small message:");
// client.emit('Hello, this is a test message!');

console.log("Sending large message for chunking:");
// Create a string that's over 128KB (128 * 1024 = 131072 bytes)
const largeString = 'A'.repeat(1000); // This creates a string of 128KB
client.emit(largeString);