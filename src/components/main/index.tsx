"use client";

import { useRef, useState } from "react";
import React from "react";
import EmptyView from "../empty-view";

export default function ScrollExperience() {
	const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);
	const scrollRef = useRef(null);
	return (
		<div
			ref={scrollRef}
			className="w-screen min-w-[100vw] h-dvh no-scrollbar overflow-y-auto overflow-x-hidden snap-always snap-y snap-center snap-mandatory"
		>
			{viewSequence.map((item, index) => (
				<EmptyView scrollRef={scrollRef} key={item} index={index} />
			))}
		</div>
	);
}
