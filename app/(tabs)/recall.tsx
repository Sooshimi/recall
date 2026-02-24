import {Button, StyleSheet, View} from 'react-native'
import React, {useContext, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

import Card from "@/components/Card";
import {CardsContext} from "@/context/CardsContext";

const Recall = () => {
	// @ts-ignore
	const { cards, readPressed } = useContext(CardsContext);
	const [ currentCard, setCurrentCard ] = useState<number>(0);

	const readPressedHandler = () => {
		if (!cards || cards.length === 0) return;

		readPressed(cards[currentCard].word);

		// Loop back to first card when reaching end of card list
		if (currentCard < cards.length - 1) {
			setCurrentCard(currentCard + 1);
		} else {
			setCurrentCard(0);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.cardContainer}>
				{ cards && cards.length > 0 && (
					<Card
						text={cards[currentCard].word}
						definition={cards[currentCard].definition}
						readCount={cards[currentCard].readCount} />
				)}
				<Button
					title="Mark as read"
					color='gray'
					onPress={() => {readPressedHandler()}}>
				</Button>
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