"use client";

import { useState } from "react";
import React from "react";
import EmptyView from "../empty-view";
import { PanInfo, motion, useDragControls } from "framer-motion";

export default function ScrollExperience() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);

  function dragHandler(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    event.preventDefault();
    if (info.offset.y > 75 && currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
    if (info.offset.y < -7 && currentPageIndex + 1 < viewSequence.length) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  }

  const controls = useDragControls();
  return (
    <div className="w-screen min-w-[100vw] h-dvh max-h-dvh no-scrollbar overflow-hidden">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragSnapToOrigin
        dragElastic={0.3}
        onDragEnd={dragHandler}
        dragControls={controls}
        onDragStart={(e) => e.preventDefault()}
        onDrag={(e) => e.preventDefault()}
      >
        <div
          style={{
            transition: `transform 0.3s`,
            transform: `translateY(-${currentPageIndex * 100}dvh)`,
          }}
          className={`min-w-[100vw] w-screen min-h-screen pointer-events-none no-scrollbar`}
        >
          {viewSequence.map((item, index) => (
            <EmptyView key={item} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
