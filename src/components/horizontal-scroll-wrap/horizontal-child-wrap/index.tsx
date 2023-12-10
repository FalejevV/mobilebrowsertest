import { ReactNode } from "react";

export default function HorizontalChildWrap({
  children,
  style,
}: {
  children: ReactNode;
  style?: any;
}) {
  return (
    <div className="h-dvh w-screen min-w-screen overflow-hidden" style={style}>
      {children}
    </div>
  );
}
