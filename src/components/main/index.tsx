"use client";

import { useState } from "react";
import React from "react";
import EmptyView from "../empty-view";

export default function ScrollExperience() {
	const [viewSequence, setViewSequence] = useState([1, 2, 3, 4, 5, 6, 7]);

	return (
		<div className="fixed w-screen min-w-[100vw] h-dvh no-scrollbar overflow-y-auto overflow-x-hidden snap-always snap-y snap-center snap-mandatory">
			{viewSequence.map((item, index) => (
				<EmptyView key={item} index={index} />
			))}
		</div>
	);
}
