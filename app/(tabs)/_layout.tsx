import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { DynamicColorIOS, Platform, useColorScheme } from "react-native";

export default function TabsLayout() {
  const colourScheme = useColorScheme();
  const dynamicColour =
    Platform.OS === "ios"
      ? DynamicColorIOS({ dark: "white", light: "black" })
      : colourScheme === "dark"
        ? "white"
        : "black";

  return (
    <ThemeProvider value={colourScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeTabs
        labelStyle={{ color: dynamicColour }}
        tintColor={dynamicColour}
      >
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            drawable="ic_tab_home"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="recall">
          <Label>Recall</Label>
          <Icon
            sf={{
              default: "brain.head.profile",
              selected: "brain.head.profile.fill",
            }}
            drawable="ic_tab_recall"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="archive">
          <Label>Archive</Label>
          <Icon
            sf={{ default: "archivebox", selected: "archivebox.fill" }}
            drawable="ic_tab_archive"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
