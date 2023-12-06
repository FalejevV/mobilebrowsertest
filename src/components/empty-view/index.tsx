"use client";

import HorizontalScrollWrap from "../horizontal-scroll-wrap";
import ViewWrapper from "../view-wrapper";
import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";
import { memo, useEffect } from "react";
import useInViewHorizontal from "../horizontal-in-view-hook";

const colorNames = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "sky",
  "indigo",
  "violet",
  "purple",
  "rose",
];

function getGradientRandomColors(): [string, string] {
  const fromColor =
    colorNames[Math.floor(Math.random() * colorNames.length)] || "white";
  let toColor =
    colorNames[Math.floor(Math.random() * colorNames.length)] || "white";
  while (toColor === fromColor) {
    toColor =
      colorNames[Math.floor(Math.random() * colorNames.length)] || "white";
  }
  return [fromColor, toColor];
}

function EmptyView({ index }: { index: number }) {
  const [fromColor, toColor] = getGradientRandomColors();

  return (
    <ViewWrapper>
      <div
        className={`min-w-screen relative flex h-full w-screen items-center snap-always snap-mandatory snap-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
      >
        <HorizontalScrollWrap>
          <HorizontalChildWrap>
            <div className="w-full h-full flex items-center justify-center text-black flex-col gap-4">
              View: {index}
              <textarea></textarea>
            </div>
          </HorizontalChildWrap>
        </HorizontalScrollWrap>
      </div>
    </ViewWrapper>
  );
}

export default memo(EmptyView);
