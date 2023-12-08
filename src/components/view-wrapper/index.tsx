"use client";

import { forwardRef, ForwardedRef, LegacyRef } from "react";

export default forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    title?: string;
    subtitle?: string;
    wrapperTextColor?: string;
    style?: React.CSSProperties;
  }>
>(function ViewWrapper(props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      style={props.style}
      ref={ref as LegacyRef<HTMLDivElement>}
      className="relative mx-auto my-auto flex h-dvh max-h-dvh min-h-dvh w-screen max-w-4xl flex-col items-center justify-center px-4"
    >
      {!!props.title && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center text-3xl font-bold text-teal-700">
          {props.title}
        </div>
      )}
      {!!props.subtitle && (
        <div
          className={`absolute left-1/2 top-14 w-screen -translate-x-1/2 text-center text-sm font-bold ${
            props.wrapperTextColor
              ? `text-${props.wrapperTextColor}-700`
              : "text-white"
          }`}
        >
          {props.subtitle}
        </div>
      )}
      {props.children}
    </div>
  );
});
