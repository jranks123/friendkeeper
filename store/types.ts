import { ItemsState } from "./items/types";
import {EditItemState} from "./editItems/types";

export type CombinedState =  {itemsState: ItemsState, editItemState: EditItemState  }