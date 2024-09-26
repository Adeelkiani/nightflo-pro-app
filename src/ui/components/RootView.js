import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StatusBar, View } from "react-native";
import { GlobalStyles } from "../../consts/GlobalConsts";
import BackgroundLinearGradient from "./BackgroundLinearGradient";
import Loading from "./Loading";

const RootView = ({ children, loading }) => {
  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={GlobalStyles.container}>
          <StatusBar barStyle="light-content" />

          <View style={{ width: "100%", height: "100%" }}>{children}</View>
          <Loading isLoading={loading}></Loading>
        </SafeAreaView>
      </BackgroundLinearGradient>
    </>
  );
};

export default RootView;
