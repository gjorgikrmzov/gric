import { View, Text, Platform } from "react-native";
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { ScreenStackHeaderLeftView } from "react-native-screens";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return <MaterialTopTabs initialRouteName="stores"  screenOptions={{tabBarStyle: {backgroundColor: "#fffffc", position: 'relative', paddingTop: Platform.OS === 'android' ? 45 : 45, borderColor: '#fffffc'}, tabBarIndicatorStyle: {backgroundColor: '#0b0b0b', height: 3 } }} >
    <MaterialTopTabs.Screen name="coffee" options={{title: 'Кафе', tabBarLabelStyle: { fontFamily: "semibold", fontSize: 12 },}} />
    <MaterialTopTabs.Screen name="stores" options={{title: 'Храна', tabBarLabelStyle: { fontFamily: "semibold", fontSize: 12 }}} />
    <MaterialTopTabs.Screen name="tobbaco" options={{title: 'Тобако', tabBarLabelStyle: { fontFamily: "semibold", fontSize: 12 },}} />
  </MaterialTopTabs>;
};

export default Layout;
