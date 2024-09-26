import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { GlobalConsts } from "../../../../consts/GlobalConsts";
import SummaryCounter from "../../../components/SummaryCounter";
import { getDisplayNameOfRole } from "../../../../utils/StringUtils";
import LatoText from "../../../auth/LatoText";
import { AssetImages } from "../../../../../assets";

const SummaryItem = ({ summary }) => {
  const _organizer = summary.organizer?.organizer;

  function renderCouterView() {
    return (
      <View style={styles.counterRow}>
        <SummaryCounter
          title="Tickets Sold"
          alignItems={"center"}
          paddingLeft={2}
          paddingRight={2}
          count={summary.ticketsSold}
          asset={AssetImages.ticketSold}
        />
        <SummaryCounter
          title="Tables Sold"
          alignItems={"center"}
          paddingLeft={2}
          paddingRight={2}
          count={summary.tablesSold}
          asset={AssetImages.tableSold}
        />
        <SummaryCounter
          title="Total"
          alignItems={"center"}
          paddingLeft={2}
          paddingRight={2}
          count={summary.ticketsSold + summary.tablesSold}
          asset={AssetImages.totalSold}
        />
      </View>
    );
  }

  function renderProfileImage() {
    return (
      <Avatar.Image
        style={styles.image}
        source={{ uri: _organizer?.imageUrl }}
      />
    );
  }

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        {renderProfileImage()}
        <View style={styles.info}>
          <LatoText style={styles.name}>{_organizer.fullName}</LatoText>
          <LatoText style={styles.email}>{_organizer.email}</LatoText>
        </View>
      </View>
      {renderCouterView()}
      <View style={styles.notes}>
        <LatoText style={styles.notesLabel}>Notes</LatoText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalConsts.Colors.primaryGreen15,
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    color: "#C4C4C4",
    fontSize: 14,
  },
  email: {
    color: "#C4C4C4",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#C4C4C4",
    fontSize: 14,
  },
  notes: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  notesLabel: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  counterContainer: {
    backgroundColor: GlobalConsts.Colors.primaryGreen25,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  image: {
    backgroundColor: "#FFFFFF33",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default SummaryItem;
