import { fetchDefinitions } from "@/services/dictionaryService";
import { colors, spacing } from "@/constants/theme";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type Props = {
  onSubmit: (value: {
    word: string;
    meanings: Record<string, string[]>;
  }) => void;
};

const InputCard = ({ onSubmit }: Props) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const meanings = await fetchDefinitions(text);
      const word = text.trim();

      onSubmit({ word, meanings });
      setText("");
    } catch (e) {
      console.error(e);
      alert("Cannot find word");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textBox}
          placeholder={"Word lookup"}
          placeholderTextColor={"gray"}
        ></TextInput>
        <Button title="Add" onPress={handleSubmit} color={colors.primaryText}></Button>
      </View>
    </View>
  );
};

export default InputCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: colors.background,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.inputCard,
    borderRadius: 15,
    paddingVertical: 20,
    paddingLeft: spacing.horizontal,
    paddingRight: 10,
  },
  textBox: {
    flex: 1,
    opacity: 1,
    textAlign: "center",
  },
});
