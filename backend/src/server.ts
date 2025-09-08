import express from "express";
import cors from "cors";

const PORT = 8000;
const HOST = "127.0.0.1";
const server = express();
server.use(cors());
server.use(express.json())
server.listen(8000, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
})