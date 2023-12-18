import { StyleSheet, Dimensions } from "react-native";
import globalstyles from "../../../globalstyles";

const windowWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    width: windowWidth,
    padding: 4,
    marginBottom: 10,
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  text: {
    color: globalstyles.TextColor,
    fontWeight: "bold",
  },
  smallText: {
    color: globalstyles.lightTextColor,
    fontSize: 12,
  },
});
