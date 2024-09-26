import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { MD2Colors } from "react-native-paper";
import { GlobalConsts } from "../../consts/GlobalConsts";

const SearchBarView = ({
  searchPlaceHolder = "Search here...",
  onTextChange,
  reset = false,
}) => {
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const updateSearch = (search) => {
    setSearch(search);
    if (onTextChange) {
      onTextChange(search);
    }
  };

  useEffect(() => {
    if (reset) {
      updateSearch("");
      setShowSearchBar(false);
    }
    return () => {};
  }, [reset]);

  return (
    <View style={styles.container}>
      {showSearchBar && (
        <SearchBar
          platform={"ios"}
          placeholder={searchPlaceHolder}
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.textStyle}
          cancelButtonProps={styles.cancelButton}
          onCancel={() => {
            setShowSearchBar(false);
          }}
        />
      )}
      {!showSearchBar && (
        <TouchableOpacity onPress={() => setShowSearchBar(!showSearchBar)}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={26}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    alignSelf: "flex-end",
    paddingHorizontal: 5,
  },
  searchBarContainerStyle: {
    flex: 1,
    backgroundColor: MD2Colors.transparent,
    height: 50,
  },
  inputContainerStyle: {
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255 , 255 , 0.1)",
    borderRadius: 9,
    marginHorizontal: 4,
    borderColor: "rgba(255, 255 , 255 , 0.2)",
    borderWidth: 0.5,
  },
  textStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Lato_400Regular",
  },
  cancelButton: {
    color: GlobalConsts.Colors.primaryGreenTextColor,
  },
});

export default SearchBarView;
