import { EditItemState } from "./editItems/types";
import { ItemsState } from "./items/types";

export type CombinedState = {
  itemsState: ItemsState;
  editItemState: EditItemState;
};
