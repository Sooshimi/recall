import {FlatList, StyleSheet, Text} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import Card from '@/components/Card';

const Index = () => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (newItem: string) => {
    setItems([newItem, ...items]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card onSubmit={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
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