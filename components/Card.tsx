import {Button, StyleSheet, Text, View, Pressable} from 'react-native'
import React, {useContext} from 'react';
import {CardsContext} from "@/context/CardsContext";

type Props = {
	text: string;
	partOfSpeech: string;
	definition: string;
	readCount: number;
};

const Card = ({ text, partOfSpeech, definition, readCount }: Props) => {
	// @ts-ignore
	const { removeCard } = useContext(CardsContext);

	return (
		<Pressable
			onPress={() => { console.log("Pressed card:", text) }}
			style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.word}>{text}</Text>
				<Text style={styles.definition}>{"(" + partOfSpeech + ")"}</Text>
				<Text style={styles.definition}>{definition}</Text>
				<Text style={styles.definition}>{readCount}</Text>
				<Button title={"delete"} onPress={() => removeCard(text)}></Button>
			</View>
		</Pressable>
	);
};

export default Card
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#EAF0E5',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	word: {
		fontWeight: 'bold',
		color: '#2D342C',
		paddingBottom: 10,
	},
	definition: {
		fontStyle: 'italic',
		color: '#2D342C'
	}
});
