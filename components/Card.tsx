import {Button, StyleSheet, TextInput, View} from 'react-native'
import React, {useState} from 'react';

type Props = {
	onSubmit: (value: string) => void;
};

const Card = ({ onSubmit }: Props) => {
	const [text, setText] = useState<string>('');

	const handleSubmit = () => {
		if (!text.trim()) return
		onSubmit(text.trim());
		setText('');
	};

	return (
		<View style={styles.container}>
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
	)
}

export default Card
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#43607a',
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 10
	},
	textBox: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
