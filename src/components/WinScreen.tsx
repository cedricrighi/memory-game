import "../assets/styles/WinScreen.css";
import { useMovesScore } from "../context/MovesScoreContext";

export default function WinScreen() {
	const { moves } = useMovesScore();

	return (
		<div className="win-modale">
			<div className="win-content">
				<h2>Bravo, vous avez gagné !</h2>
				<p>Nombre de coups : {moves}</p>
				<button type="button" onClick={() => window.location.reload()}>
					Rejouer
				</button>
			</div>
		</div>
	);
}
