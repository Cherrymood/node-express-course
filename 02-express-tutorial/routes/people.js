import express from "express";
import { addPerson, getPeople } from "../controllers/people.js";

const peopleRouter = express.Router();

peopleRouter.get("/", getPeople);

peopleRouter.post("/", addPerson);

export default peopleRouter;
