import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackgroundLinearGradient from "./BackgroundLinearGradient";

import Loading from "./Loading";

const RootViewKeyboard = ({ children, loading }) => {
  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.container}
            extraScrollHeight={100}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            enableAutoAutomaticScroll={false}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.scrollContainer}>
              <StatusBar barStyle="light-content" />
              {children}

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
  scrollContainer: { height: Dimensions.get("window").height * 1 },
});

export default RootViewKeyboard;
