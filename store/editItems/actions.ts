import {
  CLEAR_EDIT_ITEM_STATE,
  EditItemActions,
  POPULATE_EDIT_ITEM_STATE_FROM_ITEM,
  UPDATE_DATE_OF_LAST_ACTION,
  UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
  UPDATE_NAME
} from "./types";
import { Item } from "../items/types";

export function updateName(name: string): EditItemActions {
  return {
    type: UPDATE_NAME,
    name
  };
}
export function updateDateOfLastAction(date: Date): EditItemActions {
  return {
    type: UPDATE_DATE_OF_LAST_ACTION,
    date
  };
}
export function updateMaximumDaysBetweenActions(days: string): EditItemActions {
  return {
    type: UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
    days
  };
}

export function clearEditItemStateAction(): EditItemActions {
  return {
    type: CLEAR_EDIT_ITEM_STATE
  };
}

export function populateEditItemStateFromFromItem(item: Item): EditItemActions {
  return {
    type: POPULATE_EDIT_ITEM_STATE_FROM_ITEM,
    item
  };
}
