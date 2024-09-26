import { Pressable, StyleSheet } from "react-native";
import { SvgIcons } from "../../svgs";
import { GlobalConsts } from "../../consts/GlobalConsts";

function CloseIconButton({
  onPress,
  height = 30,
  marginLeft = 0,
  marginRight = 15,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          height: height,
          width: height,
          marginLeft,
          marginRight,
          borderRadius: height / 2,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <SvgIcons.CrossSvg />
    </Pressable>
  );
}

export default CloseIconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalConsts.Colors.white,
    borderColor: GlobalConsts.Colors.SLATE_GRAY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  pressed: {
    opacity: 0.7,
  },
});
