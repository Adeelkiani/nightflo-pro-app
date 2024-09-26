import React, { useState } from "react";
import { Modal, View, Text, Image, StyleSheet } from "react-native";
import Button from "../Button";
import { AssetImages } from "../../../../assets";
import { GlobalConsts } from "../../../consts/GlobalConsts";
import { color } from "react-native-elements/dist/helpers";

const MessagePopup = ({
  visible,
  onClose,
  title,
  description,
  displayImage,
  showImage = true,
  isTypeError = false,
}) => {
  function showDefaultImageType() {
    if (isTypeError === true) {
      return AssetImages.success;
    }

    return AssetImages.success;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={[
              styles.contentContainer,
              { minHeight: showImage ? 220 : 120 },
            ]}
          >
            {showImage && (
              <Image
                source={showDefaultImageType()}
                style={styles.imageStyle}
              />
            )}
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.descriptionStyle}>{description}</Text>
          </View>
          <Button
            height={40}
            minWidth={"80%"}
            onPress={onClose}
            fontWeight="500"
          >
            OK
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    paddingVertical: 25,
    marginHorizontal: 50,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    alignItems: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    paddingHorizontal: 20,
    color: GlobalConsts.Colors.white,
  },
  descriptionStyle: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
    color: GlobalConsts.Colors.white,
  },
});

export default MessagePopup;
