"use client";

import { useInView } from "framer-motion";
import { memo, useEffect, useId, useRef } from "react";

const colorNames = [
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"teal",
	"cyan",
	"sky",
	"indigo",
	"violet",
	"purple",
	"rose",
];

function getGradientRandomColors(): [string, string] {
	const fromColor =
		colorNames[Math.floor(Math.random() * colorNames.length)] || "white";
	let toColor =
		colorNames[Math.floor(Math.random() * colorNames.length)] || "white";
	while (toColor === fromColor) {
		toColor =
			colorNames[Math.floor(Math.random() * colorNames.length)] ||
			"white";
	}
	return [fromColor, toColor];
}

function EmptyView({ index }: { index: number }) {
	const [fromColor, toColor] = getGradientRandomColors();

	function addClass() {
		const container = document.getElementById(`area-container-${index}`);
		if (!container) return;
		container.classList.add(
			"fixed",
			"w-full",
			"h-full",
			"bg-black",
			"flex",
			"left-0",
			"top-0",
			"justify-center"
		);
	}
	function removeClass() {
		const container = document.getElementById(`area-container-${index}`);
		if (!container) return;
		container.classList.remove(
			"fixed",
			"w-full",
			"h-full",
			"bg-black",
			"flex",
			"left-0",
			"top-0",
			"justify-center"
		);
	}

	return (
		<div
			className={`relative transition-all duration-0 pointer-events-auto  w-full h-screen min-h-screen bg-gradient-to-tl flex snap-always snap-mandatory snap-center snap-x overflow-y-hidden overflow-x-auto max-w-dvh no-scrollbar`}
		>
			<div
				className={`w-screen min-w-full overflow-auto snap-mandatory snap-center snap-always h-screen flex items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
				View {index}
			</div>
			<div
				className={`w-screen flex-col min-w-full overflow-auto h-screen snap-center snap-always snap-mandatory flex items-center justify-start p-4 gap-4 bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
				<div className="w-full flex-auto border-2"></div>
				<div
					className="flex flex-col bg-black bg-opacity-40 gap-2"
					id={`area-container-${index}`}
				>
					<textarea
						onFocus={addClass}
						onBlur={removeClass}
						id={`area-${index}`}
					></textarea>
					<button className="w-full p-4 bg-green-300">Button</button>
				</div>
			</div>
			<div
				className={`w-screen flex-col min-w-full overflow-auto h-screen p-4 pb-14 snap-center snap-always snap-mandatory flex items-start justify-start bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
				<div className="w-full h-screen min-h-[200px] flex items-center justify-center">
					blank space
				</div>
				<p className="p-2 text-black">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
					magnam vero sunt alias optio illum impedit, hic inventore
					quos perspiciatis, blanditiis delectus possimus ipsa
					corporis a vel nisi provident ipsam? Lorem ipsum dolor sit
					amet, consectetur adipisicing elit. Voluptas distinctio
					expedita sapiente reprehenderit, hic nobis deserunt atque
					labore aspernatur laboriosam, eum consectetur modi
					exercitationem ut, nisi excepturi nulla sunt sequi! Lorem
					ipsum dolor sit amet consectetur adipisicing elit. Illum
					impedit qui voluptates ratione cum iure doloribus facilis
					totam nesciunt hic voluptas itaque id eum magni fugit earum
					nobis, veniam inventore. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Ab doloribus odio provident
					laudantium iste consectetur quas qui illo, unde accusantium
					illum sit modi ad. Excepturi eos beatae nam magni ipsa.
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Veniam mollitia fuga molestias nulla illum debitis a magnam
					voluptatibus unde, officiis autem asperiores eum eos!
					Eveniet neque excepturi dolore illo molestias. Lorem ipsum,
					dolor sit amet consectetur adipisicing elit. Mollitia
					accusamus nobis fuga adipisci repudiandae aliquid iusto
					nihil itaque distinctio, voluptatum suscipit id voluptatibus
					sint asperiores exercitationem alias ea tempora excepturi?
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Doloribus dolor, quisquam odit rerum doloremque porro illum
					corrupti earum adipisci est dolores quaerat hic rem, placeat
					facilis, nam ex aliquam? Iste. Lorem ipsum dolor sit, amet
					consectetur adipisicing elit. Numquam ipsum explicabo
					ducimus ex impedit error officiis recusandae beatae
					laboriosam quae enim molestias in harum repudiandae,
					voluptatum, aliquid maiores adipisci quibusdam!
				</p>
			</div>
		</div>
	);
}

export default memo(EmptyView);
