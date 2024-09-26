import { ExpoError } from "./ExpoError";

import { clearTallyAsyncStorage } from "./TallyAsyncStorage";
import { logoutUser } from "../redux/UserReucer";
import { tallyStore } from "../redux/Store";

function clearSession() {
  console.error("User token is invalid logging out");
  clearTallyAsyncStorage();
  tallyStore.dispatch(logoutUser());
}

export function parseExpoError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.error("Expo Error Parser Response Error ", error.message);
    if (error.response.data) {
      console.error("Expo Error Parser Response Error ", error.response.data);
      console.error("Expo Error Parser Response Error ", error.response.status);
      if (error.response.status === 401) {
        clearSession();
        return new ExpoError(
          401,
          "Your session has expired. Please login again"
        );
      }

      if (error.response.status === 426) {
        clearSession();
      }

      console.error(
        "Expo Error Parser Response Error ",
        error.response.headers
      );
      return new ExpoError(
        error.response.status,
        error.response.data.message?.replace("Error:", "")
      );
    } else {
      console.error("Expo Error Parser No response Error ", error);
      return new ExpoError(404, error.message);
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error("Expo Error Parser Request Error", error.request);
    return new ExpoError(404, "Something went wrong.");
  } else {
    // Something happened in setting up the request that triggered an Error

    console.error("Expo Error Parser  Error ", error);
    return new ExpoError(404, "Something went wrong.");
  }
}
