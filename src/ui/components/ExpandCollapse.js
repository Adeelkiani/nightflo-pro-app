import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LatoText from "../auth/LatoText";
import { GlobalConsts } from "../../consts/GlobalConsts";

const ExpandCollapse = ({
  id,
  title,
  priceDuration,
  features,
  onSelect,
  isExpanded,
  currentUser,
  onEditPressed,
  onSharePressed,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;

  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;

  const toggleExpandCollapse = () => {
    if (expanded) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
      }).start();
      onSelect(id);
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    Animated.timing(animatedController, {
      duration: 300,
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const contentHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80], // Adjust the max height according to your content
  });

  const contentOpacity = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Adjust opacity values as needed
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelect(id)}>
        <LinearGradient
          colors={["#00F0C5", "#008A71"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 24,
                width: 24,
                resizeMode: "contain",
              }}
              source={
                isExpanded
                  ? require("../../../assets/plan_pkg_active_icon.png")
                  : require("../../../assets/plan_pkg_inactive_icon.png")
              }
            />
            <LatoText
              style={{
                color: GlobalConsts.Colors.black,
                marginLeft: 4,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {title}
            </LatoText>
          </View>
          <View style={{ alignSelf: "center" }}>
            <LatoText
              style={{
                color: GlobalConsts.Colors.white,
                fontSize: 16,
              }}
            >
              {priceDuration}
            </LatoText>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              {(isClubOwner || isAdmin) && onEditPressed && (
                <Pressable onPress={() => onEditPressed()}>
                  <Image
                    style={{
                      marginTop: 3,
                      height: 24,
                      width: 24,
                      resizeMode: "contain",
                      tintColor: "black",
                    }}
                    source={require("../../../assets/edit_icon.png")}
                  />
                </Pressable>
              )}
              {onSharePressed != null && (
                <Pressable onPress={() => onSharePressed()}>
                  <Image
                    style={{
                      marginLeft: 8,
                      marginTop: 3,
                      height: 24,
                      width: 24,
                      resizeMode: "contain",
                      tintColor: "black",
                    }}
                    source={require("../../../assets/share_icon.png")}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: contentOpacity,
            height: isExpanded ? contentHeight + 15 : 15,
            marginTop: isExpanded ? -6 : -10,
          },
        ]}
      >
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          {features.map((feature, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 8,
                    marginTop: 7,
                    marginBottom: 7,
                  }}
                >
                  <View style={styles.listBullet}></View>
                  <LatoText style={{ color: GlobalConsts.Colors.white }}>
                    {feature}
                  </LatoText>
                </View>
                {features.length != index + 1 && (
                  <View style={styles.divider}></View>
                )}
              </View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    minHeight: 60,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  animatedContainer: {
    overflow: "hidden",
    borderColor: GlobalConsts.Colors.primaryGreen,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  listBullet: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  divider: {
    backgroundColor: GlobalConsts.Colors.primaryDivider,
    height: 0.9,
    width: "97%",
  },
});

export default ExpandCollapse;
