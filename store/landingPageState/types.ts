// Describing the shape of the friend slice of state


export interface LandingPageState {
  isSwiping: boolean,
  uploadingImage: boolean,
}

// Describing the different ACTION NAMES available
export const IS_SWIPING = "IS_SWIPING";
export const UPLOADING_IMAGE = "UPLOADING_IMAGE";

interface IsSwipingAction {
  type: typeof IS_SWIPING;
  isSwiping: boolean;
}

interface UploadingImageAction {
  type: typeof UPLOADING_IMAGE;
  uploadingImage: boolean;
}
export type LandingPageActions =
  IsSwipingAction | UploadingImageAction;
