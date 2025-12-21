import bcrypt from "bcryptjs"
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken";


const signUp = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    // const role = "customer";

    const userExist = await pool.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
    );

    if (userExist.rows.length > 0) {
        throw new Error("User with this email already exist")
    };


    const hashedPassword = await bcrypt.hash(password as string, 10);


    const result = await pool.query(
        `INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3,$4, $5) RETURNING *`, [name, email, hashedPassword, phone, role]
    );

    return result.rows[0];
};



const signIn = async (email: string, password: string) => {
    const result = await pool.query(`
        SELECT * FROM users WHERE email=$1`, [email]);


    // console.log(result);

    if (result.rows.length === 0) {
        return null;
    };


    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return null;
    };


    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role },
        config.jwtSecret as string,
        {
            expiresIn: '7d',
        }

    );


    return { token, user }
};





export const authServices = {
    signUp,
    signIn,
}
