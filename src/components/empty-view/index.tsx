"use client";

import HorizontalScrollWrap from "../horizontal-scroll-wrap";
import ViewWrapper from "../view-wrapper";
import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";
import { memo, useEffect } from "react";
import useInViewHorizontal from "../horizontal-in-view-hook";
import AudioPlayer from "../audio-player";
import HorizontalFirstPage from "../horizontal-first-page";

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
  useEffect(() => {}, []);
  return (
    <ViewWrapper>
      <div
        className={`min-w-screen relative flex h-full w-fit snap-x snap-mandatory snap-center snap-always items-center overflow-visible overflow-y-hidden justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
      >
        <HorizontalScrollWrap>
          <HorizontalFirstPage
            emoji={index + ""}
            title={""}
            fromColor={""}
            toColor={""}
          />
        </HorizontalScrollWrap>
      </div>
    </ViewWrapper>
  );
}

export default memo(EmptyView);
