import express, { response } from 'express';
import { createUser, getUsers, removeUser, modifiedUser, getOneUser, modifiedFullUser, findUsersBySearch } from './model.js';

export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getUsers();
        res.status(200)
            .type("application/json")
            .send(data);
    }catch(error) {
        res.status(500).type("application/json").send({error: "Users request failed"});
    }
    
}
export const getOne = async (req: express.Request, res: express.Response) => {
    try {
        const id = parseInt(req.params.id!)
        const user = await getOneUser(id);
        if (user.length === 0) {
            res.status(400)
            .type("application/json")
            .send({error: "Nincs ilyen felhasználó"});
        }else{
            res.status(200)
            .type("application/json")
            .send(user);
        }
    }catch(error) {
        res.status(500).type("application/json").send({error: "Users request failed"});
    }
    
}

export const addUser = async (req: express.Request, res: express.Response) => {
    const newUser = req.body;
    try{
        const user = await createUser(newUser);
        res.status(201).type("application/json").send(user);
    } catch (error) {
        res.status(500).type("application/json").send("Nem sikerült létrehozni az újn felhasználót!");
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!);
    const result = await removeUser(id);

    if(result) res.status(200).type("application/json").send({message: "Removed successfully"});
    else res.status(500).type("application/json").send({error: "Failed to remove"});
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const updateUser = req.body;
    const id = parseInt(req.params.id!, 10);
    try{
        const result = await modifiedUser(id, updateUser);
        const response = result ? {message: "Successful operation"} : {message: "Failed operation"} // TODO
        res.status(201).type("application/json").send(response);
    }catch(error) {
        res.status(500).type("application/json").send(response);
    }
}
export const updateFullUser = async (req: express.Request, res: express.Response) => {
    const updateUser = req.body;
    const id = parseInt(req.params.id!);
    try{
        const result = await modifiedFullUser(id, updateUser);
        return res.status(201).type("application/json").send({message : result});
    }catch(error) {
        res.status(500).type("application/json").send({message: "Internal server error."});
    }
}
export const searchUser = async(req:express.Request, res: express.Response) => {
    try{
        const search = req.query.search ? String(req.query.search) : "";
        const users = await findUsersBySearch(search);
        return res.send(users);
    }catch(error){
        res.status(500).type("application/json").send({message: "Internal server error."});
    }
}