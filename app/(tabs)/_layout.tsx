import React from "react";
import { Tabs, router, usePathname } from "expo-router";
import Colors from "../../constants/Colors";
import {
  ArrowLeft,
  DirectboxNotif,
  Home2,
  Map,
  Map1,
  Profile,
  SearchNormal1,
  Shop,
  ShoppingCart,
  User,
} from "iconsax-react-native";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

const Layout = () => {
  const currentPath = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarStyle: {
          backgroundColor: Colors.dark,
          borderTopColor: "#fafafa10",
          height: Platform.OS === "android" ? 90 : 110,
          paddingTop: 10,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: 60,
        },
        tabBarLabelStyle: { fontFamily: "medium", fontSize: 11 },
        tabBarIconStyle: {
          position: "relative",
          backgroundColor: Colors.gray50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Дома",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Home2
              color={color}
              variant={currentPath === "/" ? "Bold" : "Broken"}
              size={size}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="stores"
        options={{
          tabBarLabel: "Гриц",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Shop
              variant={currentPath === "/stores" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Мапа",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Map1
              variant={currentPath === "/map" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Корпа",
          headerShown: false,
          tabBarBadge: cartItems.length,
          tabBarBadgeStyle: {
            display: cartItems.length === 0 ? "none" : "flex",
            backgroundColor: Colors.white,
            fontFamily: "extrabold",
            fontSize: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart
              variant={currentPath === "/cart" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="(deliverer)/(orders)"
        options={{
          tabBarLabel: "Нарачки",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <DirectboxNotif
              variant={
                currentPath === "/newOrders" ||
                currentPath === "/finishedOrders"
                  ? "Bold"
                  : "Broken"
              }
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "CUSTOMER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="(deliverer)/profile"
        options={{
          tabBarLabel: "Профил",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <User
              variant={currentPath === "/profile" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "CUSTOMER" || user.role === "STORE"}
      />

      <Tabs.Screen
        name="(store)/(orders)"
        options={{
          tabBarLabel: "Нарачки",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <DirectboxNotif
              variant={
                currentPath === "/acceptedOrders" ||
                currentPath === "/newOrders"
                  ? "Bold"
                  : "Broken"
              }
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "CUSTOMER"}
      />

      <Tabs.Screen
        name="(store)/profile"
        options={{
          tabBarLabel: "Профил",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <User
              variant={currentPath === "/profile" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER" || user.role === "CUSTOMER"}
      />
    </Tabs>
  );
};

export default Layout;
