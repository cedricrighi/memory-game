import { useDifficulty } from "../context/DifficultyContext";
import { usePlaying } from "../context/PlayingContext";
import "../assets/styles/GameScreen.css";
import MiniCardImg from "./MiniCardImg";
import { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import { useWin } from "../context/WinContext";

export default function GameScreen() {
	const difficultiesArray: [number, string, number][] = [
		[1, "Easy", 2],
		[2, "Medium", 4],
		[3, "Hard", 6],
		[4, "Very hard", 8],
		[5, "Demoniac", 10],
	];

	const tilesArray: [string, number][] = [
		["react", 1],
		["vite", 2],
		["bootstrap", 3],
		["chrome", 4],
		["js", 5],
		["github", 6],
		["apple", 7],
		["mysql", 8],
		["nodejs", 9],
		["notion", 10],
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
	const [numberTiles, setNumberTiles] = useState(0);
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
			setNumberTiles(() => difficultiesArray[difficulty - 1][2]);
			const newTiles = tilesArray
				.slice(0, numberTiles)
				.flatMap(
					(tile) =>
						[
							[tile[0], tile[1].toString()],
							[tile[0], tile[1].toString()],
						] as [string, string][],
				)
				.sort(() => Math.random() - 0.5);
			setShuffledTiles(newTiles);
		}
	}, [isPlaying, difficulty, numberTiles]);

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
