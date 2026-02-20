import {FlatList, StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import InputCard from '@/components/InputCard';
import Card from '@/components/Card';

const Index = () => {
  const [cards, setCards] = useState<{ word: string; definition: string; }[]>([]);

  const addCard = (newCard: {word: string, definition: string}) => {
    setCards([newCard, ...cards]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <InputCard onSubmit={addCard}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <Card text={item.word} definition={item.definition}/>
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