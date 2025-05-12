import {createContext, useContext, useState, ReactNode, Dispatch, SetStateAction} from "react";

type AppContextType = {
	lastEditUser: {name: string; email: string};
	setLastEditUser: Dispatch<SetStateAction<{name: string; email: string}>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
	const [lastEditUser, setLastEditUser] = useState({
		name: '',
		email: ''
	});

	return (
		<AppContext.Provider value={{ lastEditUser, setLastEditUser }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
}
