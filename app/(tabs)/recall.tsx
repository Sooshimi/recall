import {Button, StyleSheet, View} from 'react-native'
import React, {useContext, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

import Card from "@/components/Card";
import {CardsContext} from "@/context/CardsContext";

const Recall = () => {
	// @ts-ignore
	const { cards, readPressed } = useContext(CardsContext);
	const [ currentCardIndex, setCurrentCardIndex ] = useState<number>(0);

	// This is to also check if the current card exists.
	const currentCard = cards[currentCardIndex];

	const readPressedHandler = () => {
		if (!cards || cards.length === 0) return;

		readPressed(currentCard.word);

		// Loop back to first card when reaching end of card list
		if (currentCardIndex < cards.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1);
		} else {
			setCurrentCardIndex(0);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.cardContainer}>
				{ currentCard && (
					<Card
						text={currentCard.word}
						definition={currentCard.definition}
						readCount={currentCard.readCount} />
				)}
				{ currentCard && (
				<Button
					title="Mark as read"
					color='gray'
					onPress={() => {readPressedHandler()}}>
				</Button>
				)}
			</View>
		</SafeAreaView>
	)
}

export default Recall

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#233a51',
		justifyContent: 'center',
	},
	cardContainer: {
		paddingRight: 20,
		paddingLeft: 20
	}
});