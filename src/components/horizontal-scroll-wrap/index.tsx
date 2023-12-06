"use client";

import { MutableRefObject, ReactNode } from "react";
import ViewWrapper from "../view-wrapper";

export default function HorizontalScrollWrap({
  children,
  inViewRef,
}: {
  children: ReactNode;
  inViewRef: MutableRefObject<null>;
}) {
  return (
    <ViewWrapper>
      <div
        ref={inViewRef}
        className="pointer-events-none z-[100] absolute left-1/2 top-1/2 h-10 w-10 bg-red-300"
      />
      <div
        className={`no-scrollbar relative flex h-dvh w-screen gap-5 overflow-y-visible overflow-x-scroll`}
      >
        {children}
      </div>
    </ViewWrapper>
  );
}
