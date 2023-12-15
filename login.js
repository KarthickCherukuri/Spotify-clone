import { StyleSheet, View, Button } from "react-native";

export default Login = ({ promptAsync }) => {
  return (
    <View style={styles.container}>
      <Button title="sign in" onPress={() => promptAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
