import React, { useContext } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Card from '@/components/Card';
import InputCard from '@/components/InputCard';
import { CardsContext } from "@/context/CardsContext";

const Index = () => {
  // @ts-ignore
  const { cards, addCard, restoreCard } = useContext(CardsContext)

  const handleAddCard = (newCard: any) => {
    const result = addCard(newCard);
    if (result === 'duplicate') {
      Alert.alert(`"${newCard.word}" already exists in your active cards.`);
    }
    else if (result === 'archived') {
      Alert.alert(`"${newCard.word}" is already archived.`,
        '',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Restore', onPress: () => restoreCard(newCard)}
        ]
      );
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
    paddingBottom: 50,
    paddingRight: 20,
    paddingLeft: 20
  }
});