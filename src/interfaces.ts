export interface IProducts {
  name: string;
  quantity: string;
}
export interface IListProductsRequest {
  listName: string;
  data: Array<IProducts>;
}
export interface IListProductsResponse extends IListProductsRequest {
  id: number;
}

export type TRequiredKeysRequest = "listName" | "data";

export interface IDataEdit {
  name: string;
  quantity: string;
}

export type TRequiredKeysEditRequest = "name" | "quantity";
