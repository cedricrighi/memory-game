import { createContext, useContext, useState } from "react";

interface DifficultyContextProps {
	children: React.ReactNode;
}

interface DifficultyContextType {
	difficulty: number;
	setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

const DifficultyContext = createContext<DifficultyContextType | null>(null);

export const DifficultyProvider = ({ children }: DifficultyContextProps) => {
	const [difficulty, setDifficulty] = useState(1);

	return (
		<DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
			{children}
		</DifficultyContext.Provider>
	);
};

export const useDifficulty = () => {
	const context = useContext(DifficultyContext);
	if (!context) {
		throw new Error("useDifficulty must be used within a DifficultyProvider");
	}
	return context;
};
