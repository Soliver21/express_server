import mysql, { type ResultSetHeader } from "mysql2/promise";

//Adatb. kapcsolat létrehozása
const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "",
    database: "userdb"
});

//A felhasználó typusát deklaráljuk
export interface User {
    id:number;
    nev:string;
    cim:string;
    szuletesiDatum: string | null;
}
//Összes felhasználó lekérése:
export const getUsers = async() => {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows;
}
export const createUser = async(user : Omit<User, "id">) => {
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO users (nev,cim,szuletesiDatum) VALUES (?,?,?)", 
        [user.nev, user.cim, user.szuletesiDatum]);

    const insertedId = result.insertId;
    return {...user , id: insertedId}
} 

export default pool;