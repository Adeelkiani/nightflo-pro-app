import { Pressable, StyleSheet} from "react-native";

import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";
import { LinearGradient } from "expo-linear-gradient";

function FabButton({
  onPress,
  height = 65,
  disabled,
  width = 65,
  style,
  borderRadius = 32,

}) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        style,
        GlobalStyles.fab,
        pressed && styles.pressed,
        disabled && styles.disabled,
        { justifyContent: "center" },
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={[GlobalConsts.Colors.PRIMARY_GRADIENT_1, GlobalConsts.Colors.PRIMARY_GRADIENT_2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fabStyle, 
          {
            height: height,
            width: width,
            borderRadius: borderRadius,
          },
        ]}
        >
          <LatoText style={[GlobalStyles.fabText, {color: '#000'}]}>+</LatoText>
        </LinearGradient>
    </Pressable>
  );
}

export default FabButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.3,
  },
  fabStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
