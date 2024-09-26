import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalConsts } from "../../../consts/GlobalConsts";
const EventOrganizersItem = ({
  gradientArray = [
    GlobalConsts.Colors.gray2A,
    GlobalConsts.Colors.gray2A,
  ],
  children,
}) => {
  return (
    <>
      <View
        style={{
          width: "100%",
          minHeight: 130,
          paddingHorizontal: 18,
          marginTop: 20,
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={gradientArray}
          style={{ width: "100%", flex: 1, borderRadius: 22}}
          start={[0, 0.5]}
          end={[1, 1]}
          borderRadius={22}
        >
          {children}
        </LinearGradient>
      </View>
    </>
  );
};

export default EventOrganizersItem;
