import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import GoogleButton from "react-native-google-button/src";
import globalstyles from "./globalstyles";

export default Login = ({ promptAsync }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}>
        <Image
          style={styles.logo}
          source={require("./assets/google-logo.png")}
        />
        <Text style={{ padding: 10, color: globalstyles.TextColor }}>
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalstyles.ViewBackgroundColor,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
