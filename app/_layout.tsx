import { setupNotifications } from "@/services/notificationService";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  // Calls setupNotifications when the app is first loaded to ensure notification permissions are requested and set up.
  useEffect( () => {setupNotifications()}, [] );

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
