import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default SplashScreen = ({ promptAsync }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedInFunc = async () => {
    const user = await AsyncStorage.getItem("@user");
    setIsLoading(false);
    if (user) {
      setIsLoggedIn(true);
    }
  };

  const RenderFunction = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    } else if (isLoggedIn) {
      return <Text>Homeee</Text>;
    } else {
      return <Login promptAsync={promptAsync} />;
    }
  };

  useEffect(() => {
    isLoggedInFunc();
  }, []);
  return <RenderFunction />;
};
