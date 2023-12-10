import { forwardRef, ForwardedRef, LegacyRef } from "react";

export default forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    title?: string;
    subtitle?: string;
    wrapperTextColor?: string;
    id?: string;
  }>
>(function ViewWrapper(props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      id={props.id}
      className="relative flex h-screen max-h-screen min-h-screen w-screen flex-col items-center justify-center px-4 overflow-hidden no-scrollbar"
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
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        className={`absolute left-1/2 top-1/2 h-px w-screen -translate-x-1/2 snap-center snap-always bg-transparent`}
      />
      {props.children}
    </div>
  );
});
