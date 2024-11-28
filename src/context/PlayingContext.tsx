import { createContext, useContext, useState } from "react";

interface PlayingContextProps {
	children: React.ReactNode;
}

interface PlayingContextType {
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayingContext = createContext<PlayingContextType | null>(null);

export const PlayingProvider = ({ children }: PlayingContextProps) => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<PlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
			{children}
		</PlayingContext.Provider>
	);
};

export const usePlaying = () => {
	const context = useContext(PlayingContext);
	if (!context) {
		throw new Error("usePlaying must be used within a PlayingProvider");
	}
	return context;
};
