import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useContext, useEffect } from "react";

import CardsContextProvider, { CardsContext } from "@/context/CardsContext";
import {
  MARK_AS_READ_ACTION,
  setupNotifications,
} from "@/services/notificationService";

function NotificationListener() {
  // @ts-ignore
  const { readPressed } = useContext(CardsContext);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.actionIdentifier === MARK_AS_READ_ACTION) {
          const word = response.notification.request.content.data?.word;
          if (word) {
            readPressed(word);
          }
        }
      },
    );

    return () => subscription.remove();
  }, [readPressed]);

  return null;
}

export default function RootLayout() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <CardsContextProvider>
      <NotificationListener />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CardsContextProvider>
  );
}
