import { View, StyleSheet } from "react-native";
import { GlobalConsts } from "../../consts/GlobalConsts";
import { MD2Colors, TextInput } from "react-native-paper";

function CustomLoginTextInput({
  placeHolder,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
  leftImage,
  rightImage,
  activeOutlineColor = GlobalConsts.Colors.primaryGreen,
  backgroundColor = GlobalConsts.Colors.black,
  placeHolderColor = GlobalConsts.Colors.placeHolder,
  textColor = GlobalConsts.Colors.white,
  marginHorizontal = 0,
  marginVertical = 0,
}) {
  function renderIconContainer() {
    return <View style={styles.iconContainer}>{rightImage}</View>;
  }

  return (
    <View
      style={[
        styles.inputContainer,
        style,
        { marginHorizontal, marginVertical },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { minHeight: 60, backgroundColor: backgroundColor },
        ]}
        autoCapitalize={"none"}
        label={""}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholderTextColor={placeHolderColor}
        mode="outlined"
        activeOutlineColor={
          isInvalid ? GlobalConsts.Colors.RED : activeOutlineColor
        }
        outlineColor={isInvalid ? GlobalConsts.Colors.RED : MD2Colors.white}
        textColor={textColor}
        outlineStyle={{
          borderRadius: 25,
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
      />
    </View>
  );
}

export default CustomLoginTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
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
    fontFamily: "Lato_400Regular",
    height: 60,
    justifyContent: "center",
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
  },
  containerSeparator: {
    width: 2,
    height: "90%",
    backgroundColor: GlobalConsts.Colors.gray500,
    marginHorizontal: 5,
  },
});
