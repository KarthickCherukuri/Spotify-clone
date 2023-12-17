import { StyleSheet } from "react-native";
import globalstyles from "../../globalstyles";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
    backgroundColor: globalstyles.ViewBackgroundColor,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalstyles.TextColor,
  },
});
