"use client";

import { useEffect, useState } from "react";
import EmptyView from "../empty-view";
export default function ScrollExperience() {
  const [showScrollExperience, setShowScrollExperience] = useState(false);

  useEffect(() => {
    if (showScrollExperience) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showScrollExperience]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    return () => {
      window.removeEventListener("resize", () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    };
  }, []);

  return (
    <div>
      <button onClick={() => setShowScrollExperience(true)}>SHOW</button>
      {showScrollExperience && (
        <div className="no-scrollbar fixed left-0 top-0 transition-all duration-100 z-[51] h-dvh flex-col w-screen snap-y snap-mandatory  items-start justify-start flex overflow-scroll bg-white">
          <EmptyView index={0} />
          <EmptyView index={1} />
          <EmptyView index={2} />
          <EmptyView index={3} />
          <EmptyView index={4} />
          <EmptyView index={5} />
          <EmptyView index={6} />
          <EmptyView index={7} />
          <EmptyView index={8} />
        </div>
      )}
    </div>
  );
}
