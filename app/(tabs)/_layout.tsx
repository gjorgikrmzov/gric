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
  Shop,
  ShoppingCart,
  User,
} from "iconsax-react-native";
import { Platform, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

const Layout = () => {
  const currentPath = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: "#0b0b0b2c",
          height: Platform.OS === "android" ? 90 : 110,
          paddingTop: 10,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: 60,
        },
        tabBarLabelStyle: { fontFamily: "medium", fontSize: 12 },
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
        redirect={user.role === "DELIVERER"}
      />

      <Tabs.Screen
        name="(stores)"
        options={{
          tabBarLabel: "Храна",
          headerLeft: () => (
            <Pressable onPress={() => router.push('(user)/profile')} className="  relative ml-6 w-12 h-12 rounded-full border border-[#0b0b0b]/5 flex justify-center items-center">
              <User size={20} variant="Broken" color={Colors.dark} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => router.push('/cart')} className="relative   mr-6 w-12 h-12 rounded-full border border-[#0b0b0b]/5 flex justify-center items-center">
              <ShoppingCart size={20} variant="Broken" color={Colors.dark} />
            </Pressable>
          ),
          title: "GRIC",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "heavy",
            color: "#1BD868",
            fontSize: 26,
          },
          tabBarIcon: ({ color, size }) => (
            <Shop
              variant={
                currentPath === "/stores" ||
                currentPath === "/coffee" ||
                currentPath === "/tobbaco"
                  ? "Bold"
                  : "Broken"
              }
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "DELIVERER"}
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
        redirect={user.role === "DELIVERER"}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Корпа",
          headerShown: false,
          tabBarBadge: cartItems.length,
          tabBarBadgeStyle: {
            display: cartItems.length === 0 ? "none" : "flex",
            backgroundColor: Colors.dark,
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
        redirect={user.role === "DELIVERER"}
      />

      <Tabs.Screen
        name="(deliverer)/orders"
        options={{
          tabBarLabel: "Нарачки",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <DirectboxNotif
              variant={currentPath === "/orders" ? "Bold" : "Broken"}
              size={size}
              color={color}
            />
          ),
        }}
        redirect={user.role === "CUSTOMER"}
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
        redirect={user.role === "CUSTOMER"}
      />
    </Tabs>
  );
};

export default Layout;
