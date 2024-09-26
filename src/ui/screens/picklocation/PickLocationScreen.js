import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";
import RootView from "../../components/RootView";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BackArrowButton from "../../components/BackArrowButton";
const PickLocationScreen = ({ navigation, route }) => {
  const screen = route.params.screen;
  const { onGoBack } = route.params;
  const isCreatingProfile = route.params.isCreatingProfile;

  return (
    <>
      <RootView>
        <View style={styles.container}>
          <BackArrowButton />
          <LatoText
            style={[GlobalStyles.heading, { marginTop: 20, marginBottom: 20 }]}
          >
            {"Choose your location"}
          </LatoText>

          <View style={styles.placesContainer}>
            <GooglePlacesAutocomplete
              styles={{
                description: {
                  color: GlobalConsts.Colors.black,
                  fontSize: 15,
                  fontFamily: "Lato_400Regular",
                },
                textInput: {
                  color: GlobalConsts.Colors.white,
                  fontSize: 16,
                  fontFamily: "Lato_400Regular",
                  height: 60,
                  backgroundColor: GlobalConsts.Colors.black,
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 25,
                  placeholderTextColor: "#f0f",
                },
                poweredContainer: {
                  backgroundColor: GlobalConsts.Colors.primaryGreen50,
                },
                separator: {
                  height: 1,
                  backgroundColor: "#FFFFFF88",
                },
                row: { height: 50 },
              }}
              placeholder={"Search for Locations"}
              textInputProps={{
                placeholderTextColor: GlobalConsts.Colors.placeHolder,
              }}
              onPress={(data, details = null) => {
                if (!isCreatingProfile) {
                  if (screen) {
                    navigation.navigate(screen, {
                      location: data.description,
                    });
                    return;
                  }

                  navigation.navigate("CreateEventScreen", {
                    location: data.description,
                  });
                } else {
                  if (onGoBack) {
                    onGoBack({ location: data.description });
                  }
                  navigation.goBack();
                }
              }}
              query={{
                key: "AIzaSyCdo-ZRv9yxJOJaTmoylNpG43OmOOkyhQ8",
                language: "en",
                types: "",
              }}
            />
          </View>
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  placesContainer: {
    marginLeft: 12,
    marginRight: 12,
    flex: 1,
  },
});

export default PickLocationScreen;
