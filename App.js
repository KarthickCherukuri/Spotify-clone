import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./login";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "481341226583-8bjrsqqqqbvsq5kbh63mp2i9n4qu73v0.apps.googleusercontent.com",
    androidClientId:
      "481341226583-b5g6dtuprmpocek4rmvli7vooeojssu8.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user);
        console.log(JSON.stringify(user, null, 2));
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      }
    });
    return () => unsub();
  }, []);

  return <Login promptAsync={promptAsync} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
