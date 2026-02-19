import {FlatList, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import InputCard from '@/components/InputCard';
import Card from '@/components/Card';

const Index = () => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (newItem: string) => {
    setItems([newItem, ...items]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <InputCard onSubmit={addItem} />
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <Card text={item} />
        }
        />
      </View>
    </SafeAreaView>
  );
};

export default Index
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#233a51'
  },
  cardContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20
  }
});