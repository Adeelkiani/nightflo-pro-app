import { Platform, StyleSheet } from "react-native";
const TallyKeyboardView = ({ children }) => {
  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        extraScrollHeight={300}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAwareScrollView>
    </>
  );
};

export default TallyKeyboardView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
