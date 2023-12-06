import { useInView } from "framer-motion";
import { useRef, useEffect, MutableRefObject } from "react";

export default function useInViewHorizontal(): {
  inViewRef: MutableRefObject<null>;
  inView: boolean;
  horizontalRef: MutableRefObject<null>;
  preloadInView: boolean;
} {
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef);
  const preloadInView = useInView(inViewRef, {
    margin: "-100px 0px 0px 0px",
    once: true,
    amount: 0,
  });

  const horizontalRef = useRef(null);
  useEffect(() => {
    if (!inView && horizontalRef.current) {
      const element = horizontalRef.current as HTMLDivElement;
      element.scroll({
        left: 0,
        behavior: "instant",
      });
    }
  }, [inView]);
  return { inViewRef, inView, horizontalRef, preloadInView };
}
