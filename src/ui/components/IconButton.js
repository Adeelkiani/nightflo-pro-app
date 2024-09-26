import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LatoText from "../auth/LatoText";

function IconButton({ text, icon, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <MaterialIcons name={icon} size={24} color="black" />
        <View style={styles.buttonTextContainer}>
          <LatoText style={styles.buttonText}>{text}</LatoText>
        </View>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    minHeight: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
