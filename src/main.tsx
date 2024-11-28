import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import { MovesScoreProvider } from "./context/MovesScoreContext";
import { DifficultyProvider } from "./context/DifficultyContext";
import { PlayingProvider } from "./context/PlayingContext";
import { WinProvider } from "./context/WinContext";

const root = document.getElementById("root");

root &&
	createRoot(root).render(
		<StrictMode>
			<MovesScoreProvider>
				<DifficultyProvider>
					<PlayingProvider>
						<WinProvider>
							<App />
						</WinProvider>
					</PlayingProvider>
				</DifficultyProvider>
			</MovesScoreProvider>
		</StrictMode>,
	);
