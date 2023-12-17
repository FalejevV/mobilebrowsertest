import { useEffect, useRef, useState } from "react";

export default function useDrag({
	length,
	triggerDistance,
	maxDistance,
	stickDistance,
}: {
	length: number;
	triggerDistance: number;
	stickDistance: number;
	maxDistance: number;
}) {
	const dragRef = useRef(null);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(0);
	const [canScrollDirection, setCanScrollDirection] = useState<
		"all" | "up" | "down" | null
	>(null);
	// disable mobile browser (chrome) "pull down to refresh" feature
	useEffect(() => {
		document.body.style.overscrollBehavior = "none";

		return () => {
			document.body.style.overscrollBehavior = "auto";
		};
	}, []);

	function touchStartHandler(e: React.TouchEvent<HTMLDivElement>) {
		setTouchStart(e.touches[0].screenY);
		let target = e.target as HTMLElement;
		if (target.tagName === "TEXTAREA" && dragRef.current) {
			(dragRef.current as HTMLDivElement).style.transition =
				"transform 0.0s";
			setTimeout(() => {
				if (dragRef.current) {
					(dragRef.current as HTMLDivElement).style.transition =
						"transform 0.3s";
				}
			}, 300);
		}
		let scrollBarFound = false;
		while (target.parentElement) {
			target = target.parentElement as HTMLElement;
			if (target.id === "mainScroll") break;
			const hasVerticalScrollbar =
				target.scrollHeight > target.clientHeight;
			if (hasVerticalScrollbar) {
				scrollBarFound = true;
				break;
			}
		}

		if (!scrollBarFound) {
			setCanScrollDirection("all");
			return;
		}
		const isScrollbarAtTop = target.scrollTop === 0;
		if (isScrollbarAtTop) {
			setCanScrollDirection("up");
			return;
		}

		const isScrollbarAtBottom =
			target.scrollTop + target.clientHeight === target.scrollHeight;
		if (isScrollbarAtBottom) {
			setCanScrollDirection("down");
			return;
		}
		setCanScrollDirection(null);
	}

	function touchMoveHandler(e: React.TouchEvent<HTMLDivElement>) {
		if (dragRef?.current) {
			let swipeDifference = e.touches[0].screenY - touchStart;
			if (!canScrollDirection) return;
			if (canScrollDirection !== "all") {
				if (canScrollDirection !== "up" && swipeDifference > 0) {
					swipeDifference = 0;
					return;
				} else if (
					canScrollDirection !== "down" &&
					swipeDifference < 0
				) {
					swipeDifference = 0;
					return;
				}
			}
			// do not move swipeable element further than max drag distance
			if (swipeDifference > maxDistance) {
				swipeDifference = maxDistance;
			} else if (swipeDifference < maxDistance * -1) {
				swipeDifference = maxDistance * -1;
			}

			// stick draggable element until minimal drag distance reached
			if (swipeDifference > 0 && swipeDifference < stickDistance) {
				swipeDifference = 0;
			} else if (
				swipeDifference < 0 &&
				swipeDifference > stickDistance * -1
			) {
				swipeDifference = 0;
			}

			(
				dragRef.current as HTMLDivElement
			).style.transform = `translateY(calc(${
				currentPageIndex * 100 * -1
			}dvh + ${swipeDifference * -1}px * -1))`;
			(dragRef.current as HTMLDivElement).style.transition =
				"transform 0.1s";
		}
	}

	function touchEndHandler(e: React.TouchEvent<HTMLDivElement>) {
		let swipeDifference = e.changedTouches[0].screenY - touchStart;
		if (
			swipeDifference >= triggerDistance &&
			(canScrollDirection === "all" || canScrollDirection === "up")
		) {
			setCurrentPageIndex((prev) => {
				if (prev - 1 < 0) {
					return prev;
				} else {
					return prev - 1;
				}
			});
		} else if (
			swipeDifference <= triggerDistance * -1 &&
			(canScrollDirection === "all" || canScrollDirection === "down")
		) {
			setCurrentPageIndex((prev) => {
				if (prev + 1 > length - 1) {
					return prev;
				} else {
					return prev + 1;
				}
			});
		}
		if (dragRef?.current) {
			(dragRef.current as HTMLDivElement).style.transition =
				"transform 0.3s";
			(dragRef.current as HTMLDivElement).style.transform = `translateY(${
				currentPageIndex * 100 * -1
			}dvh)`;
		}
	}
	return {
		dragRef,
		touchMoveHandler,
		touchEndHandler,
		touchStart,
		currentPageIndex,
		setCurrentPageIndex,
		setTouchStart,
		touchStartHandler,
	};
}
