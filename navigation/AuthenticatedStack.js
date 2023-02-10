import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfileScreen from "../screens/UserProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import ConditionScreen from "../screens/ConditionScreen";
import RemedyListScreen from "../screens/RemedyListScreen";
import AboutRemedyScreen from "../screens/AboutRemedyScreen";
import AppSettingsScreen from "../screens/AppSettingsScreen";
import { Colors } from "../constants/styles";

// Add references here

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#35D96F" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.white },
      }}
    >
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        screenOptions={{ headerLeft: null }}
      />
      <Tab.Screen name="Condition" component={ConditionScreen} />
      <Tab.Screen name="RemedyList" component={RemedyListScreen} />
      <Tab.Screen name="AboutRemedy" component={AboutRemedyScreen} />
      {/* <Tab.Screen
        name="AuthenticatedStack"
        component={AuthenticatedStack}
        options={{ title: "", headerTransparent: true }} */}
      {/* //
      https://stackoverflow.com/questions/61185135/react-native-navigation-error-the-action-navigate-with-payload-name-192-168
      ^ Tried to make navigation work. Tired atm, will think about this later /> */}
    </Stack.Navigator>
  );
}

function AuthenticatedStack({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#35D96F" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.white },
      }}
    >
      {/* These are the screens that get displayed on the bottom tab */}
      <Tab.Screen
        name="Welcome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="App Settings"
        component={AppSettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthenticatedStack;