import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavigationComponent from "./Navigation";

export default SplashScreen = ({ promptAsync, userInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    userInfo === undefined ? false : true
  );

  const isLoggedInFunc = async () => {
    const user = await AsyncStorage.getItem("@user");
    setIsLoading(false);
    if (user) {
      setIsLoggedIn(true);
    }
  };

  const RenderFunction = () => {
    if (isLoading && !isLoggedIn) {
      return <Text>Loading...</Text>;
    } else if (isLoggedIn || userInfo) {
      return (
        <NavigationContainer>
          <NavigationComponent />
        </NavigationContainer>
      );
    } else {
      return <Login promptAsync={promptAsync} />;
    }
  };

  useEffect(() => {
    isLoggedInFunc();
  }, []);
  return <RenderFunction />;
};
