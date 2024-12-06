import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = bcrypt.hashSync(password);

  // Insert the new user into the database
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash
      }
    });

    // Define a default todo
    const defaultTodo = "Hi :) add your first todo";
    // const insertTodo = database.prepare(`
    //         INSERT INTO todos (user_id, task)
    //         VALUES (?, ?)
    //     `);
    // insertTodo.run(result.lastInsertRowid, defaultTodo);
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id
      }
    })

    // Create a token
    const token = jwt.sign(
      { id: user.id},
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });

  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // const getUser = database.prepare("SELECT * FROM users WHERE username = ?");
    // const user = getUser.get(username);
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

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
