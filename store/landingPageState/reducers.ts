import { IS_SWIPING, LandingPageActions, LandingPageState, UPLOADING_IMAGE } from "./types";

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
    case UPLOADING_IMAGE:
      return {
        ...state,
        uploadingImage: action.uploadingImage
      };
    default:
      return state;
  }
}
