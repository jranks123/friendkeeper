import {
  ADD_NEW_ITEM,
  DELETE_ALL_ITEMS,
  DELETE_ITEM,
  EDIT_ITEM,
  Item,
  ItemsActions,
  REFRESH_STATE
} from "./types";


export function editItem(item: Item): ItemsActions {
  return {
    type: EDIT_ITEM,
    item
  };
}
export function addNewItem(item: Item): ItemsActions {
  return {
    type: ADD_NEW_ITEM,
    item
  };
}
export function deleteItem(itemId: number): ItemsActions {
  return {
    type: DELETE_ITEM,
    itemId
  };
}
export function deleteAllItems(): ItemsActions {
  return { type: DELETE_ALL_ITEMS };
}

export function refreshState(): ItemsActions {
  return { type: REFRESH_STATE };
}
