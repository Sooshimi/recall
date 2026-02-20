import { createContext, useState } from 'react'
import React from 'react'

export const CardsContext = createContext({});

// @ts-ignore
const CardsContextProvider = ({ children }) => {
	const [cards, setCards] = useState<{ word: string; definition: string; }[]>([]);

	const addCard = (newCard: {word: string, definition: string}) => {
		setCards([newCard, ...cards]);
	};

	return (
		<CardsContext.Provider value={{cards, addCard}}>
			{children}
		</CardsContext.Provider>
	)
}

export default CardsContextProvider
