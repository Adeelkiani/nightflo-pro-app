import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../../consts/GlobalConsts";
import Loading from "../components/Loading";
import { LinearGradient } from "expo-linear-gradient";
const TemplateScreen = () => {
  const [loading, setIsLoading] = useState(false);
  return (
    <>
      <LinearGradient
        colors={["#36214d", "#1e1c33", "#263941"]}
        start={[0, 0.5]}
        end={[1, 1]}
        style={GlobalStyles.backgroundContainer}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View></View>
          <Loading isLoading={loading}></Loading>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TemplateScreen;
