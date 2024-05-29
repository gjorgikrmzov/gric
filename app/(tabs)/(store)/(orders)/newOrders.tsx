import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";
import { fetchOrder } from "../../../reduxStore/orderSlice";
import OrderCard from "../../../../components/Cards/orderCard";
import { DirectboxNotif, Refresh } from "iconsax-react-native";
import Colors from "../../../../constants/Colors";
import { router } from "expo-router";

const Page = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchOrder(accessToken));
  }, []);

  const acceptOrder = (item: any) => {
    router.push({pathname: '/(modals)/orderDetails', params: { id: item.id}})
  };

  const newOrders = orders.filter((order) => order.status === "CREATED");

  return (
    <View className="flex-1 bg-[#0b0b0b]">
      <View className="flex mt-8 px-6 flex-row items-center justify-between">

      <View className="flex flex-row items-center  ">
        <DirectboxNotif variant="Bulk" size={22} color={Colors.primary} />
        <Text className="text-white ml-1 text-xl" style={{ fontFamily: "medium" }}>
          Нарачки
        </Text>
      </View>
      
      <Pressable onPress={() => dispatch(fetchOrder(accessToken))} className=" rounded-full flex justify-center w-12 h-12 bg-[#fffffc]/5 items-center ">
        <Refresh variant="Broken" size={18} color={Colors.white} />
      </Pressable>
      </View>

      <FlatList
      className="mt-6"
        data={newOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderCard item={item} handleOpenOrder={() => acceptOrder(item)} />}
      />
    </View>
  );
};  

export default Page;
