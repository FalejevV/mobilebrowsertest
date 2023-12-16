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
    <div
      className={`relative left-0 top-[${
        index * 100
      }dvh] w-full h-screen min-h-screen bg-gradient-to-tl from snap-always snap-mandatory snap-x flex items-center justify- overflow-x-auto overflow-y-hidden no-scrollbar`}
    >
      <div
        className={`w-screen min-w-full snap-mandatory snap-center snap-always h-screen overflow-auto flex items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
      >
        View {index}
      </div>
      <div
        className={`w-screen min-w-full h-screen overflow-auto snap-center snap-always snap-mandatory flex items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
      >
        <textarea></textarea>
      </div>
    </div>
  );
}

export default memo(EmptyView);
