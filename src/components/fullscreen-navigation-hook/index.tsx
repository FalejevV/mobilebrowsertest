import { useEffect } from "react";

export function useKeyboardNavigation({
  setCurrentPageIndex,
  currentPageIndex,
  length,
}: {
  setCurrentPageIndex: any;
  currentPageIndex: number;
  length: number;
}) {
  useEffect(() => {
    const handleArrowKeys: EventListener = (event) => {
      const { key } = event as KeyboardEvent;
      if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();
        if (key === "ArrowUp" && currentPageIndex + 1 >= 0) {
          setCurrentPageIndex((prev: number) => prev - 1);
        } else if (key === "ArrowDown" && currentPageIndex + 1 < length) {
          setCurrentPageIndex((prev: number) => prev + 1);
        }
      }
    };
    document.addEventListener("keydown", handleArrowKeys);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [currentPageIndex, length]);
}
