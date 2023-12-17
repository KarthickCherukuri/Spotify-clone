import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavigationComponent from "./Navigation";

export default SplashScreen = ({ promptAsync, userInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedInFunc = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    setIsLoading(false);
    if (accessToken) {
      setIsLoggedIn(true);
    }
  };

  const manualLogin = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
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
      return <Login manualLogin={manualLogin} />;
    }
  };

  useEffect(() => {
    isLoggedInFunc();
  }, []);
  return <RenderFunction />;
};
