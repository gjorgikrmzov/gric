import { View, Text, Platform } from "react-native";
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Colors from "../../../../constants/Colors";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (<MaterialTopTabs initialRouteName="stores"  screenOptions={{tabBarActiveTintColor: Colors.white,  tabBarStyle: { borderBlockColor: "#ffffff15", borderBottomWidth: 0.5,  backgroundColor: '#0b0b0b', paddingTop: Platform.OS === 'android' ? 45 : 45 }, tabBarIndicatorStyle: {backgroundColor: '#fffffc', height: 3, borderRadius: 12 } }} >
    <MaterialTopTabs.Screen name="newOrders" options={{title: 'Нови', tabBarLabelStyle: { fontFamily: "semibold", fontSize: 12 },}} />
    <MaterialTopTabs.Screen name="acceptedOrders" options={{title: 'Прифатени', tabBarLabelStyle: { fontFamily: "semibold", fontSize: 12 }}} />
  </MaterialTopTabs>)
};

export default Layout;
