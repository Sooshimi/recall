import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import Card from "@/components/Card";

const Recall = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.cardContainer}>
				<Card text='word' definition='definition' />
			</View>
		</SafeAreaView>
	)
}

export default Recall

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#233a51'
	},
	cardContainer: {
		flex: 1,
		backgroundColor: '#233a51',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 20,
		paddingRight: 20,
		paddingLeft: 20
	}
});