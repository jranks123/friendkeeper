// Describing the shape of the friend slice of state


export interface LandingPageState {
  isSwiping: boolean
}

// Describing the different ACTION NAMES available
export const IS_SWIPING = "IS_SWIPING";

interface IsSwipingAction {
  type: typeof IS_SWIPING;
  isSwiping: boolean;
}
export type LandingPageActions =
  IsSwipingAction;
