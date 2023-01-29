import express, { Application } from "express";
import {
  deleteAList,
  deleteAnItemFromList,
  editAnItemFromList,
  getAllProducstList,
  getAProductList,
  postLisProducts,
} from "./logic";
import { middlewareDeleteAndEdit } from "./middleware";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", postLisProducts);
app.get("/purchaseList", getAllProducstList);
app.get("/purchaseList/:id", getAProductList);
app.delete("/purchaseList/:id", deleteAList);
app.delete(
  "/purchaseList/:id/:itemName",
  middlewareDeleteAndEdit,
  deleteAnItemFromList
);
app.patch(
  "/purchaseList/:id/:itemName",
  middlewareDeleteAndEdit,
  editAnItemFromList
);

const PORT: number = 3000;
const runningMsg: string = `Hello, Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
