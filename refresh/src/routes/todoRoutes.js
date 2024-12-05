import express from "express";
import database from "../db.js";

const router = express.Router();

// get all todo
router.get("/", (req, res) => {
  const getTodos = database.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

// create todo
router.post("/", (req, res) => {
  const { task } = req.body;

  const insertTodo = database.prepare(`
    INSERT INTO todos (user_id, task) VALUES (?, ?)
  `);

  const result = insertTodo.run(req.userId, task);

  res.json({id: result.lastInsertRowid, task, completed: 0});
});

// Update todo
router.put("/:id", (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;

    const updateTodo = database.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);

    updateTodo.run(completed, id);
    res.json({message: "To do completed"});
});

// delete todo
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    const deleteTodo = database.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);


    deleteTodo.run(id, userId);

    res.json({message: "Todo deleted :("});
});

export default router;
