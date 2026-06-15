import {FlatList, StyleSheet, View, Alert} from 'react-native'
import React, {useContext} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

import InputCard from '@/components/InputCard';
import Card from '@/components/Card';
import {CardsContext} from "@/context/CardsContext";

const Index = () => {
  // @ts-ignore
  const { cards, addCard } = useContext(CardsContext)

  const handleAddCard = (newCard: any) => {
    const success = addCard(newCard);
    if (!success) {
      Alert.alert(`"${newCard.word}" already exists in your cards.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <InputCard onSubmit={handleAddCard}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <Card text={item.word}
                  meanings={item.meanings}
                  readCount={item.readCount}
            />
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
    backgroundColor: '#EAF0E5'
  },
  cardContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20
  }
});