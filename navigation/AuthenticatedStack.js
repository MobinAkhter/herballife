import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import ConditionScreen from "../screens/ConditionScreen";
import RemedyListScreen from "../screens/RemedyListScreen";
import AboutRemedyScreen from "../screens/AboutRemedyScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import AppSettingsScreen from "../screens/AppSettingsScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import DataAnalyticsScreen from "../screens/DataAnalyticsScreen";
import RemediesBarGraphScreen from "../screens/RemediesBarGraphScreen";
import QuestionTier2Screen from "../screens/QuestionTier2Screen";
import QuestionTier3Screen from "../screens/QuestionTier3Screen";
import RecommendedRemedyScreen from "../screens/RecommendedRemedyScreen";
import ChatScreen from "../screens/ChatScreen";
import SortedRemedies from "../screens/SortedRemedies";
import DonationScreen from "../screens/DonationScreen";
import RecommendedRemediesScreen from "../screens/RecommendedRemediesScreen";
import RecommendedRemedyReviewScreen from "../screens/RecommendedRemedyReviewScreen";
import ViewAllRecommendationsScreen from "../screens/ViewAllRecommendationsScreen";

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
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={UserProfileScreen} />
      <Stack.Screen name="Condition" component={ConditionScreen} />
      <Stack.Screen name="Remedies" component={RemedyListScreen} />
      <Stack.Screen name="Remedy Details" component={AboutRemedyScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
      <Stack.Screen name="RemediesBar" component={RemediesBarGraphScreen} />
      <Stack.Screen name="QuestionTier2" component={QuestionTier2Screen} />
      <Stack.Screen name="QuestionTier3" component={QuestionTier3Screen} />
      <Stack.Screen
        name="RecommendedRemedyScreen"
        component={RecommendedRemedyScreen}
      />
      <Stack.Screen
        name="RecommendedRemediesScreen"
        component={RecommendedRemediesScreen}
      />

      <Stack.Screen
        name="RecommendedRemedyReviewScreen"
        component={RecommendedRemedyReviewScreen}
      />

       <Stack.Screen
        name="ViewAllRecommendationsScreen"
        component={ViewAllRecommendationsScreen}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#35D96F", // REMOVE THIS TO HAVE IT DEFAULT BLUE AGAIN
        inactiveTintColor: "#A9A9A9",
        keyboardHidesTabBar: Platform.OS === "android" ? true : false,
      }}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()} // This will navigate to the previous screen
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "#35D96F" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.white },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={AppSettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmarks-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recommendation System"
        component={DataAnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-analytics" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="A-Z Herbs"
        component={SortedRemedies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-book-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthenticatedStack;
