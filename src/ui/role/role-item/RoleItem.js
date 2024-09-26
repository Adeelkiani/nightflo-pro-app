import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalConsts } from "../../../consts/GlobalConsts";
import { useDispatch } from "react-redux";
import { modifyuser } from "../../../redux/UserReucer";
import LatoText from "../../auth/LatoText";

const RoleItem = ({
  id,
  description,
  image,
  type,
  typeToDisplay,
  height = 180,
  fontSize = 20,
  onRolePressHandler,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function rolePressedHandler() {
    if (onRolePressHandler) {
      onRolePressHandler();
    } else {
      navigation.navigate("SignupScreen", { userType: type });
    }
  }
  return (
    <>
      <Pressable onPress={rolePressedHandler} style={[styles.container]}>
        <View style={styles.roleItem}>
          <View style={[styles.mainContainer, { height: height }]}>
            <Image style={[styles.image]} source={image}></Image>
            <LatoText style={[styles.textDesc, { fontSize: fontSize }]}>
              {description}
            </LatoText>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default RoleItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
  roleItem: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: GlobalConsts.Colors.roleBackgroundView,
    borderRadius: 24,
    elevation: 3,
    shadowColor: GlobalConsts.Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  image: {
    justifyContent: "center",
    resizeMode: "contain",
    height: 60,
    width: "60%",
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 12,
    tintColor: GlobalConsts.Colors.primaryGreen,
  },
  textDesc: {
    color: "white",
    marginTop: 8,
    textAlign: "center",
    width: "90%",
  },
});
