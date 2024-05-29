import dotenv from "dotenv";
import express from "express";
import client from "./src/routes/client.js";

dotenv.config({path: '.env'});

const server = express();
const router = express.Router();

const port = process.env.PORT || 9000;

server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

router.use('/client', client);

server.use('/api', router);

server.all('*', (request, response) => {
   return  response.status(404).json({status: 404, message: 'route not exists'});
});

server.listen(port);