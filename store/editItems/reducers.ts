import {
  CLEAR_EDIT_ITEM_STATE,
  EditItemActions,
  EditItemState,
  POPULATE_EDIT_ITEM_STATE_FROM_ITEM,
  UPDATE_CURRENT_NOTIFICATION_ID,
  UPDATE_DATE_OF_LAST_ACTION,
  UPDATE_IMAGE,
  UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
  UPDATE_NAME
} from "./types";

const initialState: EditItemState = {
  item: {
      id: null,
      name: "",
      dateOfLastAction: new Date().getTime(),
      maximumDaysBetweenActions: 30,
      currentNotificationId: null,
      image: "",
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
    case UPDATE_IMAGE:
      return {
        ...state,
        item: {
          ...state.item,
          image: action.image
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

    case UPDATE_CURRENT_NOTIFICATION_ID:
      return {
        ...state,
        item: {
          ...state.item,
          currentNotificationId: action.id
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
          currentNotificationId: action.item.currentNotificationId,
          image: action.item.image,
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
