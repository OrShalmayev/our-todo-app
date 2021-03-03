import { Router } from "express";

const router = Router();

import Todo from "../../models/Todo";

// @route GET /api/todos
// get all todos
// access Public

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ date: 1 });
    if (!todos){
      res.status(200).send([])
    }

    res.status(200).json(
      todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route GET /api/todos/:id
// get single todo
// access Public

router.get("/:id", async (req, res) => {
  
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) throw Error("Could not find todo");

    res.status(200).json(
      todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route POST /api/todos
// make new todo
// access public

router.post("/", async (req, res) => {
  try {
    let newTodo = new Todo({
      content: req.body.content,
    });
    let registeredTodo = await newTodo.save();
    if (!registeredTodo) throw Error("Could not save todo");

    res.status(200).json(
      registeredTodo,
    );
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
});

// @route POST /api/todos/update/:id
// update todo content
// access public

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
  
    let found = await Todo.findById(id);
    if (!found) throw Error("Could find update todo");

    found.content = req.body.content;
    found.complete = req.body.complete;

    let saved = await found.save();
    if (!saved) throw Error("Could save updated todo");

    res.status(200).json(
      saved,
    );
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
});

// @route DELETE /api/todos
// delete a todo
// access Public

router.delete("/:id", async (req, res) => {
  try {
    let itemToDelete = await Todo.findById(req.params.id);
    if (!itemToDelete) throw Error("Could not find todo to delete");

    let deleted = await itemToDelete.remove();
    if (!deleted) throw Error("Could not delete todo");

    res.status(200).json(
      deleted
    );
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
});

export default router;
