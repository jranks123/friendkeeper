// Describing the shape of the friend slice of state

import { Item } from "../items/types";

export interface EditItemState {
  name: string;
  dateOfLastAction: Date | null;
  maximumDaysBetweenActions: string;
  id: string | null;
}

// Describing the different ACTION NAMES available

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_DATE_OF_LAST_ACTION = "UPDATE_DATE_OF_LAST_ACTION";
export const UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS =
  "UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS";
export const CLEAR_EDIT_ITEM_STATE = "CLEAR_EDIT_ITEM_STATE";
export const POPULATE_EDIT_ITEM_STATE_FROM_ITEM =
  "POPULATE_EDIT_ITEM_STATE_FROM_ITEM";

interface UpdateNameAction {
  type: typeof UPDATE_NAME;
  name: string;
}

interface UpdateDateOfLastAction {
  type: typeof UPDATE_DATE_OF_LAST_ACTION;
  date: Date;
}

interface UpdateMaximumDaysBetweenAction {
  type: typeof UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS;
  days: string;
}

interface ClearEditItemAction {
  type: typeof CLEAR_EDIT_ITEM_STATE;
}

interface PopulateEditItemStateFromItemAction {
  type: typeof POPULATE_EDIT_ITEM_STATE_FROM_ITEM;
  item: Item;
}

export type EditItemActions =
  | UpdateNameAction
  | UpdateDateOfLastAction
  | UpdateMaximumDaysBetweenAction
  | ClearEditItemAction
  | PopulateEditItemStateFromItemAction;