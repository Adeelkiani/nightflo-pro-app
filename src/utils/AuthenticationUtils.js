import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { storeEnableAuthentication } from "./TallyAsyncStorage";

export async function saveCredentials(username, password) {
  try {
    let oldCredentials = await getCredentials();

    if (oldCredentials) {
      if (
        oldCredentials.username !== username ||
        oldCredentials.password !== password
      ) {
        await storeEnableAuthentication(false);
      }
    }
    await SecureStore.setItemAsync("username", username, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
    await SecureStore.setItemAsync("password", password, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
    console.log("Credentials saved");
  } catch (error) {
    console.log("Error saving credentials", error);
  }
}

export async function getCredentials() {
  try {
    const username = await SecureStore.getItemAsync("username", {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
    const password = await SecureStore.getItemAsync("password", {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });

    if (username && password) {
      console.log("Credentials successfully loaded");
      return { username, password };
    } else {
      console.log("No credentials stored");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving credentials", error);
    return null;
  }
}

export async function authenticate() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to Sign-In automatically",
    });

    return result.success;
  } else {
    alert("Biometric authentication not available");
    return false;
  }
}
