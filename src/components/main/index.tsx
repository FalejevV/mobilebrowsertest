"use client";

import { useEffect, useMemo, useState } from "react";
import EmptyView from "../empty-view";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import ViewWrapper from "../view-wrapper";
import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";

export default function ScrollExperience() {
  const [showScrollExperience, setShowScrollExperience] = useState(false);
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);
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

  useEffect(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
    window.addEventListener("resize", () => {
      setVh(window.innerHeight);
      setVw(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setVh(window.innerHeight);
        setVw(window.innerWidth);
      });
    };
  }, []);

  const [list, setList] = useState([1, 1, 2, 3, 4, 5, 6, 7, 8]);

  function loadMore() {
    setList((prev) => [...prev, 9, 10, 11, 12, 13]);
  }

  return (
    <div>
      <button onClick={() => setShowScrollExperience(true)}>SHOW</button>
      {showScrollExperience && (
        <div
          id="mainContainer"
          className="no-scrollbar fixed left-0 top-0  z-[51] h-screen  w-screen snap-y snap-mandatory  items-center justify-center overflow-scroll overflow-x-hidden bg-white"
        >
          <InfiniteLoader
            isItemLoaded={(index) => !list[index]}
            itemCount={list.length + 1}
            loadMoreItems={loadMore}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                height={vh}
                width={vw}
                itemCount={3}
                itemSize={vh}
                ref={ref}
                className="snap-center snap-mandatory snap-always snap-y no-scrollbar overflow-hidden w-screen"
              >
                {({ index, style }) => (
                  <HorizontalChildWrap key={index} style={style}>
                    <ViewWrapper>
                      {list[index] ? (
                        <EmptyView index={index} />
                      ) : (
                        <EmptyView index={-1} />
                      )}
                    </ViewWrapper>
                  </HorizontalChildWrap>
                )}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        </div>
      )}
    </div>
  );
}
