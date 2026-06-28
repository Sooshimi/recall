import { CardsContext } from "@/context/CardsContext";
import { colors } from "@/constants/theme";
import React, { useContext, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  meanings: Record<string, string[]>;
  readCount: number;
  onRestore?: () => void;
  onDelete?: () => void;
};

const Card = ({ text, meanings, readCount, onDelete, onRestore }: Props) => {
  // @ts-ignore
  const { archiveCard } = useContext(CardsContext);
  const [expand, setExpand] = useState<boolean>(false);
  const maxDefinitions = 2;
  const debug = false;

  return (
    <Pressable
      onPress={() => setExpand((prev) => !prev)}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.word}>{text}</Text>

        <View style={styles.meaningsContainer}>
          {/* For every part of speech, create a group of definitions */}
          {Object.entries(meanings).map(([partOfSpeech, definitions]) => {
            // Toggle. For every part of speech, only show the first n defs if not expanded, else show all defs
            const visibleDefinitions = expand
              ? definitions
              : definitions.slice(0, maxDefinitions);

            return (
              <View key={partOfSpeech} style={styles.group}>
                <Text style={styles.partOfSpeech}>{partOfSpeech}</Text>

                {visibleDefinitions.map((definition, index) => (
                  <Text key={index} style={styles.definition}>
                    • {definition}
                  </Text>
                ))}

                {!expand && definitions.length > maxDefinitions && (
                  <Text style={styles.moreText}>• ...see more</Text>
                )}

                {expand && definitions.length > maxDefinitions && (
                  <Text style={styles.moreText}>...see less</Text>
                )}
              </View>
            );
          })}
        </View>

        {debug && <Text style={styles.definition}>{readCount}</Text>}

        {onDelete ? (
          <>
            <Button title={"delete"} onPress={onDelete} />
            <Button title={"restore"} onPress={onRestore} />
          </>
        ) : (
          <Button
            title={"archive"}
            onPress={() => archiveCard({ word: text, meanings, readCount })}
          />
        )}
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 10,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cardColour,
    borderRadius: 15,
    padding: 20,
  },
  word: {
    fontWeight: "bold",
    color: colors.primaryText,
    paddingBottom: 10,
  },
  meaningsContainer: {
    width: "100%",
    marginBottom: 10,
  },
  group: {
    marginBottom: 10,
  },
  partOfSpeech: {
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 4,
  },
  definition: {
    fontStyle: "italic",
    color: colors.primaryText,
  },
  moreText: {
    fontStyle: "italic",
    color: colors.primaryText,
    opacity: 0.7,
  },
});
