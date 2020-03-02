import { IS_SWIPING, LandingPageActions, UPLOADING_IMAGE } from "./types";


export function setIsSwiping(isSwiping: boolean): LandingPageActions {
  return {
    type: IS_SWIPING,
    isSwiping
  };
}

export function setUploadingImage(uploadingImage: boolean): LandingPageActions {
  return {
    type: UPLOADING_IMAGE,
    uploadingImage
  };
}

