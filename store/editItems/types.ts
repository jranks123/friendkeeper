// Describing the shape of the friend slice of state

export interface EditItemState {
    name: string,
    dateOfLastAction: Date | null;
    maximumDaysBetweenActions: string;
}

// Describing the different ACTION NAMES available

export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_DATE_OF_LAST_ACTION = 'UPDATE_DATE_OF_LAST_ACTION';
export const UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS = 'UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS';


interface UpdateNameAction {
    type: typeof UPDATE_NAME
    name: string
}

interface UpdateDateOfLastAction {
    type: typeof UPDATE_DATE_OF_LAST_ACTION
    date: Date
}

interface UpdateMaximumDaysBetweenActions {
    type: typeof UPDATE_MAXIMUM_DAYS_BETWEEN_ACTIONS
    days: string
}




export type EditItemActions = UpdateNameAction | UpdateDateOfLastAction | UpdateMaximumDaysBetweenActions
