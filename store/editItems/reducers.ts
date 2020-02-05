import {
  CLEAR_EDIT_ITEM_STATE,
  EditItemActions,
  EditItemState,
  POPULATE_EDIT_ITEM_STATE_FROM_ITEM,
  UPDATE_DATE_OF_LAST_ACTION,
  UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
  UPDATE_NAME
} from "./types";

const initialState: EditItemState = {
  id: null,
  name: "",
  dateOfLastAction: new Date(),
  maximumDaysBetweenActions: ""
};

export function editItemReducer(
  state = initialState,
  action: EditItemActions
): EditItemState {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };
    case UPDATE_DATE_OF_LAST_ACTION:
      return {
        ...state,
        dateOfLastAction: action.date
      };
    case UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS:
      return {
        ...state,
        maximumDaysBetweenActions: action.days
      };
    case POPULATE_EDIT_ITEM_STATE_FROM_ITEM:
      return {
        ...state,
        id: action.item.id,
        name: action.item.name,
        dateOfLastAction: new Date(action.item.dateOfLastAction),
        maximumDaysBetweenActions: action.item.maximumDaysBetweenActions
      };
    case CLEAR_EDIT_ITEM_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
