import React, {createContext, useState} from 'react'

export const CardsContext = createContext({});

// @ts-ignore
const CardsContextProvider = ({ children }) => {
	const [cards, setCards] = useState<{ word: string; definition: string; readCount: number; }[]>([]);

	const addCard = (newCard: {word: string, definition: string, readCount: number }) => {
		setCards([{...newCard, readCount: 0}, ...cards]);
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
		<CardsContext.Provider value={{cards, addCard, readPressed}}>
			{children}
		</CardsContext.Provider>
	)
}

export default CardsContextProvider
