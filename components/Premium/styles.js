import { StyleSheet } from "react-native";
import globalstyles from "../../globalstyles";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalstyles.ViewBackgroundColor,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalstyles.TextColor,
  },
});
