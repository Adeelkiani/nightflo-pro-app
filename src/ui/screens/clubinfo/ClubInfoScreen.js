import { View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useState from "react-usestateref";
import { GlobalStyles, GlobalConsts } from "../../../consts/GlobalConsts";
import RootView from "../../components/RootView";
import LatoText from "../../auth/LatoText";
import { LinearGradient } from "expo-linear-gradient";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import { invalid } from "moment";
import { useEffect } from "react";
import { UpdateClubInfo } from "../../apis/EndPoints";
import { getAxiosClient } from "../../apis/TallyApi";
import { storeUserData, updateClubData } from "../../../utils/TallyAsyncStorage";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { showAlert } from "../../../utils/Alert";
import BackArrowButton from "../../components/BackArrowButton";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";
import { updateClubPaymentPlan } from "../../../redux/UserReucer";

const ClubInfoScreen = ({ navigation }) => {
    const [loading, setIsLoading] = useState(false);
    const [clubName, setClubName] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    
    const [inputInvalid, setInputInvalid] = useState({
        clubName: false,
        city: false,
        location: false,
    });
    const {
        isVisible: isMessagePopupVisible,
        data,
        show: showMesagePopup,
        hide: hideMessagePopup,
    } = useModal();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => {
        return state.mUser;
    });
    
    useEffect(() => {
        // Initialize form fields with current user data
        if (currentUser) {
          setClubName(currentUser.club.name);
          setCity(currentUser.club.city);
          setLocation(currentUser.club.location);
        }
      }, [currentUser]);

    function updateInputValueHandler(inputType, enteredValue) {
        console.log(inputType, enteredValue);
        switch (inputType) {
            case "clubName":
                setClubName(enteredValue);
                break;
      
            case "city":
                setCity(enteredValue);
                break;
            
            case "location":
                setLocation(enteredValue);
                break;  
        }
    }

    function onLocateMeHandler() {
        navigation.navigate("PickLocationScreen", {
          isCreatingProfile: true,
          onGoBack: (data) => {
            updateInputValueHandler("location", data.location);
          },
        });
    }

    async function saveChangesHandler() {
        try {
          setIsLoading(true);
          let response = await getAxiosClient().post(UpdateClubInfo, {
            clubId: currentUser.club?.id ?? "",
            name: clubName, 
            city: city,
            location: location

          });
          
          await updateClubData(response.data.payLoad);
          dispatch(updateClubPaymentPlan(response.data.payLoad));

          showMesagePopup(
            {
              title: "Info Updated",
              description: `Your changes have been saved`,
              isTypeError: false,
            },
            MODAL_TYPE.MESSAGE_POPUP
          );
          
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <>
            <RootView loading={loading}>
                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                }}>
                    <BackArrowButton />
                    <ScrollView style={{flex: 1, marginLeft: 16, marginRight: 16}}>
                        <View style={styles.container}>
                            <LatoText style={styles.largeText}>
                                {"Club Info"}
                            </LatoText>
                            
                            <View style={{
                                alignItems: 'center',
                                marginTop: '3%',
                                flex: 1,
                                width: '45%',
                                alignSelf: 'center'
                            }}>
                                <View style={styles.avatarContainer}>
                                    <Image 
                                        source={{uri: currentUser.club.imageUrl}}
                                        style={styles.avatar}
                                        />
                                </View>
                                <View style={styles.editIcon}>
                                    <Image
                                        style={{
                                            height: 16,
                                            width: 16,
                                            resizeMode: "contain",
                                        }}
                                        source={require("../../../../assets/edit_icon.png")}
                                    />
                                </View>
                            </View>
                            <View style={{margin: '5%'}}></View>
                            <View style={{flex: 1,}}>
                                <View>
                                    <LatoText style={styles.label}>Club/Venue Name</LatoText>
                                    <CustomTextInput
                                    placeHolder="Club/Venue Name"
                                    value={clubName}
                                    onUpdateValue={updateInputValueHandler.bind(this, "clubName")}
                                    keyboardType="default"
                                    isInvalid={inputInvalid.clubName}
                                    rightImage={
                                        <Image
                                        style={{
                                            height: 18,
                                            width: 22,
                                            resizeMode: "contain",
                                        }}
                                        source={require("../../../../assets/home_icon.png")}
                                        />
                                    }
                                    />
                                    <View style={styles.space}></View>
                                </View>
                                
                                <View>
                                    <LatoText style={styles.label}>Location (City)</LatoText>
                                    <CustomTextInput
                                        placeHolder="City"
                                        onUpdateValue={updateInputValueHandler.bind(this, "city")}
                                        value={city}
                                        keyboardType="default"
                                        isInvalid={inputInvalid.city}
                                        rightImage={
                                        <Image
                                            style={{
                                            height: 18,
                                            width: 22,
                                            resizeMode: "contain",
                                            }}
                                            source={require("../../../../assets/city_icon.png")}
                                        />
                                        }
                                    />
                                    <View style={styles.space}></View>
                                </View>

                                <View>
                                    <LatoText style={styles.label}>Locate Me</LatoText>
                                    <CustomTextInput
                                        placeHolder="Locate Me"
                                        isEditable={false}
                                        value={location}
                                        keyboardType="default"
                                        isInvalid={inputInvalid.location}
                                        pressableCallback={onLocateMeHandler}
                                        rightImage={
                                        <Pressable
                                            onPress={onLocateMeHandler}
                                            style={({ pressed }) => {
                                            return [
                                                styles.floatingTextButton,
                                                { justifyContent: "center" },
                                                pressed && GlobalStyles.pressed,
                                            ];
                                            }}
                                        >
                                            <Image
                                            style={{
                                                height: 18,
                                                width: 22,
                                                resizeMode: "contain",
                                            }}
                                            source={require("../../../../assets/search_icon.png")}
                                            />
                                        </Pressable>
                                        }
                                    />

                                    <View style={styles.space}></View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.buttons}>
                        <Button height={60} onPress={saveChangesHandler}>
                        {"Save"}
                        </Button>
                    </View>
                </View>
                <MessagePopup
                    visible={isMessagePopupVisible}
                    onClose={() => {
                        if (navigation?.canGoBack()) {
                        navigation.goBack();
                        }
                        hideMessagePopup();
                    }}
                    title={data?.title}
                    description={data?.description}
                    isTypeError={data?.isTypeError}
                />
            </RootView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "2%",
    },
    largeText: {
        fontSize: 28,
        color: GlobalConsts.Colors.primaryHeadingColor,
        fontWeight: "bold",
        alignSelf: "center",
    },
    
    avatarContainer: {
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'white',
        zIndex: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    editIcon: {
        position: 'absolute',
        bottom: 10,
        right: 25,
        zIndex: 3,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: GlobalConsts.Colors.white,
        fontSize: 18,
        marginLeft: 25,
        marginBottom: 2
    },
    space: { margin: 8 },
    buttons: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
    },
});

export default ClubInfoScreen;