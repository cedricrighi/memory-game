import { useEffect, useState } from "react";
import "../assets/styles/MiniCardImg.css";
import { useMovesScore } from "../context/MovesScoreContext";
import { useDifficulty } from "../context/DifficultyContext";

interface MiniCardImgProps {
	logo: string;
	cardId: number;
	flippedArray: number[];
	setFlippedArray: React.Dispatch<React.SetStateAction<number[]>>;
	flippedTrueArray: number[];
	setFlippedTrueArray: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function MiniCardImg({
	logo,
	cardId,
	flippedArray,
	setFlippedArray,
	flippedTrueArray,
	setFlippedTrueArray,
}: MiniCardImgProps) {
	const cardsSizeArray = {
		mobile: { 1: 40, 2: 27, 3: 25, 4: 17, 5: 15 },
		tablet: { 1: 30, 2: 18, 3: 16, 4: 16, 5: 14 },
		desktop: { 1: 15, 2: 15, 3: 9.9, 4: 10, 5: 10 },
	};

	const [widthImgCards, setWidthImgCards] = useState(45);
	const { difficulty } = useDifficulty() as { difficulty: 1 | 2 | 3 | 4 | 5 };
	const { moves, setMoves } = useMovesScore();

	useEffect(() => {
		const updateWidth = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth < 600) {
				setWidthImgCards(cardsSizeArray.mobile[difficulty]);
			} else if (screenWidth < 900) {
				setWidthImgCards(cardsSizeArray.tablet[difficulty]);
			} else {
				setWidthImgCards(cardsSizeArray.desktop[difficulty]);
			}
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, [difficulty]);

	const checkPair = (arr: number[]) => {
		if (arr.length === 2) {
			const [firstCard, secondCard] = arr;
			const firstCardLogo = document
				.getElementById(firstCard.toString())
				?.querySelector("img")?.src;
			const secondCardLogo = document
				.getElementById(secondCard.toString())
				?.querySelector("img")?.src;

			if (firstCardLogo === secondCardLogo) {
				setTimeout(() => {
					setFlippedTrueArray((prev) => [...prev, firstCard, secondCard]);
				}, 500);
			}
			setTimeout(() => {
				setFlippedArray([]);
			}, 1000);
		}
	};

	const handleClickFlip = () => {
		if (flippedArray.length < 2 && !flippedTrueArray.includes(cardId)) {
			setMoves(moves + 1);
			setFlippedArray((prev) => {
				const newArray = [...prev, cardId];
				checkPair(newArray);
				return newArray;
			});
		}
	};

	return (
		<div
			className={`mini-card-box ${flippedArray.includes(cardId) || flippedTrueArray.includes(cardId) ? "flip" : ""}`}
			id={cardId.toString()}
			style={{
				width: `${widthImgCards}vw`,
				height: `${widthImgCards}vw`,
			}}
			onClick={() => {
				if (flippedArray.length < 2 && !flippedTrueArray.includes(cardId)) {
					handleClickFlip();
				}
				console.log(flippedTrueArray);
			}}
			onKeyDown={handleClickFlip}
		>
			<div className="mini-card-content">
				<div className="mini-card-front" />
				<div className="mini-card-back">
					<img src={logo} alt={`${logo} card`} className="mini-card-img" />
				</div>
			</div>
		</div>
	);
}
