import {Button, StyleSheet, TextInput, View} from 'react-native'
import React, {useState} from 'react';
import { fetchDefinitions } from "@/services/dictionaryService";

type Props = {
	onSubmit: (value: { word: string, definition: string }) => void;
};

const InputCard = ({ onSubmit }: Props) => {
	const [text, setText] = useState<string>('');

	const handleSubmit = async () => {
		if (!text.trim()) return;

		try {
			const definition = await fetchDefinitions(text);
			const word = text.trim()

			onSubmit({ word, definition });
			setText('');

		} catch(e) {
			console.log(e);
			alert('Cannot find word');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<TextInput
					value={text}
					onChangeText={setText}
					style={styles.textBox}
					placeholder={"Word lookup"}
					placeholderTextColor={"gray"}>
				</TextInput>
				<Button
					title="Add"
					onPress={handleSubmit}
					color="#2D342C"
				>
				</Button>
			</View>
		</View>
	)
}

export default InputCard
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#EAF0E5',
		margin: 10
	},
	innerContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#DDE5D8',
		borderRadius: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 10
	},
	textBox: {
		flex: 1,
		opacity: 1,
		textAlign: 'center'
	}
})
