import mysql, { type ResultSetHeader } from "mysql2/promise";

// Adatbázis-kapcsolat (pool) létrehozása:

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "",
    database: "userdb"
});

// A felhasználó típusát deklaráljuk:
export interface User {
    id: number;
    nev: string;
    cim: string;
    szuletesiDatum: string | null;
};

// Összes felhasználó lekérése:
export const getUsers = async () => {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users");
    return rows;
}
export const getOneUser = async (id : number) => {
    const [result] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);
    return result;
}

export const createUser = async (user: Omit<User, "id">) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)", 
        [user.nev, user.cim, user.szuletesiDatum]);

    const insertedId = result.insertId;
    return {...user, id: insertedId};
}

export const removeUser = async (id: number) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("DELETE FROM users WHERE id=?", [id]);
    
    return result.affectedRows > 0;
}

export const modifiedUser = async (id: number, user: Partial<User>) => {
    let currentUser;
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length > 0) {
        currentUser = rows[0];
        console.log(currentUser, typeof currentUser);
    }else{
        return false;
    }
    const updatedUser = {
        id : id,
        nev : user.nev ?? currentUser!.nev,
        cim: user.cim ?? currentUser!.cim,
        szuletesiDatum : user.szuletesiDatum ?? currentUser!.szuletesiDatum 
    }
    const [result] = await pool.query<mysql.ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id = ?", [updatedUser.nev, updatedUser.cim, updatedUser.szuletesiDatum, id]);
    // ????
    return result.affectedRows > 0;
}
export const modifiedFullUser = async (id: number, user: User) => {
    let [result] = await pool.query<mysql.ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id = ?",[user.nev,user.cim,user.szuletesiDatum, id]);
    if (result.affectedRows === 0){
        [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)",[user.nev, user.cim, user.szuletesiDatum]);
        return {...user, id: result.insertId};
    }else return {...user, id: id}
}
export const findUsersBySearch = async(search : string) => {
    if (!search) {
        const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users");
        return rows;
    }else{
        const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE cim LIKE ?", [`%${search}%`]);
        return rows;
    }
}