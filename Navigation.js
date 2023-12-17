import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/Home";
import SearchScreen from "./components/Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import globalstyles from "./globalstyles";
import Library from "./components/Library";
import Premium from "./components/Premium";

const Tab = createBottomTabNavigator();

const NavigationComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="green"
      screenOptions={{
        tabBarActiveTintColor: "#1CD760",
        tabBarInactiveTintColor: "white",
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
        name="Home"
        component={HomeScreen}
        options={{
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
        name="Library"
        component={Library}
        options={{
          tabBarLabel: "Library",
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
