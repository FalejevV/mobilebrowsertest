"use client";

import HorizontalScrollWrap from "../horizontal-scroll-wrap";
import ViewWrapper from "../view-wrapper";
import HorizontalChildWrap from "../horizontal-scroll-wrap/horizontal-child-wrap";
import { memo, useEffect } from "react";
import useInViewHorizontal from "../horizontal-in-view-hook";
import AudioPlayer from "../audio-player";
import HorizontalFirstPage from "../horizontal-first-page";

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
	useEffect(() => {}, []);
	return (
		<div
			style={{
				top: `${index * 100 + 50}dvh`,
			}}
			className={`absolute -translate-y-[50dvh] pointer-events-auto left-0  w-full h-screen min-h-screen bg-gradient-to-tl flex snap-always snap-mandatory snap-x overflow-y-hidden no-scrollbar`}
		>
			<div
				className={`w-screen min-w-full snap-mandatory snap-center snap-always h-screen overflow-auto flex items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
				View {index}
			</div>
			<div
				className={`w-screen min-w-full h-screen overflow-auto snap-center snap-always snap-mandatory flex items-center justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
				<textarea></textarea>
			</div>
			<div
				className={`w-screen min-w-full h-screen overflow-auto p-4 snap-center snap-always snap-mandatory flex items-start justify-center bg-gradient-to-tl from-${fromColor}-400 to-${toColor}-400`}
			>
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
