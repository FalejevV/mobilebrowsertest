"use client";

import { useRef, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";
import useDrag from "../use-drag-hook";
import { useKeyboardNavigation } from "../fullscreen-navigation-hook";

export default function ScrollExperience() {
	const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);

	return (
		<div className="w-screen min-w-[100vw] h-dvh no-scrollbar overflow-y-auto overflow-x-hidden snap-always snap-y snap-center snap-mandatory">
			{viewSequence.map((item, index) => (
				<EmptyView key={item} index={index} />
			))}
		</div>
	);
}
