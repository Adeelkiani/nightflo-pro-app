import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalConsts } from "../../consts/GlobalConsts";
import { SvgIcons } from "../../svgs";
import { TextInput } from "react-native";
import GreyContainerView from "./GreyContainerView";
import GrayBoxIconButton from "./GrayBoxIconButton";

const SearchView = ({
  placeholder = "Search here...",
  onUpdateValue,
  value,
  height = 50,
  marginVertical = 0,
  marginHorizontal = 15,
  marginTop = 0,
  onClearText,
}) => {
  return (
    <View
      style={[
        styles.searchBarContainer,
        { height, marginVertical, marginHorizontal, marginTop },
      ]}
    >
      <SvgIcons.SearchSvg color={GlobalConsts.Colors.transparent60} />
      <TextInput
        style={{
          flex: 1,
          paddingLeft: 15,
          paddingRight: 10,
          color: "white",
          height: "100%",
        }}
        editable={true}
        placeholder={placeholder}
        value={value}
        onChangeText={onUpdateValue}
        placeholderTextColor={GlobalConsts.Colors.transparent60}
        clearButtonMode="always"
      />
      {onClearText && (
        <GrayBoxIconButton
          assetIcon={
            <SvgIcons.CrossSvg color={GlobalConsts.Colors.white} size={24} />
          }
          width={30}
          height={30}
          borderRadius={15}
          onPress={()=>{
            
            onClearText();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    minHeight: 30,
    maxHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: GlobalConsts.Colors.transparent10,
    fontSize: 16,
    marginHorizontal: 15,
    color: "white",
    borderRadius: 5,
    fontFamily: "Lato_400Regular",
    borderColor: GlobalConsts.Colors.iron,
    borderWidth: 1,
  },
});

export default SearchView;
