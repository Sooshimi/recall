import { Tabs } from "expo-router";

import CardsContextProvider from "@/context/CardsContext";

export default function RootLayout() {
  return (
    <CardsContextProvider>
      <Tabs screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderBottomColor: '#233a51',
          borderRadius: 20,
          position: 'absolute'
        }}}
      >
        <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
        <Tabs.Screen name="recall" options={{ headerShown: false, title: 'Recall' }} />
      </Tabs>
    </CardsContextProvider>
  )};
