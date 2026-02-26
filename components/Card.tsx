import {Button, StyleSheet, Text, View} from 'react-native'
import React, {useContext} from 'react';
import {CardsContext} from "@/context/CardsContext";

type Props = {
	text: string;
	definition: string;
	readCount: number;
};

const Card = ({ text, definition, readCount }: Props) => {
	// @ts-ignore
	const { removeCard } = useContext(CardsContext);

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.word}>{text}</Text>
				<Text style={styles.definition}>{definition}</Text>
				<Text style={styles.definition}>{readCount}</Text>
				<Button title={"delete"} onPress={() => removeCard(text)}></Button>
			</View>
		</View>
	);
};

export default Card
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#233a51',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#325475',
		borderRadius: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	word: {
		fontWeight: 'bold',
		color: 'white',
		paddingBottom: 10,
	},
	definition: {
		fontStyle: 'italic',
		color: 'white'
	}
});
