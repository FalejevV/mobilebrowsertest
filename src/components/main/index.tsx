"use client";

import { useRef, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";
import useDrag from "../use-drag-hook";

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
	} = useDrag({
		length: viewSequence.length,
		triggerDistance: 80,
		stickDistance: 35,
		maxDistance: 100,
	});
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
