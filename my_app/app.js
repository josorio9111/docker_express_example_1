require("dotenv").config();
const Server = require("./configs/server");

const server = new Server();

server.listen();
