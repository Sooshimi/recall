import { Tabs } from "expo-router";

import CardsContextProvider from "@/context/CardsContext";

export default function RootLayout() {
  return (
    <CardsContextProvider>
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
        <Tabs.Screen name="recall" options={{ headerShown: false, title: 'Recall' }} />
      </Tabs>
    </CardsContextProvider>
  )};
