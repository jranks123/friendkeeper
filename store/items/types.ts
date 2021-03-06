// Describing the shape of the friend slice of state

export interface Item {
  id: number | null;
  name: string;
  dateOfLastAction: number | null;
  maximumDaysBetweenActions: number | null;
  currentNotificationId: string | null;
  image: string | null;
}

export interface ItemsState {
  items: Item[];
}

// Describing the different ACTION NAMES available

export const ADD_NEW_ITEM = "ADD_NEW_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_ALL_ITEMS = "DELETE_ALL_ITEMS";

interface AddNewItemAction {
  type: typeof ADD_NEW_ITEM;
  item: Item;
}
interface EditItemAction {
  type: typeof EDIT_ITEM;
  item: Item;
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  itemId: number;
}

interface DeleteAllItemsAction {
  type: typeof DELETE_ALL_ITEMS;
}

export type ItemsActions =
  | AddNewItemAction
  | EditItemAction
  | DeleteItemAction
  | DeleteAllItemsAction;
