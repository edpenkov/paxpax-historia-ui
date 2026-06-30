/** Blur radius on the dark stain layer. */
export const PROMINENCE_DARK_BLUR_PX = 60;

/** Blur applied to the map under the prominence region. */
export const PROMINENCE_BACKDROP_BLUR_PX = 20.5;

/** Padding around logical rect so filter blur is not clipped (not part of visible stain size). */
export const PROMINENCE_BLUR_CLIP_PAD_PX = Math.ceil(PROMINENCE_DARK_BLUR_PX * 1.1);
