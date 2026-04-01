import React, {createContext, useState} from 'react'

export const CardsContext = createContext({});

// @ts-ignore
const CardsContextProvider = ({ children }) => {
	const [cards, setCards] = useState<{
		word: string;
		meanings: Record<string, string[]>;
		readCount: number; }[]>([]);

	const addCard = (newCard: {word: string, meanings: Record<string, string[]>, readCount: number }) => {
		setCards([{...newCard, readCount: 0}, ...cards]);
	};

	const removeCard = (word: string) => {
		setCards(prevCards =>
			prevCards.filter(card => card.word !== word)
		);
	};

	const readPressed = (word: string) => {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card.word === word) {
					return {...card, readCount: card.readCount + 1};
				}
				return card;
			})
		);
	};

	return (
		<CardsContext.Provider value={{cards, addCard, readPressed, removeCard}}>
			{children}
		</CardsContext.Provider>
	)
}

export default CardsContextProvider
