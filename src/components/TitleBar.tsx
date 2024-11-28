import "../assets/styles/TitleBar.css";
import { useMovesScore } from "../context/MovesScoreContext";
import { usePlaying } from "../context/PlayingContext";

interface TitleBarProps {
	setFlippedArray: (value: number[]) => void;
	setFlippedTrueArray: (value: number[]) => void;
}

export default function TitleBar({
	setFlippedArray,
	setFlippedTrueArray,
}: TitleBarProps) {
	const { moves, setMoves } = useMovesScore();
	const { isPlaying, setIsPlaying } = usePlaying();
	return (
		<div className="title-bar">
			<h1>Memory Game</h1>
			<div className="right-part-bar" style={isPlaying ? {} : { opacity: 0 }}>
				<div className="moves">{`Moves: ${moves}`}</div>
				<button
					type="button"
					onClick={() => {
						setMoves(0);
						setIsPlaying(false);
						setFlippedArray([]);
						setFlippedTrueArray([]);
					}}
					className="restart-button"
				>
					New Game
				</button>
			</div>
		</div>
	);
}
