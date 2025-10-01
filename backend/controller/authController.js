import db from "../config/db.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return await res.status(401).json({ message: "Required fields" });

  try {
    //check the value is there in db

    const checkQuery = "SELECT * FROM users WHERE email = ?";

    const [result] = await db.promise().query(checkQuery, [email]);

    if (result.length > 0)
      return res.status(404).json({ message: " Email already exist" });

    const insertData =
      "INSERT INTO users(name, email, password) VALUES (?,?,?)";

    //hash password

    const hashPassword = await bycrypt.hash(password, 10);

    await db.promise().query(insertData, [name, email, hashPassword]);

    res.status(201).json({ message: "User successfully added" });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkQuery = "SELECT * FROM users WHERE email = ?";

    const [result] = await db.promise().query(checkQuery, [email, password]);
    console.log("hitted");

    if (result.length == 0)
      return res.status(401).json({ message: "Email not founded" });
    const user = result[0];
    const comparePassword = await bycrypt.compare(password, user.password);

    //Password decode

    if (!comparePassword)
      return res.status(401).json({ message: " Password is not match" });

    //Create token

    const token = jwt.sign(
      {
        userId: user.id,
        emailId: user.email,
        userName: user.name,
        role: user.role,
      },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.log(err);
  }
};

export { register, login };
