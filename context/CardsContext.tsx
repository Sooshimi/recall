import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';


const ACTIVE_CARDS = 'cards';
const ARCHIVED_CARDS = 'archivedCards';

type Card = {
	word: string;
	meanings: Record<string, string[]>;
	readCount: number;
}

export const CardsContext = createContext({});

// @ts-ignore
const CardsContextProvider = ({ children }) => {
	const [cards, setCards] = useState<Card[]>([]);
	const [archivedCards, setArchivedCards] = useState<Card[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load cards from AsyncStorage on mount
	// [] as dependency to run only once on mount
	// setIsLoaded is used to prevent saving to AsyncStorage before the initial load is complete
	useEffect(() => {
		(async () => {
			const raw = await AsyncStorage.getItem(ACTIVE_CARDS);
			const archivedRaw = await AsyncStorage.getItem(ARCHIVED_CARDS);
			if (raw) setCards(JSON.parse(raw));
			if (archivedRaw) setArchivedCards(JSON.parse(archivedRaw));
			setIsLoaded(true);
		})();
	}, []);

	// Save active cards to AsyncStorage whenever they change
	// [cards] as dependency to run whenever cards change
	useEffect(() => {
		if (!isLoaded) return;
		AsyncStorage.setItem(ACTIVE_CARDS, JSON.stringify(cards)).catch(console.error);
	}, [cards, isLoaded]);

	// Save archived cards to AsyncStorage whenever they change
	// [archivedCards] as dependency to run whenever archived cards change
	useEffect(() => {
		if (!isLoaded) return;
		AsyncStorage.setItem(ARCHIVED_CARDS, JSON.stringify(archivedCards)).catch(console.error);
	}, [archivedCards, isLoaded]);

	const addCard = (newCard: Card) => {
		if (cards.some(card => card.word.toLowerCase() === newCard.word.toLowerCase()))
			return 'duplicate';
		if (archivedCards.some(card => card.word.toLowerCase() === newCard.word.toLowerCase()))
			return 'archived';
		setCards([{...newCard, readCount: 0}, ...cards]);
	};

	const restoreCard = (cardToRestore: Card) => {
		setArchivedCards(prevCards =>
			prevCards.filter(c => c.word !== cardToRestore.word)
		);
		setCards(prevCards => [{...cardToRestore}, ...prevCards]);
	};

	const deleteCard = (cardToDelete: Card) => {
		setArchivedCards(prev =>
			prev.filter(c => c.word !== cardToDelete.word))
	}

	const archiveCard = (cardToArchive: Card) => {
		setCards(prevCards =>
			prevCards.filter(c => cardToArchive.word !== c.word)
		);
		setArchivedCards(prev => [{...cardToArchive}, ...prev]);
	};

	const readPressed = (word: string) => {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card.word === word) {
					return {...card, readCount: card.readCount + 1};
				}
				return card;
			})
				.sort((a, b) => b.readCount - a.readCount)
		);
	};

	return (
		<CardsContext.Provider value={{cards, archivedCards, addCard, readPressed, archiveCard, deleteCard, restoreCard}}>
			{children}
		</CardsContext.Provider>
	)
}

export default CardsContextProvider
