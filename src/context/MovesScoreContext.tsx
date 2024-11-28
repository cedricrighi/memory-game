import { createContext, useContext, useState } from "react";

interface MovesScoreContextProps {
	children: React.ReactNode;
}

interface MovesScoreContextType {
	moves: number;
	setMoves: React.Dispatch<React.SetStateAction<number>>;
}

const MovesScoreContext = createContext<MovesScoreContextType | null>(null);

export const MovesScoreProvider = ({ children }: MovesScoreContextProps) => {
	const [moves, setMoves] = useState(0);

	return (
		<MovesScoreContext.Provider value={{ moves, setMoves }}>
			{children}
		</MovesScoreContext.Provider>
	);
};

export const useMovesScore = () => {
	const context = useContext(MovesScoreContext);
	if (!context) {
		throw new Error("useMovesScore must be used within a MovesScoreProvider");
	}
	return context;
};
