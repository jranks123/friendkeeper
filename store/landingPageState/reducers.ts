import { IS_SWIPING, LandingPageActions, LandingPageState } from "./types";

const initialState: LandingPageState = {
  isSwiping: false
};

export function landingPageReducer(
  state = initialState,
  action: LandingPageActions
): LandingPageState {
  switch (action.type) {
    case IS_SWIPING:
      return {
        ...state,
        isSwiping: action.isSwiping
      };
    default:
      return state;
  }
}
