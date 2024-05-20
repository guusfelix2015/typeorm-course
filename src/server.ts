import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/dataSource";
import { routers } from "./app/routes";
import { httpErrorMiddleware } from "./app/middlewares/ErrorMiddeware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

app.use(httpErrorMiddleware);

AppDataSource.initialize().then(async () => {
  console.log("Database connected");

  app.listen(process.env.PORT || 3333, () => {
    console.log("Server started on http://localhost:3333");
  });
});
