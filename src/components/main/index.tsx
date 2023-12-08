"use client";

import { useEffect, useMemo, useState } from "react";
import EmptyView from "../empty-view";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export default function ScrollExperience() {
  const [showScrollExperience, setShowScrollExperience] = useState(false);
  useEffect(() => {
    if (showScrollExperience) {
      document.body.style.overflow = "hidden";
      const element = document.documentElement as any;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      document.body.style.overflow = "auto";
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          //@ts-ignore
        } else if (document.webkitExitFullscreen) {
          //@ts-ignore
          document.webkitExitFullscreen();
          //@ts-ignore
        } else if (document.msExitFullscreen) {
          //@ts-ignore
          document.msExitFullscreen();
        }
      }
    }
    return () => {
      document.body.style.height = "auto";
    };
  }, [showScrollExperience]);

  const [list, setList] = useState([1]);

  function loadMore() {
    setList((prev) => [...prev, 9, 10, 11, 12, 13]);
    setHasNextPage(true);
  }
  const parentRef = React.useRef(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? list.length + 1 : list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }

    if (lastItem.index >= list.length - 1) {
      loadMore();
    }
  }, [list.length, rowVirtualizer, hasNextPage, showScrollExperience]);
  return (
    <div>
      <button onClick={() => setShowScrollExperience(true)}>SHOW</button>
      {showScrollExperience && (
        <div
          ref={parentRef}
          className="List no-scrollbar fixed left-0 top-0"
          style={{
            height: `100dvh`,
            width: `100dvw`,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              height: `100dvh`,
              width: "100dvw",
              position: "relative",
            }}
            className="no-scrollbar fixed left-0 top-0  z-[51] h-screen  w-screen snap-y snap-mandatory  items-center justify-center overflow-scroll overflow-x-hidden bg-white"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > list.length - 1;
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100dvw",
                    height: `100dvh`,
                    transform: `translateY(${virtualRow.start}dvh)`,
                  }}
                >
                  {isLoaderRow ? (
                    true ? (
                      "Loading more..."
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    <EmptyView index={virtualRow.index} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
