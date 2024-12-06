import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const passwordHash = bcrypt.hashSync(password);

  // Insert the new user into the database
  try {
    const insertUser = database.prepare(`
            INSERT INTO users(username,password)
            VALUES (?, ?)    
        `);
    const result = insertUser.run(username, passwordHash);

    // Define a default todo
    const defaultTodo = "Hi :) add your first todo";
    const insertTodo = database.prepare(`
            INSERT INTO todos (user_id, task)
            VALUES (?, ?)
        `);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // Create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });

  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = database.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    console.log(user);
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);

  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;