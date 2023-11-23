import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "./contexts/userContext";
import UserProvider from "./contexts/userContext";
import AuthenticatedStack from "./navigation/AuthenticatedStack";
import { PreparationStack } from "./navigation/AuthenticatedStack";
import { BookmarkStack } from "./navigation/AuthenticatedStack";
import AuthStack from "./navigation/AuthStack";
import { LogBox, Text, View, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserProfileScreen from "./screens/UserProfileScreen";
import DonationScreen from "./screens/DonationScreen";
// import { ThemeProvider } from "./contexts/ThemeContext";
import OnboardingScreen from "./screens/OnboardingScreen";
import NotesScreen from "./screens/NotesScreen";
import ContactScreen from "./screens/ContactScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import PreparationScreen from "./screens/PreparationScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { setUser } = props;
  const navigation = useNavigation();

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    navigation.navigate("Login");
  };
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#e0f2e9" }}>
      {/* Header Logo */}
      <View
        style={{
          marginTop: 15,
          marginLeft: 20,
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#a8d5ba",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: "white" }}>🌿</Text>
          {/* Went for simple logo implementation, can use our app image later instead of text. */}
        </View>
        <View
          style={{
            marginLeft: 16,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#30a46c" }}>
            HerbalLife
          </Text>
          {/* You can replace 'AppName' with your actual app name */}
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout */}
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Icon name="exit-outline" color={color} size={size} />
        )}
        onPress={() => {
          handleLogout();
        }}
      />
    </DrawerContentScrollView>
  );
}
function DrawerNavigator() {
  const { setUser } = React.useContext(UserContext);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent setUser={setUser} {...props} />
      )}
      drawerStyle={{ backgroundColor: "#e0f2e9" }}
    >
      <Drawer.Screen
        name="Home"
        component={AuthenticatedStack}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Ionicons name="bookmarks-outline" size={28} color={"white"} />

              {/* Same custom icon as in drawerIcon */}
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={UserProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "User Profile",
          headerStyle: { backgroundColor: "#35D96F" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Bookmarks"
        component={BookmarkStack}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bookmarks-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Donate"
        component={DonationScreen}
        options={({ navigation }) => ({
          headerTitle: "Donate",
          headerStyle: { backgroundColor: "#35D96F" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          drawerIcon: ({ color, size }) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      />

      <Drawer.Screen
        name="Contact Us"
        component={ContactScreen}
        options={({ navigation }) => ({
          headerTitle: "Contact Us",
          headerStyle: { backgroundColor: "#35D96F" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="email-outline"
              size={size}
              color={color}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={({ navigation }) => ({
          headerTitle: "About Us",
          headerStyle: { backgroundColor: "#35D96F" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={size}
              color={color}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={28} />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
function Navigation() {
  LogBox.ignoreAllLogs();

  const { user, setUser } = React.useContext(UserContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      console.log(value);
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <OnboardingScreen />
      ) : user ? (
        <DrawerNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      {/* <ThemeProvider> */}
      <StatusBar style="light" />
      <Navigation />
      {/* </ThemeProvider> */}
    </UserProvider>
  );
}
