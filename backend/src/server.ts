import express from "express";
import cors from "cors";
import { json } from "node:stream/consumers";
import * as path from "node:path";
import * as url from "node:url";
import router from "./router.js";

const PORT = 8000;
const HOST = "127.0.0.1";
const server = express();
const __dirName = import.meta.dirname;
const staticFilesDir = path.join(__dirName, "..", "dist");
server.use(cors());
//Statikus állományok küldése a kliens felé.
server.use(express.static(staticFilesDir));
server.use("/api", router); 
//server.use(express.json())
server.listen(8000, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
})