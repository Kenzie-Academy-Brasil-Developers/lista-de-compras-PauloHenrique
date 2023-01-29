import { NextFunction, Request, Response } from "express";
import { listProducts } from "./database";
import { IListProductsResponse } from "./interfaces";

export const middlewareDeleteAndEdit = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: Number = parseInt(request.params.id);
  const itemName: String = request.params.itemName;
  const findList = listProducts.find((e: IListProductsResponse) => e.id === id);

  if (findList === undefined) {
    return response.status(404).json({ message: "List not found" });
  }
  const findAnItem = findList.data.findIndex((e) => {
    return e.name === itemName;
  });
  if (findAnItem === -1) {
    return response.status(404).json({ message: "Product not found" });
  }

  request.List = {
    findList: findList,
    findAnItem: findAnItem,
  };

  return next();
};
