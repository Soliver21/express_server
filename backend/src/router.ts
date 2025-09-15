import { Router } from "express";
import {getAll,deleteUser, addUser} from "./controller.js"

const router = Router();

router.get("/users", getAll)
router.delete("/users/:id", deleteUser)
router.post("/users", addUser)

export default router;