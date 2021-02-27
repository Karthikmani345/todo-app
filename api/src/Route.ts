import { Router } from "express";
import BucketController from "./controller/BucketController";
import TodoController from "./controller/TodoController";
import UserController from "./controller/UserController";

export const route = Router();
const bucketController = new BucketController();
const todoController = new TodoController();
const userController = new UserController();

route.get("/bucket", bucketController.getAll);
route.get("/bucket/:id", bucketController.get);
route.post("/bucket", bucketController.create);
route.post("/bucket/:id", bucketController.update);

route.get("/todo", todoController.getAll);
route.get("/todo/:id", todoController.get);
route.post("/todo", todoController.create);
route.post("/todo/:id", todoController.update);
route.post("/todo/delete/:id", todoController.delete);

route.post("/login", userController.login);
route.post("/register", userController.register);
