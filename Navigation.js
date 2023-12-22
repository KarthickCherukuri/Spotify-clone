import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/Home";
import SearchScreen from "./components/Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import globalstyles from "./globalstyles";
import Library from "./components/Library";
import Premium from "./components/Premium";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Songs from "./components/Songs";

const Stack = createNativeStackNavigator();

const HomeScreenExtra = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: globalstyles.headerBackgroundColor },
        headerTintColor: globalstyles.TextColor,
      }}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen
        component={Songs}
        name="Songs"
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

const LibraryScreenExtra = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: globalstyles.headerBackgroundColor },
        headerTintColor: globalstyles.TextColor,
      }}>
      <Stack.Screen component={Library} name="Library" />
      <Stack.Screen
        component={Songs}
        name="Songs"
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const NavigationComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="green"
      screenOptions={{
        tabBarActiveTintColor: "#1CD760",
        tabBarInactiveTintColor: "white",
        headerShown: true,
        tabBarStyle: { backgroundColor: "transparent", borderTopWidth: 0 },
        headerStyle: { backgroundColor: globalstyles.headerBackgroundColor },
        headerTintColor: globalstyles.TextColor,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "black",
          elevation: 0,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreenExtra}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={LibraryScreenExtra}
        options={{
          tabBarLabel: "Library",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={Premium}
        options={{
          tabBarLabel: "Premium",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="spotify" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationComponent;
