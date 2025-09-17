import { Router } from "express";
import { getAll, deleteUser, addUser, updateUser } from "./controller.js";

const router = Router();

router.get("/users", getAll);
router.post("/users", addUser); // Felhasználó hozzáadása
router.delete("/users/:id", deleteUser); // Felhasználó törlése
router.put("/users/:id", updateUser)

export default router;