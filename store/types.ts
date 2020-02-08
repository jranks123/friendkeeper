import { EditItemState } from "./editItems/types";
import { ItemsState } from "./items/types";
import { LandingPageState } from "./landingPageState/types";

export type CombinedState = {
  itemsState: ItemsState;
  editItemState: EditItemState;
  landingPageState: LandingPageState
};
