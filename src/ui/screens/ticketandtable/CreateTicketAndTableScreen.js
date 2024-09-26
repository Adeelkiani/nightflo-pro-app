import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useState from "react-usestateref";
import { GlobalConsts } from "../../../consts/GlobalConsts";
import RootView from "../../components/RootView";
import { useEffect } from "react";
import { getAxiosClient } from "../../apis/TallyApi";
import { showAlert } from "../../../utils/Alert";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import React from "react";

import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";

import {
  CreateTable,
  CreateTicket,
  UpdateTable,
  UpdateTicket,
} from "../../apis/EndPoints";
import {
  addEventTicket,
  updateEventTicket,
} from "../../../redux/EventTicketsReducer";
import {
  addEventTable,
  updateEventTable,
} from "../../../redux/EventTablesReducer";
import BackArrowButton from "../../components/BackArrowButton";
import LatoText from "../../auth/LatoText";
import CustomTextInput from "../../components/CustomTextInput";
import CustomFlatTextInput from "../../components/CustomFlatTextInput";
import Button from "../../components/Button";

const CreateTicketAndTableScreen = ({ route, navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const selectedEvent = route.params?.event;
  const eventId = route.params.event.id;
  const isTicket = route.params.isTicket;
  const isUpdate = route.params.isUpdate;
  const eventItem = route.params.eventItem;
  const [inputInvalid, setInputInvalid] = useState({
    nameOrNumber: false,
    price: false,
    description: false,
  });

  const {
    isVisible: isMessagePopupVisible,
    data,
    show: showMesagePopup,
    hide: hideMessagePopup,
  } = useModal();

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  useEffect(() => {
    // Initialize form fields with eventItem data
    if (isUpdate && eventItem) {
      setValues({
        nameOrNumber: eventItem.name ?? eventItem.tableNumber,
        price: eventItem.price.toString(),
        description1: eventItem.description[0] ?? "",
        description2: eventItem.description[1] ?? "",
        description3: eventItem.description[2] ?? "",
      });
    }
  }, [eventItem, isUpdate, isTicket]);

  const submitHandler = async () => {
    if (isTicket) {
      isUpdate ? updateTicket() : addTicket();
    } else {
      isUpdate ? updateTable() : addTable();
    }
  };

  const setDiscriptionArray = async () => {
    let descriptions = [];
    if (
      values.description1 != undefined &&
      values.description1.toString().trim() != ""
    ) {
      descriptions.push(values.description1);
    }
    if (
      values.description2 != undefined &&
      values.description2.toString().trim() != ""
    ) {
      descriptions.push(values.description2);
    }
    if (
      values.description3 != undefined &&
      values.description3.toString().trim() != ""
    ) {
      descriptions.push(values.description3);
    }

    return descriptions;
  };

  const addTicket = async () => {
    let isValidated = await validateData();
    if (!isValidated) {
      return;
    }

    try {
      setIsLoading(true);
      let descriptions = await setDiscriptionArray();

      let response = await getAxiosClient().post(CreateTicket, {
        name: values.nameOrNumber,
        price: values.price,
        description: descriptions,
        eventId: eventId,
      });

      if (response.data.status == "Success") {
        dispatch(addEventTicket(response.data.payLoad));
        showMesagePopup(
          {
            title: "Ticket Added",
            description: `You have created new ticket ${values.nameOrNumber}`,
            isTypeError: false,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      }
    } catch (err) {
      console.log("ERROR: ", err);
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async () => {
    let isValidated = await validateData();
    if (!isValidated) {
      return;
    }

    try {
      setIsLoading(true);
      let descriptions = await setDiscriptionArray();

      let response = await getAxiosClient().post(UpdateTicket, {
        name: values.nameOrNumber,
        price: values.price,
        description: descriptions,
        ticketId: eventItem.id,
      });

      if (response.data.status == "Success") {
        dispatch(updateEventTicket(response.data.payLoad));
        showMesagePopup(
          {
            title: "Ticket Updated",
            description: `You have updated the ${values.nameOrNumber} ticket`,
            isTypeError: false,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      }
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTable = async () => {
    let isValidated = await validateData();
    if (!isValidated) {
      return;
    }

    try {
      setIsLoading(true);
      let descriptions = await setDiscriptionArray();

      let response = await getAxiosClient().post(CreateTable, {
        tableNumber: values.nameOrNumber,
        price: values.price,
        description: descriptions,
        eventId: eventId,
      });

      console.log(response);
      if (response.data.status == "Success") {
        dispatch(addEventTable(response.data.payLoad));
        showMesagePopup(
          {
            title: "Table Added",
            description: `You have created new table ${values.nameOrNumber}`,
            isTypeError: false,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      }
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTable = async () => {
    let isValidated = await validateData();
    if (!isValidated) {
      return;
    }

    try {
      setIsLoading(true);
      let descriptions = await setDiscriptionArray();

      let response = await getAxiosClient().post(UpdateTable, {
        tableNumber: values.nameOrNumber,
        price: values.price,
        description: descriptions,
        tableId: eventItem.id,
      });

      console.log(response);
      if (response.data.status == "Success") {
        dispatch(updateEventTable(response.data.payLoad));
        showMesagePopup(
          {
            title: "Table Updated",
            description: `You have updated the ${values.nameOrNumber} table`,
            isTypeError: false,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      }
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateData = async () => {
    let pricePattern = /^\d+(\.\d+)?$/;
    let nameOrNumberIsValid = values.nameOrNumber?.trim().length >= 2;
    let priceIsValid = pricePattern.test(values.price);
    let descriptionIsValid =
      values.description1?.trim().length > 0 ||
      values.description2?.trim().length > 0 ||
      values.description3?.trim().length > 0;

    setInputInvalid({
      nameOrNumber: !nameOrNumberIsValid,
      price: !priceIsValid,
      description: !descriptionIsValid,
    });

    if (!nameOrNumberIsValid) {
      showAlert(
        (isTicket ? "Ticket name" : "Table number") + " field is required"
      );
      return false;
    }

    if (values.price == undefined || values.price == 0) {
      showAlert("Price field is required");
      return false;
    }

    if (!priceIsValid) {
      showAlert("Invalid Price field");
      return false;
    }

    if (!descriptionIsValid) {
      showAlert("Description field is required");
      return false;
    }

    return true;
  };

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "nameOrNumber":
        setValues({ ...values, nameOrNumber: enteredValue });
        break;

      case "price":
        setValues({ ...values, price: enteredValue.trim() });
        break;

      case "description1":
        setValues({ ...values, description1: enteredValue });
        break;

      case "description2":
        setValues({ ...values, description2: enteredValue });
        break;

      case "description3":
        setValues({ ...values, description3: enteredValue });
        break;
    }
  }

  return (
    <>
      <RootView loading={loading}>
        <View style={{ flex: 1 }}>
          <BackArrowButton />
          <ScrollView style={styles.container}>
            <LatoText style={styles.largeText}>
              {isTicket
                ? isUpdate
                  ? "Update Ticket"
                  : "Add new Ticket"
                : isUpdate
                ? "Update Table"
                : "Add new Table"}
            </LatoText>

            <View style={{ marginTop: 30 }}>
              <View>
                <LatoText style={styles.label}>
                  {isTicket ? "Ticket Name" : "Table Number"}
                </LatoText>
                <CustomTextInput
                  placeHolder={isTicket ? "Ticket Name" : "Table Number"}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    "nameOrNumber"
                  )}
                  value={values.nameOrNumber}
                  isInvalid={inputInvalid.nameOrNumber}
                  keyboardType="default"
                />
                <View style={styles.space}></View>
              </View>

              <View>
                <LatoText style={styles.label}>
                  {isTicket ? "Ticket" : "Table"} Price
                </LatoText>
                <CustomTextInput
                  placeHolder={isTicket ? "Ticket Price" : "Table Price"}
                  onUpdateValue={updateInputValueHandler.bind(this, "price")}
                  value={values.price}
                  isInvalid={inputInvalid.price}
                  keyboardType="default"
                />
                <View style={styles.space}></View>
              </View>

              <View>
                <LatoText style={styles.label}>Description</LatoText>
                <View
                  style={[
                    styles.descriptionContainer,
                    {
                      borderColor: inputInvalid.description
                        ? GlobalConsts.Colors.RED
                        : "transparent",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <CustomFlatTextInput
                    style={{
                      width: "94%",
                    }}
                    minHeight={40}
                    placeholder={"Line 1"}
                    keyboardType={"default"}
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "description1"
                    )}
                    value={values.description1}
                    leftImage={
                      <LatoText style={{ color: "white", fontSize: 16 }}>
                        {"1)"}
                      </LatoText>
                    }
                  />
                  <CustomFlatTextInput
                    style={{
                      width: "94%",
                    }}
                    minHeight={40}
                    placeholder={"Line 2"}
                    keyboardType={"default"}
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "description2"
                    )}
                    value={values.description2}
                    leftImage={
                      <LatoText style={{ color: "white", fontSize: 16 }}>
                        {"2)"}
                      </LatoText>
                    }
                  />
                  <CustomFlatTextInput
                    style={{
                      width: "94%",
                    }}
                    minHeight={40}
                    placeholder={"Line 3"}
                    keyboardType={"default"}
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "description3"
                    )}
                    value={values.description3}
                    leftImage={
                      <LatoText style={{ color: "white", fontSize: 16 }}>
                        {"3)"}
                      </LatoText>
                    }
                  />
                </View>
                <View style={styles.space}></View>
              </View>
            </View>

            <View style={{ marginTop: "30%" }}></View>
            <View style={styles.saveButton}>
              <Button height={60} onPress={submitHandler}>
                {"Confirm"}
              </Button>
            </View>
          </ScrollView>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginLeft: 16,
    marginRight: 16,
  },
  buttons: {
    margin: 16,
    paddingHorizontal: 4,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 6,
  },
  largeText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  listBullet: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
  },
  label: {
    color: GlobalConsts.Colors.white,
    fontSize: 16,
    marginLeft: 25,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  space: { margin: 5 },
  descriptionContainer: {
    width: "98%",
    borderRadius: 24,
    backgroundColor: GlobalConsts.Colors.inputTextBackground,
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 16,
  },
});

export default CreateTicketAndTableScreen;
