import { setError, setMessage } from "../redux/ErrorsReducer";
import { tallyStore } from "../redux/Store";
import { Alert, Linking } from "react-native";

export function showAlert(message) {
  // alert(message);

  tallyStore.dispatch(
    setError({
      message: message,
      errorVisible: true,
    })
  );
}

export function showSuccessAlert(message) {
  // alert(message);
  tallyStore.dispatch(
    setMessage({
      message: message,
      successVisible: true,
    })
  );
}

export function showPermissionDialog() {
  Alert.alert(
    "Camera Permission Required",
    "Please enable camera permission from settings for NightfloPro in order to scan check-in",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Open Settings",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]
  );
}

export function showAssignTypeDialog({
  description = "Please assign type to this guest before final check-out",
  onCompsPressed,
  onReducePressed,
}) {
  Alert.alert("Assign type", description, [
    {
      text: "COMP",
      onPress: () => {
        if (onCompsPressed) {
          onCompsPressed();
        }
      },
    },
    {
      text: "REDUCE",
      onPress: () => {
        if (onReducePressed) {
          onReducePressed();
        }
      },
    },
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "destructive",
    },
  ]);
}

export function showAssignTypeByPromoterDialog({
  description = "Are you sure you want to assign comps out of your quota to this guest?.",
  onContinuePressed,
  title = "Assign Type",
}) {
  Alert.alert(title, description, [
    {
      text: "Continue",
      onPress: () => {
        if (onContinuePressed) {
          onContinuePressed();
        }
      },
    },
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "destructive",
    },
  ]);
}

export function showConfirmationDialog({
  description = "Are you sure you want to cancel this ticket?.",
  onContinuePressed,
  title = "Warning!",
  hideCancelButton = false,
  positveText = "Continue",
  negativeText = "Cancel",
}) {
  Alert.alert(title, description, [
    {
      text: positveText,
      onPress: () => {
        if (onContinuePressed) {
          onContinuePressed();
        }
      },
      style: "destructive",
    },
    !hideCancelButton && {
      text: negativeText,
      onPress: () => console.log("Cancel Pressed"),
    },
  ]);
}
