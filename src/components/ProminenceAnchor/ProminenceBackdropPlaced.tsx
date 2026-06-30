import {
  PROMINENCE_BACKDROP_BLUR_PX,
  PROMINENCE_BLUR_CLIP_PAD_PX,
  PROMINENCE_DARK_BLUR_PX,
} from "@/components/ProminenceAnchor/constants";

export type ProminenceBackdropRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ProminenceBackdropPlacedProps = {
  rect: ProminenceBackdropRect;
};

/** Invisible padding for blur clip only — does not scale the stain footprint. */
function getCanvasRect(rect: ProminenceBackdropRect) {
  const pad = PROMINENCE_BLUR_CLIP_PAD_PX;
  const width = rect.width + pad * 2;
  const height = rect.height + pad * 2;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return {
    top: centerY - height / 2,
    left: centerX - width / 2,
    width,
    height,
  };
}

/** Stain ellipse matches logical rect (expand + anchor); blur is applied on top. */
function buildStainGradients(rect: ProminenceBackdropRect) {
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;

  const fill = `radial-gradient(
    ellipse ${halfW}px ${halfH}px at 50% 50%,
    rgba(0, 0, 0, 0.38) 0%,
    rgba(0, 0, 0, 0.22) 38%,
    rgba(0, 0, 0, 0.06) 58%,
    rgba(0, 0, 0, 0) 72%
  )`;

  const mask = `radial-gradient(
    ellipse ${halfW}px ${halfH}px at 50% 50%,
    black 0%,
    black 42%,
    transparent 72%
  )`;

  return { fill, mask };
}

export function ProminenceBackdropPlaced({ rect }: ProminenceBackdropPlacedProps) {
  const canvas = getCanvasRect(rect);
  const { fill, mask } = buildStainGradients(rect);
  const backdropBlur = `blur(${PROMINENCE_BACKDROP_BLUR_PX}px)`;

  const boxStyle = {
    top: canvas.top,
    left: canvas.left,
    width: canvas.width,
    height: canvas.height,
  };

  return (
    <>
      <div
        className="pointer-events-none absolute overflow-visible [contain:layout_paint_style]"
        style={{
          ...boxStyle,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      <div
        className="pointer-events-none absolute overflow-visible [contain:layout_paint_style]"
        style={{
          ...boxStyle,
          background: fill,
          filter: `blur(${PROMINENCE_DARK_BLUR_PX}px)`,
        }}
      />
    </>
  );
}
