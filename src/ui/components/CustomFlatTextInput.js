import { View, StyleSheet, Pressable } from "react-native";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import { MD2Colors, TextInput } from "react-native-paper";

function CustomFlatTextInput({
  placeHolder,
  label,
  keyboardType,
  secure = false,
  onUpdateValue,
  value,
  isInvalid,
  style,
  leftImage,
  rightImage,
  activeOutlineColor = GlobalConsts.Colors.primaryDivider,
  inActiveOutlineColor = GlobalConsts.Colors.primaryDivider,
  backgroundColor = GlobalConsts.Colors.inputTextBackground,
  placeHolderColor = GlobalConsts.Colors.placeHolder,
  textColor = GlobalConsts.Colors.white,
  isEditable = true,
  pressableCallback,
  marginTop = 0,
  marginBottom = 0,
  numberOfLines = 1,
  minHeight = 40,
}) {
  function renderIconContainer() {
    return <View style={styles.iconContainer}>{leftImage}</View>;
  }

  function renderInputText() {
    return (
      <TextInput
        style={[
          styles.input,
          {
            height: minHeight,
            backgroundColor: backgroundColor,
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
        mode="flat"
        editable={isEditable && !pressableCallback}
        activeUnderlineColor={
          isInvalid ? GlobalConsts.Colors.RED : activeOutlineColor
        }
        underlineColor={
          isInvalid ? GlobalConsts.Colors.RED : inActiveOutlineColor
        }
        textColor={textColor}
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

export default CustomFlatTextInput;

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
    color: "white",
    fontFamily: "Poppins",
  },
  inputInvalid: {
    backgroundColor: "rgba(255, 0 , 0 , 0.2)",
  },
  iconContainer: {
    flexDirection: "row",
    width: 60,
    height: "100%",
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingRight: 10,
  },
  containerSeparator: {
    width: 2,
    height: "90%",
    backgroundColor: GlobalConsts.Colors.gray500,
    marginHorizontal: 5,
  },
});
