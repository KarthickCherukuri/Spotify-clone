import { StyleSheet, Dimensions, TextInput } from "react-native";
import globalstyles from "../../globalstyles";

const windowWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: globalstyles.ViewBackgroundColor,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalstyles.TextColor,
  },
  TextInput: {
    backgroundColor: "white",
    width: 0.9 * windowWidth,
    borderRadius: 3,
    padding: 10,
    color: "black",
    height: 40,
  },
  TextInputActive: {
    backgroundColor: globalstyles.headerBackgroundColor,
    color: globalstyles.TextColor,
    width: 0.9 * windowWidth,
    borderRadius: 3,
    padding: 10,
    height: 40,
  },
  headerBox: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: windowWidth,
    padding: 5,
  },
});
