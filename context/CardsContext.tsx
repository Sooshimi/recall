import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'cards';
export const CardsContext = createContext({});

type Card = {
	word: string;
	meanings: Record<string, string[]>;
	readCount: number;
}

// @ts-ignore
const CardsContextProvider = ({ children }) => {
	const [cards, setCards] = useState<Card[]>([]);

	// Load cards from AsyncStorage on mount
	// [] as dependency to run only once on mount
	useEffect(() => {
		(async () => {
			const raw = await AsyncStorage.getItem(STORAGE_KEY);
			if (raw) setCards(JSON.parse(raw));
		})();
	}, []);

	// Save cards to AsyncStorage whenever they change
	// [cards] as dependency to run whenever cards change
	useEffect(() => {
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
	}, [cards]);

	const addCard = (newCard: Card) => {
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
