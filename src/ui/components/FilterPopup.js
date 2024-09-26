import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors, List, MD2Colors, RadioButton } from "react-native-paper";
import { GlobalConsts } from "../../consts/GlobalConsts";
import CustomRadioButton from "./CustomRadioButton";
import { LinearGradient } from "expo-linear-gradient";
import FlatButtonWithBorder from "./FlatButtonWithBorder";
import LatoText from "../auth/LatoText";
import Button from "./Button";

const FilterPopup = ({
  title = "Sort By",
  defaultFilter = "RSVP date",
  options = ["RSVP date", "Guest by A-Z", "Promoter by A-Z"],
  onApplyPressed,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  return (
    <View style={{ ...styles.container }}>
      <View style={{ flex: 1 }}>
        <LatoText style={styles.heading}>{title}</LatoText>
        <RadioButton.Group
          onValueChange={(newValue) => setSelectedFilter(newValue)}
          value={selectedFilter}
        >
          <ScrollView style={styles.radioGroupStyle}>
            {options.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
              >
                <CustomRadioButton
                  color={GlobalConsts.Colors.primaryGreen}
                  key={filter}
                  selected={selectedFilter === filter}
                  onPress={() => setSelectedFilter(filter)}
                  label={filter}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </RadioButton.Group>
        <Button
          onPress={() => {
            if (onApplyPressed) {
              onApplyPressed(selectedFilter);
            }
          }}
          borderRadius={5}
          marginLeft={25}
          marginRight={25}
        >
          <LatoText>Apply Filter</LatoText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 300,
    backgroundColor: GlobalConsts.Colors.white,
    marginTop:
      Dimensions.get("window").height / 2 - Dimensions.get("window").height / 2,
    marginLeft: Dimensions.get("window").width / 2 - 175,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  radioGroupStyle: {
    margin: 20,
  },
  radioButton: {
    backgroundColor: MD2Colors.white,
  },
  heading: {
    fontSize: 20,
    color: GlobalConsts.Colors.black,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Lato_700Bold",
    marginTop: 20,
  },
});

export default FilterPopup;
