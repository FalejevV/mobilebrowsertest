import { ReactNode } from "react";

export default function HorizontalChildWrap({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="h-dvh w-screen min-w-full">{children}</div>;
}
