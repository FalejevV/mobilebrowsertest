"use client";

import { useEffect, useMemo, useState } from "react";
import { PanInfo, motion, useAnimation } from "framer-motion";
import EmptyView from "../empty-view";

export default function ScrollExperience() {
  const [showScrollExperience, setShowScrollExperience] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (showScrollExperience) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    controls.start({ y: -currentIndex * 100 + "dvh" });
  }, [showScrollExperience, currentIndex, controls]);

  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handleDragEnd = (_, info: PanInfo) => {
    const { offset } = info;
    if (offset.y > 100 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (offset.y < -100 && currentIndex < list.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const listMemo = useMemo(() => {
    return (
      <>
        {list.map((index) => (
          <motion.div
            key={index}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmptyView index={index} key={index} />
          </motion.div>
        ))}
      </>
    );
  }, []);

  return (
    <div>
      <button onClick={() => setShowScrollExperience(true)}>SHOW</button>
      {showScrollExperience && (
        <div className="no-scrollbar fixed left-0 top-0 z-[51] h-dvh flex-col w-screen items-start justify-start flex overflow-hidden bg-white">
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
            animate={controls}
            drag="y"
            dragConstraints={{ top: 10, bottom: 10 }}
            onDragEnd={handleDragEnd}
          >
            {listMemo}
          </motion.div>
        </div>
      )}
    </div>
  );
}
