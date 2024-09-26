import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import { GlobalStyles } from "../../consts/GlobalConsts";
import { ConstRoles } from "./ConstRoles";
import RoleItem from "./role-item/RoleItem";
import { useSelector } from "react-redux";
import BackgroundLinearGradient from "../components/BackgroundLinearGradient";
import RootView from "../components/RootView";
import LatoText from "../auth/LatoText";
import BackArrowButton from "../components/BackArrowButton";

function renderRoleItem(itemData) {
  return <RoleItem {...itemData.item}></RoleItem>;
}

const RoleScreen = () => {
  const roles = ConstRoles;

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  return (
    <>
      <RootView>
        <BackArrowButton />
        <View style={styles.textContainer}>
          <LatoText style={styles.textHeading}>Who are you?</LatoText>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.listContainer}>
            <View style={[GlobalStyles.row, { paddingHorizontal: 15 }]}>
              <RoleItem
                id={roles[0].id}
                description={roles[0].description}
                image={roles[0].image}
                type={roles[0].type}
              />
              <RoleItem
                id={roles[1].id}
                description={roles[1].description}
                image={roles[1].image}
                type={roles[1].type}
              />
            </View>

            <View style={[GlobalStyles.row, { paddingHorizontal: 15 }]}>
              <RoleItem
                id={roles[2].id}
                description={roles[2].description}
                image={roles[2].image}
                type={roles[2].type}
              />
              <RoleItem
                id={roles[3].id}
                description={roles[3].description}
                image={roles[3].image}
                type={roles[3].type}
              />
            </View>
          </View>
        </ScrollView>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: { flex: 1 },
  textHeading: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 9,
  },
  textDesc: { color: "white", fontSize: 16 },
  listStyle: { width: "100%" },
  topSpace: {
    marginTop: 25,
  },
});

export default RoleScreen;
