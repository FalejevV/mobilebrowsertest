"use client";

import { useEffect, useMemo, useState } from "react";
import EmptyView from "../empty-view";

export default function ScrollExperience() {
  const [showScrollExperience, setShowScrollExperience] = useState(false);
  useEffect(() => {
    if (showScrollExperience) {
      document.body.style.overflow = "hidden";
      const element = document.documentElement as HTMLElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      document.body.style.overflow = "auto";
      document.exitFullscreen();
    }
    return () => {
      document.body.style.height = "auto";
    };
  }, [showScrollExperience]);

  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const listMemo = useMemo(() => {
    return (
      <>
        {list.map((index) => (
          <EmptyView index={index} key={index} />
        ))}
      </>
    );
  }, []);

  return (
    <div>
      <button onClick={() => setShowScrollExperience(true)}>SHOW</button>
      {showScrollExperience && (
        <div
          id="mainContainer"
          className="no-scrollbar fixed left-0 top-0  z-[51] h-dvh  w-screen snap-y snap-mandatory  items-center justify-center overflow-scroll bg-white"
        >
          {listMemo}
          <button
            className="absolute left-4 top-4 w-10 h-10 z-[100] bg-red-800"
            onClick={() => setShowScrollExperience(false)}
          >
            exit
          </button>
        </div>
      )}
    </div>
  );
}
