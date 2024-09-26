import { StyleSheet, View } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { GlobalConsts } from "../../consts/GlobalConsts";
const Loading = ({ isLoading, marginTop = 0 }) => {
  return (
    <>
      {isLoading && (
        <View style={[styles.container, { marginTop: marginTop }]}>
          <BarIndicator count={5} color={GlobalConsts.Colors.primaryGreen} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Loading;
