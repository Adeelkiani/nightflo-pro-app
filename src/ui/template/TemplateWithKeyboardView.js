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
  Dimensions,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import BackButton from "../components/BackButton";
import BackgroundLinearGradient from "../components/BackgroundLinearGradient";
import Loading from "../components/Loading";

const TemplateWithKeyboardView = () => {
  const [loading, setIsLoading] = useState(false);
  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.container}
            extraScrollHeight={300}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.scrollContainer}>
              <StatusBar barStyle="light-content" />
              <View>
                <BackButton></BackButton>
              </View>

              <Loading isLoading={loading}></Loading>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </BackgroundLinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: { height: Dimensions.get("window").height * 0.9 },
  backButtonContainer: {
    flex: 3,
  },
  evenDetailsContainer: {
    height: 60,
    flex: 7,
    justifyContent: "space-evenly",
  },
  eventHeadingText: {
    fontSize: 18,
    color: GlobalConsts.Colors.primaryGreenTextColor,
  },
});

export default TemplateWithKeyboardView;
