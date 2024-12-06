import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// get all todo
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId
    }
  });

  res.json(todos);
});

// create todo
router.post("/", async (req, res) => {
  const { task } = req.body;

  const todo = await prisma.todo.create({
    data: {
      userId: req.userId,
      task,
    }
  });

  res.json(todo);
});

// Update todo
router.put("/:id", async (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;

    const updateTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: {
        completed: !!completed
      }
    });

    res.json(updateTodo);
});

// delete todo
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    const deleteTodo = prisma.todo.delete({
      where: {
        id: parseInt(id),
        userId,
      }
    });

    res.json(deleteTodo);
});

export default router;
