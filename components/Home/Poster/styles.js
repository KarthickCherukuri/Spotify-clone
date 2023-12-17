import { StyleSheet } from "react-native";
import globalstyles from "../../../globalstyles";

export default styles = StyleSheet.create({
  text: {
    color: globalstyles.lightTextColor,
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  posterContainer: {
    width: 180,
    height: 200,
    borderRadius: 10,
    padding: 5,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalstyles.TextColor,
  },
});
