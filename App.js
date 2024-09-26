import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/ui/screens/landing/LandingScreen";
import LoginScreen from "./src/ui/screens/login/LoginScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { tallyStore } from "./src/redux/Store";
import SignupScreen from "./src/ui/screens/signup/SignupScreen";
import RoleScreen from "./src/ui/role/RoleScreen";
import UserInfoScreen from "./src/ui/screens/userinfo/UserInfoScreen";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import OtpScreen from "./src/ui/screens/otp/OtpScreen";
import EventsScreen from "./src/ui/home/EventsScreen";
import PromotersScreen from "./src/ui/home/PromotersScreen";
import SettingsScreens from "./src/ui/home/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as ScreenOrientation from "expo-screen-orientation";
import { getUserData } from "./src/utils/TallyAsyncStorage";
import { modifyuser } from "./src/redux/UserReucer";
import DoorTeamScreen from "./src/ui/home/DoorTeamScreen";
import CreateEventScreen from "./src/ui/screens/createevent/CreateEventScreen";
import SettingsActiveMenuSvg from "./src/svgs/SettingsActiveMenuSvg";
import InviteTeam from "./src/ui/home/invite/InviteTeam";
import EventDetailsScreen from "./src/ui/screens/eventdetails/EventDetailsScreen";
import BackgroundLinearGradient from "./src/ui/components/BackgroundLinearGradient";
import Loading from "./src/ui/components/Loading";
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/lato";
import ManageOrganizersScreen from "./src/ui/screens/manageorganizers/ManageOrganizersScreen";
import RequestScreen from "./src/ui/screens/requests/RequestScreen";
import RequestMenuSvg from "./src/svgs/RequestMenuSvg";
import ProfileScreen from "./src/ui/screens/profile/ProfileScreen";
import PickLocationScreen from "./src/ui/screens/picklocation/PickLocationScreen";
import EventImageScreen from "./src/ui/screens/eventimage/EventImageScreen";
import ForgotPasswordScreen from "./src/ui/screens/forgotpassword/ForgotPassword";
import AppErrorModal from "./src/ui/components/AppErrorModal";
import AppSuccesModal from "./src/ui/components/AppSuccesModal";

import ManageStaffScreen from "./src/ui/screens/managestaff/ManageStaffScreen";
import InviteStaff from "./src/ui/screens/managestaff/InviteStaff";
import {
  GuestListRoute,
  GuestListSettingsRoute,
  OTPScreenRoute,
  VerifyInvitesRoute,
} from "./src/consts/NavigationConsts";
import { MANAGE_ROLES_TEXT } from "./src/ui/role/ConstRoles";
import StaffScreen from "./src/ui/home/StaffScreen";
import { GlobalConsts, GlobalStyles } from "./src/consts/GlobalConsts";
import { Image } from "react-native";
import { AssetImages } from "./assets";
import AdminScreenScreen from "./src/ui/home/AdminScreen";
import PaymentPlanScreen from "./src/ui/screens/payments/PaymentPlanScreen";
import ClubInfoScreen from "./src/ui/screens/clubinfo/ClubInfoScreen";
import TicketAndTableScreen from "./src/ui/screens/ticketandtable/TicketAndTableScreen";
import CreateTicketAndTableScreen from "./src/ui/screens/ticketandtable/CreateTicketAndTableScreen";
import EventSummaryScreen from "./src/ui/screens/eventdetails/summary/EventSummaryScreen";
import SummaryDetailScreen from "./src/ui/screens/eventdetails/summary/SummaryDetailScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function HomeScreen({ route }) {
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  const { requestCount } = useSelector((state) => {
    return state.requests;
  });

  const isClubOwner = currentUser?.isClubOwner;
  const isAdmin = currentUser?.isAdmin;

  if (currentUser.token) {
    if (!isClubOwner) {
      return (
        <BottomTabs.Navigator
          screenOptions={({ navigation }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#272E40",
              position: "absolute",
              height: 90,
            },
            tabBarActiveTintColor: GlobalConsts.Colors.primaryGreen,
            tabBarInactiveTintColor: "white",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "Lato_400Regular",
              marginTop: 2,
            },
          })}
        >
          <BottomTabs.Screen
            name="RecentExpenses"
            component={EventsScreen}
            options={{
              title: "Events",
              tabBarLabel: "Events",
              tabBarIcon: ({ color, size, focused }) => (
                <Image
                  source={AssetImages.eventIcon}
                  style={
                    focused
                      ? GlobalStyles.bottomTabImageActive
                      : GlobalStyles.bottomTabImageInActive
                  }
                />
              ),
            }}
          ></BottomTabs.Screen>

          <BottomTabs.Screen
            name="RequestScreen"
            component={RequestScreen}
            options={{
              title: "Requests",
              tabBarLabel: "Requests",
              tabBarIcon: ({ color, size }) => (
                <RequestMenuSvg
                  height={size}
                  width={size}
                  color={color}
                ></RequestMenuSvg>
              ),
              tabBarBadge: requestCount > 0 ? requestCount : null,
            }}
          />

          <BottomTabs.Screen
            name="Settings"
            component={SettingsScreens}
            options={{
              title: "Settings",
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size, focused }) => (
                <SettingsActiveMenuSvg
                  height={size}
                  width={size}
                  color={color}
                />
              ),
            }}
          />
        </BottomTabs.Navigator>
      );
    }

    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#272E40",
            position: "absolute",
            height: 90,
          },
          tabBarActiveTintColor: GlobalConsts.Colors.primaryGreen,
          tabBarInactiveTintColor: GlobalConsts.Colors.pinBall,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Lato_400Regular",
            marginTop: 2,
          },
        })}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={EventsScreen}
          options={{
            title: "Events",
            tabBarLabel: "Events",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={AssetImages.eventIcon}
                style={
                  focused
                    ? GlobalStyles.bottomTabImageActive
                    : GlobalStyles.bottomTabImageInActive
                }
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="Admin"
          component={AdminScreenScreen}
          options={{
            title: "Admin",
            tabBarLabel: "Admin",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={AssetImages.adminIcon}
                style={
                  focused
                    ? GlobalStyles.bottomTabImageActive
                    : GlobalStyles.bottomTabImageInActive
                }
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="DoorTeam"
          component={DoorTeamScreen}
          options={{
            title: "Door Team",
            tabBarLabel: "Door Team",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={AssetImages.doorteam}
                style={
                  focused
                    ? GlobalStyles.bottomTabImageActive
                    : GlobalStyles.bottomTabImageInActive
                }
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="Promoters"
          component={PromotersScreen}
          options={{
            title: "Promoters",
            tabBarLabel: "Promoters",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={AssetImages.promoterTabIcon}
                style={
                  focused
                    ? GlobalStyles.bottomTabImageActive
                    : GlobalStyles.bottomTabImageInActive
                }
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="Staff"
          component={StaffScreen}
          options={{
            title: "Team",
            tabBarLabel: "Team",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={AssetImages.teamIcon}
                style={
                  focused
                    ? GlobalStyles.bottomTabImageActive
                    : GlobalStyles.bottomTabImageInActive
                }
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="Settings"
          component={SettingsScreens}
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <SettingsActiveMenuSvg height={size} width={size} color={color} />
            ),
          }}
        ></BottomTabs.Screen>
      </BottomTabs.Navigator>
    );
  } else {
    return <></>;
  }
}

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        let userInfo = await getUserData();
        setUserData({ ...userInfo });
        await changeScreenOrientation();
        await Asset.loadAsync([require("./assets/background_color.png")]);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setFontsReady(true);
      }
    }

    prepare();
  }, []);

  if (fontsReady) {
    return (
      <BackgroundLinearGradient>
        <SafeAreaProvider>
          <Provider store={tallyStore}>
            <NavigationContainer>
              <Root
                userData={userData}
                setLoading={setIsLoading}
                fontsLoaded={fontsLoaded}
              ></Root>
              <AppErrorModal></AppErrorModal>
              <AppSuccesModal></AppSuccesModal>
            </NavigationContainer>
          </Provider>
          {/* <OrientationLoadingOverlay
            visible={false}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
          r
            /> */}
          <Loading isLoading={loading}></Loading>
        </SafeAreaProvider>
      </BackgroundLinearGradient>
    );
  } else {
    return null;
  }
}

