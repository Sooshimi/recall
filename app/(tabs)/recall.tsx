import {Button, StyleSheet, View} from 'react-native'
import React, {useContext} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

import Card from "@/components/Card";
import {CardsContext} from "@/context/CardsContext";

const Recall = () => {
	// @ts-ignore
	const { cards } = useContext(CardsContext)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.cardContainer}>
				{ cards && cards.length > 0 && (
					<Card text={cards[0].word} definition={cards[0].definition} />
				)}
				<Button title="Mark as read" color='gray'></Button>
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