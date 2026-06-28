import * as Notifications from "expo-notifications";
import React, { useContext } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/Card";
import InputCard from "@/components/InputCard";
import { CardsContext } from "@/context/CardsContext";
import {
  meaningsForNotification,
  NOTIFICATION_CATEGORY,
} from "@/services/notificationService";

const Index = () => {
  // @ts-ignore
  const { cards, addCard, restoreCard } = useContext(CardsContext);

  const handleAddCard = (newCard: {
    word: string;
    meanings: Record<string, string[]>;
  }) => {
    const result = addCard(newCard);

    if (result === "duplicate") {
      Alert.alert(`"${newCard.word}" already exists in your active cards.`);
    } else if (result === "archived") {
      Alert.alert(`"${newCard.word}" is already archived.`, "", [
        { text: "Cancel", style: "cancel" },
        { text: "Restore", onPress: () => restoreCard(newCard) },
      ]);
    } else {
      // Schedule a notification for an added card.
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Recall this word?",
          body: `'${newCard.word}'\n\n${meaningsForNotification(newCard.meanings)}`,
          sound: "default",
          categoryIdentifier: NOTIFICATION_CATEGORY,
          data: { word: newCard.word },
        },
        trigger: {
          type: "timeInterval",
          seconds: 2,
          repeats: false,
        } as any,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container]} edges={["top"]}>
      <View style={styles.cardContainer}>
        <InputCard onSubmit={handleAddCard} />
        <FlatList
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              text={item.word}
              meanings={item.meanings}
              readCount={item.readCount}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF0E5",
  },
  cardContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  scrollViewContent: {
    paddingBottom: 90,
  },
});
