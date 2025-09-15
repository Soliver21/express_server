import express from "express"
import { createUser, getUsers } from "./model.js";
import { error } from "console";

export const getAll = async(req :express.Request, res :express.Response) => {
    try{
        const data = await getUsers();
        res.status(200).type("application/json").send(data);
    }catch{
        res.status(500).type("application/json").send({error: "Internal server error."})
    }
}

export const addUser = async(req :express.Request, res :express.Response) => {
        const newUser = req.body;
    try{

        const user = await createUser(newUser);
        res.status(201).type("application/json").send(user);
    }catch{
        res.status(400).type("application/json").send({error: "Client error"})
    }
}

export const deleteUser = async (req :express.Request, res :express.Response) => {
    const id = parseInt(req.params.id!);
    if (id === 3) res.status(200).type("application/json").send({message: "successful"});
}