import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import { useState } from "react";
const TallyMultilineTextInput = ({
  placeHolder,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  editable,
  invalidInput,
  style,
  backgroundColor = GlobalConsts.Colors.primaryGreen05,
  borderColor = GlobalConsts.Colors.primaryGreen,
  borderWidth = 1,
  borderRadius = 5,
  placeHolderColor = "#FFFFFF33",
  textColor = GlobalConsts.Colors.black,
}) => {
  return (
    <>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor, borderColor, borderWidth, borderRadius },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { minHeight: 200, color: textColor },
            style,
            invalidInput && styles.inputInvalid,
          ]}
          autoCapitalize={"none"}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholderTextColor={placeHolderColor}
          label="Email"
          mode="outlined"
          textContentType="none"
          returnKeyType="done"
          editable={editable}
          multiline={true}
          numberOfLines={5}
        ></TextInput>
      </View>
    </>
  );
};

export default TallyMultilineTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 9,
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },
  inputInvalid: {
    borderColor: "rgba(255, 0 , 0 , 0.3)",
  },
});
