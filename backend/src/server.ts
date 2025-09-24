import express from "express";
import cors from "cors";
import * as path from "node:path";
import router from "./router.js";

const PORT = 8000;
const HOST = "127.0.0.1";

// Szerver indítása:
const server = express();
//const __filename = url.fileURLToPath(import.meta.url);
//console.log("Könyvtár: ", import.meta.dirname);
//console.log(__filename);
//console.log("knév:", path.dirname(__filename));
const __dirname = import.meta.dirname;
const staticFilesDir = path.join(__dirname, "..", "dist");

// Cors problémákra - Csak fejlesztési időben: minden kérést engedélyezünk.
server.use(cors());
server.use(express.json()); //A requestben lévő json js object-té konvertálódjon

// Statikus állományok (a szerver csak küldi ezeket) küldése a kliens felé:
server.use(express.static(staticFilesDir));

// A "többi kérés", a rest api-hoz illeszkedő kérések irányítása:
server.use("/api", router);

server.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`));
