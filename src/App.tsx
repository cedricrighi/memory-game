import "./App.css";
import GameScreen from "./components/GameScreen";
import { MovesScoreProvider } from "./context/MovesScoreContext";
import { DifficultyProvider } from "./context/DifficultyContext";
import { PlayingProvider } from "./context/PlayingContext";
import { useWin, WinProvider } from "./context/WinContext";
import WinScreen from "./components/WinScreen";

function AppContent() {
	const { win } = useWin();

	return (
		<>
			<MovesScoreProvider>
				<DifficultyProvider>
					<PlayingProvider>
						<GameScreen />
						{win && <WinScreen />}
					</PlayingProvider>
				</DifficultyProvider>
			</MovesScoreProvider>
		</>
	);
}

function App() {
	return (
		<WinProvider>
			<AppContent />
		</WinProvider>
	);
}

export default App;
