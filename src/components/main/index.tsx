"use client";

import { useRef, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";
import useDrag from "../use-drag-hook";
import { useKeyboardNavigation } from "../fullscreen-navigation-hook";

export default function ScrollExperience() {
  const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);
  const {
    dragRef,
    touchMoveHandler,
    touchEndHandler,
    touchStart,
    setTouchStart,
    currentPageIndex,
    setCurrentPageIndex,
    touchStartHandler,
  } = useDrag({
    length: viewSequence.length,
    triggerDistance: 80,
    stickDistance: 35,
    maxDistance: 100,
  });

  useKeyboardNavigation({
    setCurrentPageIndex,
    currentPageIndex,
    length: viewSequence.length,
  });
  return (
    <div className="w-screen min-w-[100vw] h-dvh max-h-dvh no-scrollbar overflow-hidden">
      <div
        className="w-screen min-w-full pointer-events-none no-scrollbar relative"
        onTouchMove={touchMoveHandler}
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
      >
        <div
          id="mainScroll"
          ref={dragRef}
          style={{
            transition: `transform 0s`,
            transform: `translateY(-${currentPageIndex * 100}dvh)`,
          }}
          className={`min-w-[100vw] w-screen min-h-dvh pointer-events-none no-scrollbar relative`}
        >
          {viewSequence.map((item, index) => (
            <EmptyView
              key={item}
              index={index}
              currentIndex={currentPageIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
