import { View, Text, FlatList, Pressable } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";
import OrderCard from "../../../../components/Cards/orderCard";
import { CloseCircle, CloseSquare, DirectboxNotif } from "iconsax-react-native";
import Colors from "../../../../constants/Colors";
import { router } from "expo-router";

const Page = () => {
  
  const { orders } = useSelector((state: RootState) => state.orders);

  const acceptOrder = (item: any) => {
    router.push({pathname: '/(modals)/orderDetails', params: { id: item.id}})
  };

  const acceptedOrders = orders.filter((order) => order.status === "ACCEPTED");

  return (
    <Pressable className="flex-1 bg-[#0b0b0b]">
      <View className="px-6 mt-8 flex flex-row items-center">
        <DirectboxNotif variant="Bulk" size={22} color={Colors.primary} />
        <Text
          className="text-white ml-1 text-xl"
          style={{ fontFamily: "medium" }}
        >
          Нарачки
        </Text>
      </View>

      <FlatList
        className="mt-4"
        data={acceptedOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard item={item} handleOpenOrder={() => acceptOrder(item)} />
        )}
      />
    </Pressable>
  );
};

export default Page;
