import express from "express";
import data from "../data.js";
import { addPerson, getPeople } from "./controllers-people.js";

const peopleRouter = express.Router();
const { people } = data;

peopleRouter.get("/", getPeople);

peopleRouter.post("/", addPerson);

export default peopleRouter;
