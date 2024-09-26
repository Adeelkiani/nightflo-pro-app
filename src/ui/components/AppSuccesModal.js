import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import FancyAlert from "./FancyAlert";
import { clearError } from "../../redux/ErrorsReducer";
import { GlobalConsts } from "../../consts/GlobalConsts";

const AppSuccessModal = () => {
  const dispatch = useDispatch();
  const { successVisible, message, title, buttonText } = useSelector(
    (state) => state.error
  );

  const onRequestClose = React.useCallback(() => {
    // dispatch(ErrorCreators.hideError());
  }, [dispatch]);

  const onPress = () => {
    dispatch(clearError({}));
  };

  return (
    <FancyAlert
      style={styles.alert}
      icon={
        <View style={[styles.icon, { borderRadius: 32 }]}>
          <Ionicons name={"checkmark"} size={36} color="#FFFFFF" />
        </View>
      }
      onRequestClose={onRequestClose}
      visible={successVisible}
    >
      <View style={styles.content}>
        <Text style={styles.contentText}>{message ? message : ""}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={onPress}
        >
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </FancyAlert>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: "#EEEEEE",
  },
  icon: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: "center",
  },
  btn: {
    borderRadius: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 8,
    alignSelf: "stretch",
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    marginTop: 16,
    minWidth: "80%",
    paddingHorizontal: 16,
  },
  btnText: {
    color: "#FFFFFF",
  },
});

export default AppSuccessModal;
