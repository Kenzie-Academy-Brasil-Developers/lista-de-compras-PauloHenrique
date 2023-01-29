import { Request, Response } from "express";
import {
  IDataEdit,
  IListProductsRequest,
  IListProductsResponse,
  IProducts,
  TRequiredKeysEditRequest,
  TRequiredKeysRequest,
} from "./interfaces";
import { listProducts } from "./database";

const ids: Array<number> = [];

const validateData = (payload: any): IListProductsRequest => {
  const keys: Array<String> = Object.keys(payload);
  const payloadIsString: boolean = typeof payload.listName == "string";
  const requiredKeys: Array<TRequiredKeysRequest> = ["listName", "data"];

  const containRequired: Boolean = requiredKeys.every((key: String) => {
    return keys.includes(key);
  });
  const dataBaseIncluds: boolean = listProducts.every(
    (e: IListProductsRequest) => {
      if (e.listName === payload.listName) {
        return false;
      } else {
        return true;
      }
    }
  );

  if (!payloadIsString) {
    throw new Error(
      `Required keys are ${requiredKeys}, 'listName' need to be a String and data an Object`
    );
  }
  if (!containRequired || keys.length > 2 || keys.length < 2) {
    throw new Error(`Required keys are ${requiredKeys}`);
  }
  if (!dataBaseIncluds) {
    throw new Error(`listName already exists`);
  }

  return payload;
};

export const postLisProducts = (
  request: Request,
  response: Response
): Response => {
  try {
    const listData: IListProductsRequest = validateData(request.body);
    const id: number = listProducts.length + 1;
    const idExist = ids.find((el) => el === id);
    if (idExist) {
      return response.status(409).json({
        message: "id exists, try again ",
      });
    }
    const newListData: IListProductsResponse = {
      ...listData,
      id: id,
    };

    ids.push(id);
    listProducts.push(newListData);
    return response.status(201).json(newListData);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      messege: "Internal server error",
    });
  }
};

export const getAllProducstList = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(listProducts);
};

export const getAProductList = (
  request: Request,
  response: Response
): Response => {
  const id: Number = parseInt(request.params.id);
  const newArr = listProducts.find((e: IListProductsResponse) => e.id === id);
  if (newArr === undefined) {
    return response.status(404).json({ message: "List not found" });
  }
  return response.status(200).json(newArr);
};

export const deleteAList = (request: Request, response: Response): Response => {
  const id: Number = parseInt(request.params.id);
  const newArrIndex = listProducts.findIndex(
    (e: IListProductsResponse) => e.id === id
  );
  if (newArrIndex === -1) {
    return response.status(404).json({ message: "List not found" });
  }
  listProducts.splice(newArrIndex, 1);
  return response.status(204).send();
};

export const deleteAnItemFromList = (
  request: Request,
  response: Response
): Response => {
  const findList: IListProductsResponse = request.List.findList;
  const findAnItem: number = request.List.findAnItem;

  findList.data.splice(findAnItem, 1);
  return response.status(200).json();
};

const validateDataEdit = (payload: any): IDataEdit => {
  const keys: Array<String> = Object.keys(payload);
  const requiredKeys: Array<TRequiredKeysEditRequest> = ["name", "quantity"];
  const nameIsString: boolean = typeof payload.name == "string";
  const quantityIsString: boolean = typeof payload.quantity == "string";

  const containRequired: Boolean = requiredKeys.every((key: String) => {
    return keys.includes(key);
  });
  if (!nameIsString || !quantityIsString) {
    throw new Error(
      `Required keys are ${requiredKeys}; Name and Quantity need to be a string `
    );
  }
  if (!containRequired || keys.length > 2 || keys.length < 2) {
    throw new Error(`Required keys are ${requiredKeys}`);
  }
  return payload;
};

export const editAnItemFromList = (
  request: Request,
  response: Response
): Response => {
  try {
    const newItem: IProducts = validateDataEdit(request.body);
    const findList: IListProductsResponse = request.List.findList;
    const findAnItem: number = request.List.findAnItem;

    if (newItem.quantity) findList.data.splice(findAnItem, 1, newItem);
    return response.status(200).json();
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "internal server error",
    });
  }
};