function Root({ userData, setLoading, fontsLoaded }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  useEffect(() => {
    async function fetchToken() {
      setTimeout(async () => {
        console.log("Timeout has occured for splash");
        if (userData) {
          setLoading(false);
        }
      }, 1000);

      setTimeout(async () => {
        dispatch(modifyuser({ ...userData }));
      }, 1500);
    }

    if (fontsLoaded) {
      console.log("Fonts has been loaded");
      fetchToken();
    } else {
      console.log("Waiting for fonts to be loaded");
    }
  }, [fontsLoaded]);

  if (currentUser.token) {
    if (currentUser.isVerified) {
      return <HomeStack currentUser={currentUser}></HomeStack>;
    } else {
      const isStaffRole = Object.keys(MANAGE_ROLES_TEXT).includes(
        currentUser.userType
      );
      if (!currentUser.profileComplete && isStaffRole) {
        return <>{<StaffProfileStack></StaffProfileStack>}</>;
      } else {
        return <OTPStack />;
      }
    }
  } else {
    return <>{<AuthenticationStack></AuthenticationStack>}</>;
  }
}

function AuthenticationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "white",
        contentStyle: {},
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="LandingScreen"
        component={LandingScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupScreen"
        component={SignupScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="RoleScreen"
        component={RoleScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="UserInfoScreen"
        component={UserInfoScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="OtpScreen"
        component={OtpScreen}
      />

      <Stack.Screen
        name="PickLocationScreen"
        component={PickLocationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function StaffProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "GlobalConsts.Colors.PURPLE_GRADIENT_1",
        },
        headerTintColor: "white",
        contentStyle: {},
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="StaffOtpScreen"
        component={OtpScreen}
      />

      <Stack.Screen
        name="StaffPickLocationScreen"
        component={PickLocationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function OTPStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalConsts.Colors.PURPLE_GRADIENT_1,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="OtpScreen"
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
}

function HomeStack({ currentUser }) {
  console.log("Home Stack Returned");
  return (
    <Stack.Navigator
      key={"HomeStack"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "GlobalConsts.Colors.PURPLE_GRADIENT_1",
        },
        headerTintColor: "white",
        contentStyle: {},
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        user={currentUser}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InviteTeam"
        component={InviteTeam}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ManageOraganizers"
        component={ManageOrganizersScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EventSummaryScreen"
        component={EventSummaryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SummaryDetailScreen"
        component={SummaryDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PickLocationScreen"
        component={PickLocationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EventImageScreen"
        component={EventImageScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ManageStaffScreen"
        component={ManageStaffScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InviteStaffScreen"
        component={InviteStaff}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={GuestListRoute.name}
        component={GuestListRoute.component}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PaymentPlanScreen"
        component={PaymentPlanScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ClubInfoScreen"
        component={ClubInfoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TicketAndTableScreen"
        component={TicketAndTableScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateTicketAndTableScreen"
        component={CreateTicketAndTableScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
