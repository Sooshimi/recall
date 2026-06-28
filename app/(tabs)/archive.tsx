import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/Card";
import { CardsContext } from "@/context/CardsContext";
import { colors, spacing } from "@/constants/theme";

const Archive = () => {
  // @ts-ignore
  const { archivedCards, deleteCard, restoreCard } = useContext(CardsContext);

  return (
    <SafeAreaView style={[styles.container]} edges={["top"]}>
      <View style={styles.cardContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={archivedCards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              text={item.word}
              meanings={item.meanings}
              readCount={item.readCount}
              onRestore={() => restoreCard(item)}
              onDelete={() => deleteCard(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Archive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: spacing.horizontal,
  },
});
