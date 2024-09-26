import { Pressable } from "react-native";
import { GlobalStyles } from "../../consts/GlobalConsts";

export const PressableView = ({ children, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && GlobalStyles.pressed,
        {
          flex: 1,
          alignItems: "center",
          width: 50,
          marginRight: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
