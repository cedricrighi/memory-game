import { useDifficulty } from "../context/DifficultyContext";
import { usePlaying } from "../context/PlayingContext";
import "../assets/styles/GameScreen.css";
import MiniCardImg from "./MiniCardImg";
import { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import { useWin } from "../context/WinContext";
import appleLogo from "../assets/images/apple-logo.svg";
import bootstrapLogo from "/bootstrap-logo.svg";
import chromeLogo from "/chrome-logo.svg";
import githubLogo from "/github-logo.svg";
import jsLogo from "/js-logo.svg";
import mysqlLogo from "/mysql-logo.svg";
import nodejsLogo from "/nodejs-logo.svg";
import notionLogo from "/notion-logo.svg";
import reactLogo from "/react-logo.svg";
import viteLogo from "/vite-logo.svg";

export default function GameScreen() {
	const difficultiesArray: [number, string, number][] = [
		[1, "Easy", 2],
		[2, "Medium", 4],
		[3, "Hard", 6],
		[4, "Very hard", 8],
		[5, "Demoniac", 10],
	];

	const tilesArray: [string, number][] = [
		[reactLogo, 1],
		[viteLogo, 2],
		[bootstrapLogo, 3],
		[chromeLogo, 4],
		[jsLogo, 5],
		[githubLogo, 6],
		[appleLogo, 7],
		[mysqlLogo, 8],
		[nodejsLogo, 9],
		[notionLogo, 10],
	];

	const paddingLeftGrid = {
		mobile: { 1: 6, 2: 18, 3: 5, 4: 6.5, 5: 10 },
		tablet: { 1: 18, 2: 9.5, 3: 13, 4: 12.7, 5: 9 },
		desktop: { 1: 14.8, 2: 14.8, 3: 12, 4: 11.8, 5: 5.2 },
	};

	const { difficulty, setDifficulty } = useDifficulty() as {
		difficulty: 1 | 2 | 3 | 4 | 5;
		setDifficulty: (difficulty: number) => void;
	};
	const { isPlaying, setIsPlaying } = usePlaying();
	const { setWin } = useWin();
	const [_, setNumberTiles] = useState(0);
	const [flippedArray, setFlippedArray] = useState<number[]>([]);
	const [flippedTrueArray, setFlippedTrueArray] = useState<number[]>([]);
	const [shuffledTiles, setShuffledTiles] = useState<[string, string][]>([]);
	const [paddingLeft, setPaddingLeft] = useState(10);

	useEffect(() => {
		const updatePadding = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth < 600) {
				setPaddingLeft(paddingLeftGrid.mobile[difficulty]);
			} else if (screenWidth < 900) {
				setPaddingLeft(paddingLeftGrid.tablet[difficulty]);
			} else {
				setPaddingLeft(paddingLeftGrid.desktop[difficulty]);
			}
		};

		updatePadding();
		window.addEventListener("resize", updatePadding);
		return () => window.removeEventListener("resize", updatePadding);
	}, [difficulty]);

	useEffect(() => {
		if (isPlaying && flippedTrueArray.length > 0 && shuffledTiles.length > 0) {
			if (flippedTrueArray.length === shuffledTiles.length * 2) {
				setWin(true);
			}
		}
	}, [flippedTrueArray, shuffledTiles, isPlaying, setWin]);

	useEffect(() => {
		if (isPlaying) {
			const newNumberTiles = difficultiesArray[difficulty - 1][2];
			setNumberTiles(newNumberTiles);
			const allCards: [string, string][] = [];
			for (const tile of tilesArray.slice(0, newNumberTiles)) {
				allCards.push([tile[0], tile[1].toString()]);
				allCards.push([tile[0], tile[1].toString()]);
			}

			for (let i = allCards.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[allCards[i], allCards[j]] = [allCards[j], allCards[i]];
			}
			setShuffledTiles(allCards);
		}
	}, [isPlaying, difficulty]);

	return (
		<>
			<TitleBar
				setFlippedArray={setFlippedArray}
				setFlippedTrueArray={setFlippedTrueArray}
			/>
			{!isPlaying ? (
				<div className="buttons-list">
					{difficultiesArray.map((obj) => (
						<button
							type="button"
							className="difficulty-button"
							key={obj[0]}
							onClick={() => {
								setDifficulty(Number(obj[0]));
								setIsPlaying(true);
							}}
						>
							{obj[1]}
						</button>
					))}
				</div>
			) : (
				<div className="game-grid" style={{ paddingLeft: `${paddingLeft}vw` }}>
					{shuffledTiles.map((tile, index) => (
						<MiniCardImg
							key={`${tile[0]}-${index}`}
							cardId={index}
							logo={tile[0]}
							flippedArray={flippedArray}
							setFlippedArray={setFlippedArray}
							flippedTrueArray={flippedTrueArray}
							setFlippedTrueArray={setFlippedTrueArray}
						/>
					))}
				</div>
			)}
		</>
	);
}
