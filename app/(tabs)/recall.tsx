import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/Card";
import { CardsContext } from "@/context/CardsContext";
import { colors, spacing } from "@/constants/theme";

const Recall = () => {
  // @ts-ignore
  const { cards, readPressed } = useContext(CardsContext);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  // This is to also check if the current card exists.
  const currentCard = cards[currentCardIndex];

  // State-driven. Runs when a state has changed.
  // This is added so recall cards are updated if a card is removed from home screen.
  useEffect(() => {
    if (!cards || cards.length === 0) {
      setCurrentCardIndex(0);
      return;
    }

    if (currentCardIndex >= cards.length) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }, [cards, currentCardIndex]);

  // Event-driven. Runs only when user clicks on the 'read' button.
  const readPressedHandler = () => {
    if (!cards || cards.length === 0) return;

    readPressed(currentCard.word);

    // Loop back to first card when reaching end of card list
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  return (
    <SafeAreaView style={[styles.container]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          {currentCard && (
            <Card
              text={currentCard.word}
              meanings={currentCard.meanings}
              readCount={currentCard.readCount}
            />
          )}
          {currentCard && (
            <Button
              title="Mark as read"
              color="gray"
              onPress={() => {
                readPressedHandler();
              }}
            ></Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  cardContainer: {
    paddingHorizontal: spacing.horizontal,
    paddingBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
