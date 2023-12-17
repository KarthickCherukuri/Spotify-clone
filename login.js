import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import globalstyles from "./globalstyles";
import { useContext, useEffect } from "react";
import spotifyCredentials from "./spotifyConfig";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
WebBrowser.maybeCompleteAuthSession();

export default Login = ({ promptAsync, manualLogin }) => {
  const [request, response, promptAsyncSpotify] = AuthSession.useAuthRequest(
    {
      clientId: spotifyCredentials.clientId,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-private",
        "user-read-recently-played",
        "user-library-read",
        "user-follow-read",
      ],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        native: "spotify-clone://redirect",
      }),
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      AuthSession.exchangeCodeAsync(
        {
          clientId: spotifyCredentials.clientId,
          code,
          redirectUri: AuthSession.makeRedirectUri({
            native: "spotify-clone://redirect",
          }),
          extraParams: {
            code_verifier: request.codeVerifier,
          },
        },
        discovery
      )
        .then(async (result) => {
          if (result.error) {
            console.log(result.error);
            return;
          }

          const accessToken = result.accessToken;
          await AsyncStorage.setItem("@accessToken", accessToken);
          manualLogin();
          // Now you can use the access token to make authorized API requests
        })
        .catch((error) => console.log(error));
    }
  }, [response, request]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          promptAsyncSpotify();
        }}>
        <MaterialCommunityIcons name="spotify" color="#1CD760" size={30} />
        <Text style={{ padding: 10, color: globalstyles.TextColor }}>
          Sign In with Spotify
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
