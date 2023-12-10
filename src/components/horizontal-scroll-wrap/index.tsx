"use client";

import { MutableRefObject, ReactNode } from "react";
import ViewWrapper from "../view-wrapper";

export default function HorizontalScrollWrap({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ViewWrapper>
      <div
        className={`no-scrollbar relative flex h-dvh w-screen gap-5 overflow-y-visible overflow-x-scroll`}
      >
        {children}
      </div>
    </ViewWrapper>
  );
}
