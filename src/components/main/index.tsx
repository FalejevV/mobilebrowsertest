"use client";

import { useMemo, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";
import { PanInfo, motion } from "framer-motion";

export default function ScrollExperience() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [dragging, setDragging] = useState(false);

  function dragHandler(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y > 75 && currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
    if (info.offset.y < -7 && currentPageIndex + 1 < viewSequence.length) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  }

  console.log(currentPageIndex);
  return (
    <div className="w-screen h-dvh no-scrollbar overflow-hidden">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragSnapToOrigin
        dragElastic={0.3}
        onDragEnd={dragHandler}
      >
        <div
          style={{
            transition: `transform 0.3s`,
            transform: `translateY(-${currentPageIndex * 100}vh)`,
          }}
          className="flex flex-col items-start justify-start"
        >
          {viewSequence.map((item, index) => (
            <EmptyView key={item} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
