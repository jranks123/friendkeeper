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
  item: {
      id: null,
      name: "",
      dateOfLastAction: new Date().getTime(),
      maximumDaysBetweenActions: "",
      currentNotificationId: null
  }
};

export function editItemReducer(
  state = initialState,
  action: EditItemActions
): EditItemState {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        item: {
          ...state.item,
          name: action.name
        }
      };
    case UPDATE_DATE_OF_LAST_ACTION:
      return {
        ...state,
        item: {
          ...state.item,
          dateOfLastAction: action.date
        }
      };
    case UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS:
      return {
        ...state,
        item: {
          ...state.item,
          maximumDaysBetweenActions: action.days
        }
      };
    case POPULATE_EDIT_ITEM_STATE_FROM_ITEM:
      return {
        ...state,
        item: {
          ...state.item,
          id: action.item.id,
          name: action.item.name,
          dateOfLastAction: action.item.dateOfLastAction,
          maximumDaysBetweenActions: action.item.maximumDaysBetweenActions,
          currentNotificationId: action.item.currentNotificationId
        }
      };
    case CLEAR_EDIT_ITEM_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
