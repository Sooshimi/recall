import {StyleSheet, Text, View} from 'react-native'
import React from 'react';

type Props = {
	text: string;
	definition: string;
};

const Card = ({ text, definition }: Props) => {

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.word}>{text}</Text>
				<Text style={styles.definition}>{definition}</Text>
			</View>
		</View>
	);
};

export default Card
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#233a51',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#43607a',
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
