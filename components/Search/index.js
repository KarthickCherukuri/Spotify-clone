import { View, Text, Button } from "react-native";
import styles from "./styles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <Button
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
          await AsyncStorage.removeItem("@accessToken");
        }}
        title="signout"
      />
    </View>
  );
};

export default Search;
