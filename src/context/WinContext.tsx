import { createContext, useContext, useState } from "react";

interface WinContextProps {
	children: React.ReactNode;
}

interface WinContextType {
	win: boolean;
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const WinContext = createContext<WinContextType | null>(null);

export const WinProvider = ({ children }: WinContextProps) => {
	const [win, setWin] = useState(false);

	return (
		<WinContext.Provider value={{ win, setWin }}>
			{children}
		</WinContext.Provider>
	);
};

export const useWin = () => {
	const context = useContext(WinContext);
	if (!context) {
		throw new Error("useWin must be used within a WinProvider");
	}
	return context;
};
