import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import useState from "react-usestateref";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import CalendarSvg from "../../../svgs/CalendarSvg";
import { useColorScheme } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import TallyMultilineTextInput from "../../components/TallyMultilineTextInput";
import TallyTextInput from "../../components/TallyTextInput";
import CustomTextInput from "../../components/CustomTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { getAxiosClient } from "../../apis/TallyApi";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { addEvent } from "../../../redux/EventsReducer";
import EventCreatedSvg from "../../home/events/EventCreatedSvg";
import { useNavigation } from "@react-navigation/native";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import LatoText from "../../auth/LatoText";
import { useEffect, useLayoutEffect } from "react";
import EventFlyerSvg from "../../../svgs/EventFlyerSvg";
import { showAlert } from "../../../utils/Alert";
import { MD2Colors } from "react-native-paper";
import { identifySocialMedia } from "../../../utils/StringUtils";
import DetailHeaderView from "../../components/DetailHeaderView";
import BackArrowButton from "../../components/BackArrowButton";

function BottomSheet({ textToDisplay }) {
  const navigation = useNavigation();
  return (
    <View style={styles.eventCreatedBottomSheet}>
      <View style={styles.eventCreatedPopup}>
        <LatoText style={styles.eventCreatedText}>{textToDisplay}</LatoText>

        <Button height={50} minWidth={"80%"}>
          My Events
        </Button>
      </View>
      <View
        style={{
          width: "100%",
          height: 350,
          position: "absolute",
          alignItems: "center",
        }}
      >
        <EventCreatedSvg
          style={{
            position: "absolute",

            marginBottom: 100,
          }}
          width={100}
          height={100}
        ></EventCreatedSvg>
      </View>
      <Pressable
        style={{
          width: "100%",
          height: 60,
          paddingBottom: 180,
          position: "absolute",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      ></Pressable>
    </View>
  );
}

const CreateEventScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [showbottomSheet, setBottomSheetShown, bottomSheetRef] =
    useState(false);
  const [loading, setIsLoading, loadingRef] = useState(false);
  const [selectedEvent, setSelectedEvent, selectedEventRef] = useState(null);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [eventDetails, setEventDetails, eventRef] = useState({
    eventName: "",
    location: "",
    date: "",
    dateToDisplay: "",
    startTime: "",
    startTimeToDispaly: "",
    endTime: "",
    endTimeToDisplay: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    tiktokUrl: "",
  });
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  const [textToDisplay, setTextToDisplay, textToDisplayRef] = useState(
    "Your event has been created successfully."
  );
  const [imageUri, setImageUri, imageRef] = useState(null);
  const [datePickerShown, setDatePickerShown, datePickerRef] = useState(false);
  const [datePickerMode, setDatePickerMode, datePickerModeRef] = useState({
    mode: "time",
    selectionField: "date",
  });

  useEffect(() => {
    const fetchParams = () => {
      if (route.params && route.params.location) {
        setEventDetails({
          ...eventDetails,
          location: route.params.location,
        });
      } else {
        console.log("CreateEventFunctionalComponent nothing passed");
      }
    };

    fetchParams();
  }, [route]);

  useLayoutEffect(() => {
    const fetchEventDetails = () => {
      if (route.params) {
        setSelectedEvent(route.params.selectedEvent);

        console.log("Fetch Event Details Use Layout Effect", selectedEventRef);

        var momentParsedDate = moment(selectedEventRef.current.endTime);
        var endTimeToDisplay = moment(selectedEventRef.current.endTime).format(
          "dddd, DD MMMM YYYY hh:mm a"
        );

        var momentParsedStartDate = moment(selectedEventRef.current.startTime);
        var startTimeToDisplay = moment(
          selectedEventRef.current.startTime
        ).format("dddd, DD MMMM YYYY hh:mm a");

        setImageUri(selectedEventRef.current.imageUrl);
        setEventDetails({
          ...selectedEventRef.current,
          endTime: momentParsedDate,
          endTimeToDisplay: endTimeToDisplay,
          startTime: momentParsedStartDate,
          startTimeToDispaly: startTimeToDisplay,
          facebookUrl: selectedEventRef.current.socialMedia?.facebookUrl ?? "",
          instagramUrl:
            selectedEventRef.current.socialMedia?.instagramUrl ?? "",
          youtubeUrl: selectedEventRef.current.socialMedia?.youtubeUrl ?? "",
          tiktokUrl: selectedEventRef.current.socialMedia?.tiktokUrl ?? "",
          whatsAppUrl: selectedEventRef.current.socialMedia?.whatsAppUrl ?? "",
        });
      }
    };

    fetchEventDetails();
  }, []);

  if (showbottomSheet) {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEventDetails({ ...eventDetails, eventName: enteredValue });
        break;

      case "description":
        setEventDetails({ ...eventDetails, description: enteredValue });
        break;

      case "location":
        setEventDetails({ ...eventDetails, location: enteredValue });
        break;

      case "facebookUrl":
        setEventDetails({ ...eventDetails, facebookUrl: enteredValue.trim() });
        break;

      case "instagramUrl":
        setEventDetails({ ...eventDetails, instagramUrl: enteredValue.trim() });
        break;

      case "youtubeUrl":
        setEventDetails({ ...eventDetails, youtubeUrl: enteredValue.trim() });
        break;

      case "tiktokUrl":
        setEventDetails({ ...eventDetails, tiktokUrl: enteredValue.trim() });
        break;

      case "whatsAppUrl":
        setEventDetails({ ...eventDetails, whatsAppUrl: enteredValue.trim() });
        break;
    }
  }

  function inputValidations() {
    if (!imageUri) {
      showAlert("Please Select a Event Cover Photo");
      return false;
    }
    return true;
  }

  const performApiCall = async () => {
    if (inputValidations()) {
      try {
        setIsLoading(true);
        let response = await getAxiosClient().post("events", {
          ...eventDetails,
          clubId: currentUser?.club?.id,
        });

        dispatch(addEvent(response.data.payLoad));

        await handleImagePicked(imageUri, response.data.payLoad.signedUrl);

        setIsLoading(false);
        setBottomSheetShown(true);
      } catch (err) {
        let response = parseExpoError(err);
        showAlert(response.message);
        setIsLoading(false);
      } finally {
      }
    }
  };

  const modifyEvent = async () => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().put(
        `events/${selectedEventRef.current.id}`,
        eventDetails
      );

      setTextToDisplay("Your event has been modified.");
      setIsLoading(false);
      setBottomSheetShown(true);
    } catch (err) {
      let errResp = parseExpoError(err);
      showAlert(errResp.message);
      setIsLoading(false);
    } finally {
    }
  };

  const deleteEvent = async () => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().delete(
        `events/${selectedEventRef.current.id}`
      );
      setTextToDisplay("Your event has been deleted.");

      // dispatch(modifyEvent(response.data.payLoad ));
      setIsLoading(false);
      setBottomSheetShown(true);
    } catch (err) {
      let errResp = parseExpoError(err);
      showAlert(errResp.message);
    } finally {
    }
  };

  function dateTimeSelected(val) {
    let date = new Date(val);
    //Local time converted to UTC

    var localOffset = date.getTimezoneOffset() * 60000;

    var localTime = date.getTime();
    var momentParsedDate = moment(localTime).format("DD-MM-YYYY HH:mm");

    switch (datePickerMode.selectionField) {
      case "startTime":
        var momentParsedDate = moment(localTime);
        var endTimeToDisplay = moment(localTime).format(
          "dddd, DD MMMM YYYY hh:mm a"
        );

        setEventDetails({
          ...eventDetails,
          startTime: momentParsedDate,
          date: momentParsedDate,
          startTimeToDispaly: endTimeToDisplay,
        });
        break;

      case "endTime":
        // var momentParsedDate = moment(localTime).format("HH:mm");
        var momentParsedDate = moment(localTime);
        var endTimeToDisplay = moment(localTime).format(
          "dddd, DD MMMM YYYY hh:mm a"
        );
        setEventDetails({
          ...eventDetails,
          endTime: momentParsedDate,
          endTimeToDisplay: endTimeToDisplay,
        });
        break;
    }
    hideDatePicker();
  }

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handleImagePicked = async (result, signedUrl) => {
    try {
      setIsLoading(true);
      let preSignedUrl = signedUrl;
      if (signedUrl == null) {
        let response = await getAxiosClient().get(
          `eventImage/${eventRef.current.id}`
        );
        preSignedUrl = response.data.payLoad.signedUrl;
      }

      const imageExt = "jpg";
      const imageMime = `image/jpg`;
      const img = await fetchImageFromUri(result);
      if (img) {
        console.log("Image Data is somethig");
        await fetch(preSignedUrl, {
          method: "PUT",
          body: img,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
      } else {
        console.log("No Image Data found");
      }
      console.log("handleImagePicked", "Finished Upload image");
    } catch (err) {
      showAlert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    if (Platform.OS === "ios") {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraRollStatus.status !== "granted") {
        showAlert("Permission is required to access photos.");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const manipResult = await manipulateAsync(result.assets[0].uri, [], {
      compress: 0,
      format: SaveFormat.JPEG,
    }).catch((error) => {
      console.log("Error fetching image from local storage ", error);
    });

    setImageUri(manipResult.uri);

    if (eventRef.current.id) {
      console.log("Event id is found direct upload");
      await handleImagePicked(manipResult.uri, null);
    } else {
      console.log("Event id is found Upload with creation");
    }
  };

  function selectDate() {
    setDatePickerMode({
      ...datePickerMode,
      mode: "datetime",
      selectionField: "date",
    });
    setDatePickerShown(true);
  }

  function selectTime() {
    console.log("Start Time");
    if (selectedEvent != null) {
      const date = new Date(selectedEvent.startTime);
      setDatePickerDate(date);
    }
    setDatePickerMode({
      ...datePickerMode,
      mode: "datetime",
      selectionField: "startTime",
    });

    setDatePickerShown(true);
  }

  function selectEndTime() {
    if (selectedEvent != null) {
      const date = new Date(selectedEvent.endTime);
      setDatePickerDate(date);
    } else {
      console.log("Ending Time");

      if (eventDetails.startTime) {
        setDatePickerDate(new Date(eventDetails.startTime));
      } else {
        console.log("Time not selected");
      }
    }
    setDatePickerMode({
      ...datePickerMode,
      mode: "datetime",
      selectionField: "endTime",
    });
    setDatePickerShown(true);
  }

  function hideDatePicker() {
    setDatePickerShown(false);
  }

  function createEventHandler({ update, del }) {
    let errors = "";

    if (eventRef.current.eventName === "") {
      errors += "Event name is required\n";
    }

    if (eventRef.current.location === "") {
      errors += "Location is required\n";
    }

    if (eventRef.current.date === "") {
      errors += "Date is required\n";
    }

    if (eventRef.current.startTime === "") {
      errors += "Start time is required\n";
    }

    if (eventRef.current.endTime === "") {
      errors += "End time is required\n";
    }

    if (eventRef.current.description === "") {
      errors += "Short description is required\n";
    }
   

    if (errors.length === 0) {
      if (update) {
        modifyEvent();
      } else if (del) {
        deleteEvent();
      } else {
        performApiCall();
      }
    } else {
      showAlert(errors);
    }
  }

  const locationSelected = (location) => {
    console.log("Location is selected", location);
  };

  const locateMeHandler = async () => {
    setIsLoading(true);
    try {
      navigation.navigate("PickLocationScreen", {
        navigatedForEvent: true,
      });
    } catch (err) {
      // console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const theme = useColorScheme();


  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.container}
            extraScrollHeight={200}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            enableAutoAutomaticScroll={false}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.scrollContainer}>
              <StatusBar barStyle="light-content" />

              <BackArrowButton />
              <View style={styles.textContainer}>
                <LatoText style={styles.largeText}>
                { "Create an Event / Party"}
                </LatoText>
              </View>
              <View style={styles.topSpace}></View>

              <Loading isLoading={loading}></Loading>
              <DateTimePickerModal
                // isVisible={true}
                date={datePickerDate}
                mode={datePickerMode.mode}
                isVisible={datePickerShown}
                // onConfirm={handleConfirm}
                onConfirm={dateTimeSelected}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
              />

              <View
                style={[styles.leftRightMargin, { justifyContent: "center" }]}
              >
                <CustomTextInput
                  editable={true}
                  placeHolder={"Event name"}
                  value={eventDetails.eventName}
                  onUpdateValue={updateInputValueHandler.bind(this, "name")}
                />
              </View>

              <View
                style={[styles.leftRightMargin, { justifyContent: "center" }]}
              >
                <CustomTextInput
                  marginRight={"26%"}
                  isEditable={false}
                  placeHolder={"Location"}
                  value={eventDetails.location}
                  onUpdateValue={updateInputValueHandler.bind(this, "location")}
                ></CustomTextInput>
                <Pressable
                  onPress={locateMeHandler}
                  style={({ pressed }) => {
                    return [
                      styles.floatingTextButton,
                      pressed && GlobalStyles.pressed,
                    ];
                  }}
                >
                  <LatoText style={styles.pinkTextStyle}>
                    Locate Me
                  </LatoText>
                </Pressable>
              </View>

              {/* <Pressable
                style={({ pressed }) => {
                  return [
                    { justifyContent: "center" },
                    pressed && styles.pressed,
                    styles.leftRightMargin,
                  ];
                }}
                onPress={selectTime}
              >
                <CustomTextInput
                  editable={false}
                  placeHolder={"Date"}
                  value={eventRef.current.startTimeToDispaly}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    "startDateTime"
                  )}
                  rightImage={
                    <Image
                      style={{
                        height: 25,
                        width: 25,
                        resizeMode: "contain",
                      }}
                      source={require("../../../../assets/calendar_icon.png")}
                    />
                  }
                ></CustomTextInput>
              </Pressable> */}

                <Pressable
                  style={({ pressed }) => {
                    return [
                      { justifyContent: "center", },
                      pressed && styles.pressed,
                      styles.leftRightMargin,
                    ];
                  }}
                  onPress={selectTime}
                >
                  <CustomTextInput
                    isEditable={false}
                    placeHolder={"Start Date & Time"}
                    value={eventRef.current.startTimeToDispaly}
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "startDateTime"
                    )}
                    rightImage={
                      <Pressable
                      onPress={selectTime}
                      style={({ pressed }) => {
                        return [
                          { justifyContent: "center",},
                          pressed && styles.pressed,
                          styles.leftRightMargin,
                        ];
                      }}
                      >
                      <Image
                        style={{
                          height: 22,
                          width: 22,
                          resizeMode: "contain",
                        }}
                        source={require("../../../../assets/calendar_icon.png")}
                      /></Pressable>
                    }
                  ></CustomTextInput>
                </Pressable>

                <Pressable
                  style={({ pressed }) => {
                    return [
                      { justifyContent: "center",},
                      pressed && styles.pressed,
                      styles.leftRightMargin,
                    ];
                  }}
                  onPress={selectEndTime}
                >
                  <CustomTextInput
                    isEditable={false}
                    placeHolder={"End Date & Time"}
                    value={eventRef.current.endTimeToDisplay}
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "endDateTime"
                    )}
                    rightImage={
                      <Pressable
                      onPress={selectEndTime}
                      style={({ pressed }) => {
                        return [
                          { justifyContent: "center",},
                          pressed && styles.pressed,
                          styles.leftRightMargin,
                        ];
                      }}
                      >
                      <Image
                        style={{
                          height: 22,
                          width: 22,
                          resizeMode: "contain",
                        }}
                        source={require("../../../../assets/calendar_icon.png")}
                      /></Pressable>
                    }
                  ></CustomTextInput>
                </Pressable>
              {/* </View> */}
              

              <View style={{ justifyContent: "center", paddingHorizontal: 15 }}>
                <CustomTextInput
                  editable={true}
                  placeHolder={"Description"}
                  value={eventDetails.description}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    "description"
                  )}
                  textColor="white"
                  numberOfLines={5}
                  minHeight={120}
                ></CustomTextInput>

                <View style={styles.uploadContainer}>
                  <Pressable
                    onPress={pickImage}
                    style={({ pressed }) => [
                      pressed && GlobalStyles.pressed,
                    ]}
                  >
                    {!imageUri && (
                      <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image
                          style={{
                            height: 63,
                            width: 63,
                            resizeMode: "contain",
                            marginBottom: 8,
                            tintColor: GlobalConsts.Colors.primaryGreen
                          }}
                          source={require("../../../../assets/upload_icon.png")}
                        />
                        <LatoText style={styles.label}>
                          {"Upload your event flyer"}
                        </LatoText>
                      </View>
                    )}
                    {imageUri && (
                      <Image
                        style={{
                          width: 120,
                          height: 120,
                          resizeMode: "cover",
                          borderRadius: 5,
                        }}
                        source={{ uri: imageUri }}
                      ></Image>
                    )}
                  </Pressable>
                </View>
                
              </View>

              <View style={{ marginHorizontal: 20, marginTop: 20, }}>
                {selectedEvent == null && (
                  <Button
                    height={50}
                    onPress={() => {
                      createEventHandler({});
                    }}
                  >
                    Create an Event
                  </Button>
                )}

                {selectedEvent != null && (
                  <>
                    <Button
                      height={50}
                      onPress={() => {
                        createEventHandler({ update: true });
                      }}
                    >
                      Update Event
                    </Button>
                    <Button
                      backgroundColor={"#FF4141"}
                      height={50}
                      style={{ marginTop: 12 }}
                      onPress={() => {
                        createEventHandler({ del: true });
                      }}
                    >
                      Delete Event
                    </Button>
                  </>
                )}
              </View>
            </View>
          
          </KeyboardAwareScrollView>
        </SafeAreaView>
        {showbottomSheet && (
          <BottomSheet textToDisplay={textToDisplay}></BottomSheet>
        )}
        <Loading isLoading={loading} />
      </BackgroundLinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: "5%",
  },
  largeText: {
    fontSize: 30,
    color: "white",
    marginVertical: 9,
    fontWeight: "bold",
    alignSelf: "center",
  },
  floatingTextButton: {
    position: "absolute",
    width: "100%",
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "flex-end",
  },
  floatingIcons: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "flex-end",
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 35,
  },
  pinkTextStyle: {
    color: GlobalConsts.Colors.BACK_BTN,
  },
  pressed: { opacity: 0.7 },
  eventCreatedBottomSheet: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  eventCreatedPopup: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 300,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  eventCreatedText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 25,
  },
  imageContainer: {
    height: 250,
    borderColor: GlobalConsts.Colors.primaryGreenTextColor,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 24,
    marginTop: 20,
    marginRight: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E770E41C",
    overflow: "hidden",
  },
  leftRightMargin: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  leftMargin: {
    paddingLeft: 15,
    marginBottom: 10,
  },
  rightMargin: {
    paddingRight: 15,
    marginBottom: 10,
  },
  topSpace: {
    marginTop: 25,
  },
  uploadContainer: {
    width: "75%",
    height: 130,
    borderRadius: 50,
    backgroundColor: GlobalConsts.Colors.inputTextBackground,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20
  },
  label: {
    color: GlobalConsts.Colors.white,
    fontSize: 16,
    marginLeft: 25,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
});

export default CreateEventScreen;
