import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#233a51',
        borderRadius: 20,
        position: 'absolute'
      }}}
    >
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home', tabBarActiveTintColor: '#2D342C', tabBarInactiveTintColor: '#7A8076'}} />
      <Tabs.Screen name="recall" options={{ headerShown: false, title: 'Recall', tabBarActiveTintColor: '#2D342C', tabBarInactiveTintColor: '#7A8076'}}/>
      <Tabs.Screen name="archive" options={{ headerShown: false, title: 'Archive', tabBarActiveTintColor: '#2D342C', tabBarInactiveTintColor: '#7A8076'}} />
    </Tabs>
  )
}
