import { Router } from "express";
import { textController } from "./controller.js";

const routes = Router();

routes.get("/health", (req, res) => {
  res.send({ status: "Text API route is working!!" });
});

routes.post("/message", textController.writeMessage);

export default routes;
