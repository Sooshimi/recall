import {FlatList, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import Card from '@/components/Card';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Card />
    </SafeAreaView>
  )
}

export default Index
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#989898',
    justifyContent: "flex-start",
    alignItems: "center"
  }
})