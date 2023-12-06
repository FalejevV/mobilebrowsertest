"use client";

import HorizontalScrollWrap from "../horizontal-scroll-wrap";
import ViewWrapper from "../view-wrapper";
import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";

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

export default function EmptyView({ index }: { index: number }) {
  const [fromColor, toColor] = getGradientRandomColors();
  return (
    <ViewWrapper>
      <div
        className={`min-w-screen relative flex h-full w-screen items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
      >
        <HorizontalScrollWrap>
          <HorizontalChildWrap>
            <div className="w-full h-full flex items-center justify-center text-black">
              View: {index}
            </div>
          </HorizontalChildWrap>
        </HorizontalScrollWrap>
      </div>
    </ViewWrapper>
  );
}
