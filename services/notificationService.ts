import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const NOTIFICATION_CATEGORY = "NEW_WORD";
export const MARK_AS_READ_ACTION = "MARK_AS_READ";

// Ensures notifications pop up when the app is in the foreground as well as background.
// This is called in the _layout component to set up notification handling when the app is first loaded.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const registerNotificationCategory = async () => {
  await Notifications.setNotificationCategoryAsync(NOTIFICATION_CATEGORY, [
    {
      identifier: MARK_AS_READ_ACTION,
      buttonTitle: "Mark as read",
      options: {
        opensAppToForeground: true,
      },
    },
  ]);
};

// Requests and validates notification permissions. Returns true if permission granted, else false.
export const setupNotifications = async (): Promise<boolean> => {
  const isPhysical = Device.isDevice;

  if (!isPhysical && !__DEV__) {
    console.log("Notifications are only available on physical devices");
    return false;
  }

  // Check existing notification permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // If existing permissions are not granted, request permissions from the user
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If permissions are still not granted, log and return false
  if (finalStatus !== "granted") {
    console.log("Failed to get notification permissions");
    return false;
  }

  registerNotificationCategory();

  return true;
};

export const meaningsForNotification = (
  meanings: Record<string, string[]>,
): string => {
  const maxDefinitions = 2;

  return Object.entries(meanings)
    .map(([pos, definitions]) => {
      const truncated = definitions.slice(0, maxDefinitions);
      const suffix = definitions.length > maxDefinitions ? " …" : "";
      return `${pos}: ${truncated.join("; ")}${suffix}`;
    })
    .join("\n\n");
};
