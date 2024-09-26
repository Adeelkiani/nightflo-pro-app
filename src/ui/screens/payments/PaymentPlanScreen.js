import { View, StyleSheet, Pressable, RefreshControl } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useDispatch, useSelector } from "react-redux";
import useState from "react-usestateref";
import { GlobalStyles, GlobalConsts } from "../../../consts/GlobalConsts";
import RootView from "../../components/RootView";
import ExpandCollapse from "../../components/ExpandCollapse";
import { useFocusEffect } from "@react-navigation/native";
import { setPlans } from "../../../redux/PaymentsReducer";
import { useCallback, useEffect } from "react";
import { getAxiosClient } from "../../apis/TallyApi";
import {
  GetMyClubAPI,
  GetPaymentPlans,
  SubscribeToPlanAPI,
} from "../../apis/EndPoints";
import LatoText from "../../auth/LatoText";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import { showAlert, showConfirmationDialog } from "../../../utils/Alert";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import BackArrowButton from "../../components/BackArrowButton";
import React from "react";
import { FlatList } from "react-native";
import EmptyDataView from "../../components/EmptyDataView";
import { updateClubPaymentPlan } from "../../../redux/UserReucer";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";
import {
  getUserData,
  storeUserData,
  updateClubData,
} from "../../../utils/TallyAsyncStorage";
import {
  initPaymentSheet,
  initStripe,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { err } from "react-native-svg";

const PaymentPlanScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAgreed, setAgreed] = useState(false);
  const [selectedPlan, setPlan] = useState(null);
  const [counter, setCounter] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false);
  const {
    isVisible: isMessagePopupVisible,
    data,
    show: showMesagePopup,
    hide: hideMessagePopup,
  } = useModal();

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  let plans = useSelector((state) => {
    return state.plans.plans;
  });

  let club = currentUser?.club ?? {};

  useFocusEffect(
    React.useCallback(() => {
      async function performApiCall() {
        try {
          setIsLoading(true);
          let response = await getAxiosClient().get(GetPaymentPlans);
          if (response.data.payLoad) {
            dispatch(setPlans(response.data.payLoad));
          }
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setIsLoading(false);
          setRefreshing(false);
        }
      }

      performApiCall();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [counter])
  );

  async function purchasePlan(plan) {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().post(SubscribeToPlanAPI, {
        planId: plan.id,
        clubId: club?.id ?? "",
      });
      await updateClubData(response.data.payLoad);
      dispatch(updateClubPaymentPlan(response.data.payLoad));
      showMesagePopup(
        {
          title: "Plan subscribed",
          description: `You are subscribed to ${plan.planName}`,
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

  async function subscribePlan(plan) {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().post(SubscribeToPlanAPI, {
        planId: plan.id,
        clubId: club?.id ?? "",
      });
      initializePaymentSheet(response.data.payLoad);
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  }

  function purchasePlanHandler() {
    if (selectedPlan) {
      if (isAgreed) {
        showConfirmationDialog({
          description: `Are you sure you want to subscribe to ${selectedPlan.planName} plan?`,
          title: "Subscribe Plan",
          onContinuePressed: async () => {
            subscribePlan(selectedPlan);
          },
        });
      } else {
        showAlert("Please agree terms and conditions");
      }
    } else {
      showAlert("Please selecte a plan you want to subscribe");
    }
  }

  async function initializePaymentSheet(payload) {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: payload.clientSecret,
      merchantDisplayName: "Nightflo",
      allowsDelayedPaymentMethods: true,
    });
    if (error) {
      console.error("Error while creating payment sheet: ", error);
    }

    await initStripe({
      publishableKey: payload.publishableKey,
    });

    openPaymentSheet(payload.intentId);
  }

  const openPaymentSheet = async (intentId) => {
    const { error, paymentOption } = await presentPaymentSheet();
    console.log("payResponse: ", paymentOption);

    if (error) {
      //Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      await getAxiosClient()
        .get(GetMyClubAPI)
        .then(async (response) => {
          const data = response.data.payLoad;
          await updateClubData(data);
          dispatch(updateClubPaymentPlan(data));
          showMesagePopup(
            {
              title: "Plan subscribed",
              description: `You are subscribed to ${
                data.plan?.planName ?? "plan"
              }`,
              isTypeError: false,
            },
            MODAL_TYPE.MESSAGE_POPUP
          );
        })
        .catch((err) => {
          console.error("Unable to fetch my club information", err);
        });
    }
  };

  function onRefresh() {
    setRefreshing(true);
    setCounter(counter + 1);
  }

  function renderFlatList() {
    return (
      <FlatList
        style={styles.flatList}
        data={filteredPlans}
        renderItem={(item, index) => {
          return renderPlanItem(item.item);
        }}
        keyExtractor={(item, index) => {
          return item.id + index;
        }}
        ListEmptyComponent={<EmptyDataView />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={"white"}
          />
        }
      />
    );
  }
  function renderPlanItem(plan) {
    return (
      <View>
        <ExpandCollapse
          key={plan?.id ?? 0}
          title={plan.planName}
          priceDuration={`Dh ${plan.planPrice}/${
            plan.isMonthly ? "Monthly" : "Annually"
          }`}
          features={plan.features}
          onSelect={() => {
            setPlan(plan);
          }}
          isExpanded={selectedPlan?.id === plan.id}
          currentUser={currentUser}
        />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View style={styles.listBullet}></View>
          <View style={styles.listBullet}></View>
          <View style={styles.listBullet}></View>
        </View>
      </View>
    );
  }

  const filteredPlans = plans.filter((plan) =>
    selectedIndex === 0 ? plan.isMonthly === false : plan.isMonthly === true
  );

  return (
    <>
      <RootView loading={loading}>
        <BackArrowButton color={GlobalConsts.Colors.primaryGreen} />
        <View style={styles.container}>
          <LatoText style={styles.largeText}>
            {"Select your Payment Plan"}
          </LatoText>
          <SegmentedControlTab
            style={{ height: 50 }}
            values={["Annually", "Monthly"]}
            borderRadius={8}
            tabsContainerStyle={GlobalStyles.tabsContainerStyle}
            tabStyle={GlobalStyles.tabStyle}
            tabTextStyle={GlobalStyles.tabTextStyle}
            activeTabTextStyle={GlobalStyles.activeTabTextStyle}
            activeTabStyle={GlobalStyles.activeTabStyle}
            tabdis
            enabled={true}
            selectedIndex={selectedIndex}
            onTabPress={(index) => {
              setSelectedIndex(index);
              setPlan(null);
            }}
          />

          {renderFlatList()}
        </View>
        <View>
          <View style={styles.termsSection}>
            <Checkbox
              style={styles.checkbox}
              value={isAgreed}
              onValueChange={setAgreed}
              color={isAgreed ? GlobalConsts.Colors.primaryGreen : undefined}
            />
            <LatoText style={styles.termsText} maxLines={2}>
              {"I agree to terms and conditions for the package plans."}
              <LatoText
                style={{
                  color: GlobalConsts.Colors.primaryGreen,
                  fontSize: 12,
                }}
              >
                View
              </LatoText>
            </LatoText>
          </View>
          <View style={styles.buttons}>
            <Button
              height={60}
              onPress={purchasePlanHandler}
              disabled={!isAgreed}
            >
              {"Proceed For Payment"}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
  },
  listBullet: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
  },
  buttons: {
    margin: 16,
    paddingHorizontal: 4,
  },
  checkbox: {
    margin: 8,
    borderColor: GlobalConsts.Colors.white,
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  termsSection: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  termsText: {
    color: GlobalConsts.Colors.white,
    fontSize: 12,
    fontFamily: "Poppins",
  },
  largeText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  noPlansText: {
    alignSelf: "center",
    color: GlobalConsts.Colors.white,
    fontSize: 20,
    marginTop: 25,
  },
});

export default PaymentPlanScreen;
