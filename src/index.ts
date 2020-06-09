import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { app } from "../config";
app.listen(app.get("port"), () => {
  console.log("corriendo express");
});
