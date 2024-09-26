import { View, StyleSheet, Pressable } from "react-native";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import { MD2Colors, TextInput } from "react-native-paper";

function CustomTextInput({
  placeHolder,
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
  leftImage,
  rightImage,
  activeOutlineColor = GlobalConsts.Colors.primaryGreen,
  inActiveOutlineColor = "transparent",
  backgroundColor = GlobalConsts.Colors.inputTextBackground,
  placeHolderColor = GlobalConsts.Colors.placeHolder,
  textColor = GlobalConsts.Colors.white,
  isEditable = true,
  pressableCallback,
  marginTop = 0,
  marginBottom = 0,
  numberOfLines = 1,
  minHeight = 60,
}) {
  function renderIconContainer() {
    return <View style={styles.iconContainer}>{rightImage}</View>;
  }

  function renderInputText() {
    return (
      <TextInput
        style={[
          styles.input,
          {
            minHeight: minHeight,
            backgroundColor: backgroundColor,
            marginTop,
            marginBottom,
          },
        ]}
        autoCapitalize={"none"}
        label={label}
        onPress={() => {
          if (pressableCallback) {
            pressableCallback();
          }
        }}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholderTextColor={placeHolderColor}
        mode="outlined"
        editable={isEditable && !pressableCallback}
        activeOutlineColor={
          isInvalid ? GlobalConsts.Colors.RED : activeOutlineColor
        }
        outlineColor={
          isInvalid ? GlobalConsts.Colors.RED : inActiveOutlineColor
        }
        textColor={textColor}
        outlineStyle={{
          borderRadius: 30,
        }}
        left={
          leftImage != null && (
            <TextInput.Icon icon={() => renderIconContainer()} />
          )
        }
        right={
          rightImage != null && (
            <TextInput.Icon icon={() => renderIconContainer()} />
          )
        }
        multiline={numberOfLines > 1}
        numberOfLines={numberOfLines}
      />
    );
  }

  return (
    <View style={[styles.inputContainer, style]}>{renderInputText()}</View>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 0,
    alignContent: "center",
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalConsts.Colors.error500,
  },
  input: {
    fontSize: 16,
    marginHorizontal: 2,
    color: "white",
    fontFamily: "Poppins",
    height: 65,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputInvalid: {
    backgroundColor: "rgba(255, 0 , 0 , 0.2)",
  },
  iconContainer: {
    flexDirection: "row",
    width: 60,
    height: "100%",
    // paddingTop: 8,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  containerSeparator: {
    width: 2,
    height: "90%",
    backgroundColor: GlobalConsts.Colors.gray500,
    marginHorizontal: 5,
  },
});
