import {
    EditItemActions,
    EditItemState,
    UPDATE_DATE_OF_LAST_ACTION,
    UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS,
    UPDATE_NAME
} from "./types";

const initialState: EditItemState = {
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
        default:
            return state;
    }
}

