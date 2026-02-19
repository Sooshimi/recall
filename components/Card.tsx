import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react';

const Card = () => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.textBox} placeholder={"Type here"} placeholderTextColor={"gray"}></TextInput>
			<Button
				title="+"
				onPress={() => alert("Button clicked")}
				color={"white"}
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
