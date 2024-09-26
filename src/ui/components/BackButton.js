import { Pressable, StyleSheet, Text, View } from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import LatoText from "../auth/LatoText"

function BackButton({ onPress, customText }) {
  const navigation = useNavigation()
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        if (!onPress) {
          if (navigation.canGoBack()) {
            navigation.goBack()
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            })
          }
        } else {
          onPress()
        }
      }}>
      <Ionicons
        name="chevron-back"
        size={18}
        color="#F182D2"
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 8,
          marginRight: 8,
        }}
      />
      <View style={styles.textContainer}>
        <LatoText style={styles.textStyle}>
          {customText ? customText : "Back"}
        </LatoText>
      </View>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "#F182D2",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    borderRadius: 21,
    backgroundColor: "rgba(214, 84, 255, 0.3)",
    elevation: 2,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginLeft: 20,
    minHeight: 30,
    maxHeight: 30,
    minWidth: 90,
    maxWidth: 90,
    alignContent: "center",
    marginTop: 20,
    paddingVertical: 6,
  },
  pressed: {
    opacity: 0.7,
  },
})
