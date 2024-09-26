import { View, Text, TextInput, StyleSheet } from "react-native";

// const [hasEmailErrors, setEmailErrors] = useState(true);
import { Colors, MD2Colors } from "react-native-paper";
const TallyTextInput = ({
  placeHolder,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  editable = true,
  invalidInput,
  minWidth,
  marginRight,
  style,
  maxLength,
  textColor = MD2Colors.white,
  borderRadius = 8,
}) => {
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        <TextInput
          style={[
            styles.input,
            {
              minHeight: 50,
              color: textColor,
              paddingRight: marginRight,
              borderRadius: borderRadius,
            },
            minWidth && { minWidth: minWidth },
            invalidInput && styles.inputInvalid,
            style,
          ]}
          //   placeholder={placeHolder}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholderTextColor={"#ffffff33"}
          label="Email"
          mode="outlined"
          textContentType="none"
          returnKeyType="done"
          maxLength={maxLength}
          editable={editable}
        ></TextInput>
      </View>
    </>
  );
};

export default TallyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255 , 255 , 0.1)",
    fontSize: 16,
    color: "white",
    borderColor: "rgba(255, 255 , 255 , 0.2)",
    borderWidth: 0.5,
    fontFamily: "Lato_400Regular",
  },
  inputInvalid: {
    borderColor: "rgba(255, 0 , 0 , 0.3)",
  },
});
