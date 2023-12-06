"use client";

import { ReactNode } from "react";
import ViewWrapper from "../view-wrapper";

export default function HorizontalScrollWrap({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ViewWrapper>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1" />
      <div
        className={`no-scrollbar relative flex h-dvh w-screen snap-x snap-mandatory snap-always gap-5 overflow-y-visible overflow-x-scroll`}
      >
        {children}
      </div>
    </ViewWrapper>
  );
}
