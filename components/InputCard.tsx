import {Button, StyleSheet, TextInput, View} from 'react-native'
import React, {useState} from 'react';

type Props = {
	onSubmit: (value: { word: string, definition: string }) => void;
};

const InputCard = ({ onSubmit }: Props) => {
	const [text, setText] = useState<string>('');

	const handleSubmit = async () => {
		if (!text.trim()) return;

		try {
			const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
			const data = await response.json();
			const word = text.trim()
			const definition = data[0].meanings[0].definitions[0].definition

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
					placeholder={"Type here"}
					placeholderTextColor={"gray"}>
				</TextInput>
				<Button
					title="Add"
					onPress={handleSubmit}
					color="white"
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
		backgroundColor: '#233a51',
		margin: 10
	},
	innerContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#325475',
		borderRadius: 15,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 10
	},
	textBox: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,0.95)',
		borderRadius: 10,
		borderStyle: 'solid',
		borderColor: 'gray',
		borderWidth: 2,
		textAlign: 'center'
	}
})
