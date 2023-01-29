import * as express from "express";
import { IListProductsResponse, IProducts } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      List: {
        findList: IListProductsResponse;
        findAnItem: number;
      };
    }
  }
}
