"use client";

import { useRef, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";

export default function ScrollExperience() {
	const dragRef = useRef(null);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);
	const [touchStart, setTouchStart] = useState(0);
	function touchMoveHandler(e: React.TouchEvent<HTMLDivElement>) {
		if (dragRef?.current) {
			let swipeDifference = e.touches[0].screenY - touchStart;
			if (swipeDifference > 100) {
				swipeDifference = 100;
			} else if (swipeDifference < -100) {
				swipeDifference = -100;
			}

			(
				dragRef.current as HTMLDivElement
			).style.transform = `translateY(calc(${
				currentPageIndex * 100 * -1
			}dvh + ${swipeDifference * -1}px * -1))`;
			(dragRef.current as HTMLDivElement).style.transition =
				"transform 0s";
		}
	}
	console.log(currentPageIndex);
	function touchEndHandler(e: React.TouchEvent<HTMLDivElement>) {
		let swipeDifference = e.changedTouches[0].screenY - touchStart;
		if (swipeDifference > 80) {
			setCurrentPageIndex((prev) => {
				if (prev - 1 < 0) {
					return prev;
				} else {
					return prev - 1;
				}
			});
		} else if (swipeDifference < -80) {
			setCurrentPageIndex((prev) => {
				if (prev + 1 > viewSequence.length - 1) {
					return prev;
				} else {
					return prev + 1;
				}
			});
		}
		if (dragRef?.current) {
			(dragRef.current as HTMLDivElement).style.transition = "all 0.3s";
			(dragRef.current as HTMLDivElement).style.transform = `translateY(${
				currentPageIndex * 100 * -1
			}dvh)`;
		}
	}
	return (
		<div className="w-screen min-w-[100vw] h-dvh max-h-dvh no-scrollbar overflow-hidden">
			<div
				className="w-screen min-w-full pointer-events-none no-scrollbar relative"
				onTouchMove={touchMoveHandler}
				onTouchStart={(e) => setTouchStart(e.touches[0].screenY)}
				onTouchEnd={touchEndHandler}
			>
				<div
					ref={dragRef}
					style={{
						transition: `transform 0.3s`,
						transform: `translateY(-${currentPageIndex * 100}dvh)`,
					}}
					className={`min-w-[100vw] w-screen min-h-dvh pointer-events-none no-scrollbar relative`}
				>
					{viewSequence.map((item, index) => (
						<EmptyView key={item} index={index} />
					))}
				</div>
			</div>
		</div>
	);
}
