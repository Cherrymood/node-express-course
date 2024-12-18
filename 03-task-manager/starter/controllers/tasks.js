import TaskSchema from "../models/Task.js";

const getAllTasks = async (req, res, next) => {
  try {
    res.send("get all tasks");
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    res.send("delete task");
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    res.send("update task");
  } catch (error) {
    next(error);
  }
};

export { getAllTasks, createTask, getTask, deleteTask, updateTask };
