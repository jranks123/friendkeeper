import {
  IS_SWIPING, LandingPageActions
} from "./types";


export function setIsSwiping(isSwiping: boolean): LandingPageActions {
  return {
    type: IS_SWIPING,
    isSwiping
  };
}
