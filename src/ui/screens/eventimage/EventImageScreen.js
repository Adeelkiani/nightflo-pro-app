import { useFocusEffect } from "@react-navigation/native"
import moment from "moment"
import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
} from "react-native"
import { GlobalStyles } from "../../../consts/GlobalConsts"
import LatoText from "../../auth/LatoText"
import BackButton from "../../components/BackButton"
import RootView from "../../components/RootView"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import Loading from "../../components/Loading"
const EventImageScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <RootView>
        <View style={styles.container}>
          <BackButton></BackButton>

          <View style={styles.placesContainer}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                marginTop: 12,
                resizeMode: "contain",
                borderRadius: 12,
              }}
              source={{
                uri: route.params.imageUrl,
                cache: "force-cache",
              }}
              onLoad={() => {
                console.log("Image Loading Complete")
                setLoading(false)
              }}
              onError={() => {
                setLoading(false)
              }}></Image>
          </View>
          <Loading
            isLoading={loading}
            marginTop={50}></Loading>
        </View>
      </RootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  placesContainer: {
    marginLeft: 12,
    marginRight: 12,
    flex: 1,
  },
})

export default EventImageScreen
