import AsyncStorage from "@react-native-async-storage/async-storage";
const TAG = "TallyAsyncStorage";

export const KEYS_ASYNC = {
  USERINFO: "@userInfo",
  REMEMBER_EMAIL: "@rememberEmail",
  ENABLE_AUTHENTICATION: "@enableAuthentication",
};

export const storeUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(KEYS_ASYNC.USERINFO, jsonValue);
  } catch (e) {
    console.error(TAG, e);
  }
};

export const updateClubData = async (value) => {
  try {
    let userData = await getUserData();
    let newData = { ...userData, club: value };

    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(KEYS_ASYNC.USERINFO, jsonValue);
  } catch (e) {
    console.error(TAG, e);
  }
};

export const updateClubImage = async (value) => {
  try {
    let userData = await getUserData();
    let club = userData?.club;
    let newData = { ...userData, club: { ...club, imageUrl: value } };

    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(KEYS_ASYNC.USERINFO, jsonValue);
  } catch (e) {
    console.error(TAG, e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS_ASYNC.USERINFO);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(TAG, e);
  }
};

export const storeRememberMe = async (email) => {
  try {
    await AsyncStorage.setItem(KEYS_ASYNC.REMEMBER_EMAIL, email);
  } catch (e) {
    console.error(TAG, e);
  }
};

export const getRememberedEmail = async () => {
  try {
    const info = await AsyncStorage.getItem(KEYS_ASYNC.REMEMBER_EMAIL);
    return info;
  } catch (e) {
    console.error(TAG, e);
  }
};

export const storeEnableAuthentication = async (isEnabled) => {
  try {
    await AsyncStorage.setItem(
      KEYS_ASYNC.ENABLE_AUTHENTICATION,
      JSON.stringify(isEnabled)
    );
  } catch (e) {
    console.error(TAG, e);
  }
};

export const getEnableAuthentication = async () => {
  try {
    const value = await AsyncStorage.getItem(KEYS_ASYNC.ENABLE_AUTHENTICATION);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (e) {
    console.error(TAG, e);
  }
};

export const clearTallyAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export const clearTallyAsyncStorageWithPrevention = async (
  preventKeys = [KEYS_ASYNC.REMEMBER_EMAIL]
) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys(); // Get all keys
    const keysToDelete = allKeys.filter((key) => !preventKeys.includes(key)); // Filter out the key to preserve

    await Promise.all(
      keysToDelete.map((key) => AsyncStorage.removeItem(key)) // Remove each key except the one to preserve
    );

    console.log("All keys cleared except:", preventKeys);
  } catch (error) {
    console.error("Failed to clear AsyncStorage:", error);
  }
};
