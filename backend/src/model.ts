import mysql, { type ResultSetHeader } from "mysql2/promise";

// Adatbázis kapcsolat
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "userdb",
});

export interface User {
    id: number;
    nev: string;
    cim: string;
    szuletesiDatum: string | null;
}

// Összes felhasználó lekérése
export const getUsers = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        return rows;
    } catch (err) {
        throw new Error("Error fetching users from database.");
    }
};

// Felhasználó létrehozása
export const createUser = async (user: Omit<User, "id">) => {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?, ?, ?)",
            [user.nev, user.cim, user.szuletesiDatum]
        );
        const insertedId = result.insertId;
        return { ...user, id: insertedId };
    } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Error inserting user into database.");
    }
};


export const removeUser = async (id : number) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("DELETE FROM users WHERE id=?",[id]);
    return result.affectedRows > 0;
}

export const modifiedUser = async (id :number, user : Partial<User>) => {
    const [result] = await pool.query<ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id = ?", [user.nev, user.cim, user.szuletesiDatum]);
    return {...user, id : result.insertId};
}

export default pool;