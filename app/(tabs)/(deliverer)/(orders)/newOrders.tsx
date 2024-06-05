import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";
import { fetchOrder } from "../../../reduxStore/orderSlice";
import OrderCard from "../../../../components/Cards/storeOrderCard";
import { DirectboxNotif, Refresh } from "iconsax-react-native";
import Colors from "../../../../constants/Colors";
import { router } from "expo-router";
import * as Notifications from 'expo-notifications'
import StoreOrderCard from "../../../../components/Cards/storeOrderCard";
import { PressableScale } from "react-native-pressable-scale";

Notifications.setNotificationHandler({
  handleNotification: async(notification) => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true   
    };
  }
});


const Page = () => {
 
  const { orders } = useSelector((state: RootState) => state.orders);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const dispatch = useDispatch<any>();

  useEffect(() => {

    async function configurePushNotifications() {
      const {status} = await Notifications.getPermissionsAsync()
      let finalStatus = status
      
      if(finalStatus !== 'granted') {
        Notifications.requestPermissionsAsync()
      }
    }
    Notifications.getExpoPushTokenAsync().then((pushToken:any) => {
    })

    configurePushNotifications()
  }, [])

  const openOrder = (item: any) => {
    router.push({pathname: '/(modals)/delivererOrderDetails', params: { id: item.id}})
  };

  const newOrders = orders.filter((order) => order.status === "ACCEPTED");

  useEffect(() => {
    dispatch(fetchOrder(accessToken))
  }, [])


  return (
    <View className="flex-1 bg-[#0b0b0b]">
      <View className="flex mt-8 px-6 flex-row items-center justify-between">

      <View className="flex flex-row items-center  ">
        <DirectboxNotif variant="Bulk" size={22} color={Colors.primary} />
        <Text className="text-white ml-1 text-xl" style={{ fontFamily: "medium" }}>
          Нарачки
        </Text>
      </View>
      
      <PressableScale onPress={() => dispatch(fetchOrder(accessToken))} className=" rounded-full flex justify-center w-12 h-12 bg-[#fffffc]/5 items-center ">
        <Refresh variant="Broken" size={18} color={Colors.white} />
      </PressableScale>
      </View>

      <FlatList
      className="mt-6"
        data={newOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <StoreOrderCard item={item} handleOpenOrder={() => openOrder(item)} />}
      />
    </View>
  );
};  

export default Page;
