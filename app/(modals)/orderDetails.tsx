import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { ArrowDown, InfoCircle } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchOrder } from "../reduxStore/orderSlice";

interface OrderItem {
  id: string;
  storeItemId: string;
  quantity: number;
}

const Page = () => {
  const { id } = useLocalSearchParams();
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const dispatch = useDispatch<any>();
  const { orders } = useSelector((state: RootState) => state.orders);
  const { storeItems } = useSelector((state: RootState) => state.storeItem);
  const orderDetails: any = orders.find((order) => order.id == id);
  const [doneAt, setdoneAt] = useState<string | null>(null);

  const acceptOrder = async () => {
    try {
      const response = await fetch("http://172.20.10.2:8080/order/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          orderId: orderDetails.id,
          doneAt: doneAt,
        }),
      });

      if (response.ok) {
        dispatch(fetchOrder(accessToken));
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View
      style={styles.header}
      className="bg-[#0b0b0b] flex-1  flex-col flex justify-between items-stretch"
    >
      <View className="">
        <View className="flex px-8 mb-6 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
          >
            <ArrowDown variant="Broken" size={20} color={Colors.white} />
          </Pressable>

          <Text
            className="text-lg text-[#fffffc]"
            style={{ fontFamily: "medium" }}
          >
            Детали
          </Text>
          <Text
            className="text-4xl text-[#1BD868]"
            style={{ fontFamily: "heavy" }}
          >
            G
          </Text>
        </View>

        {orderDetails.items.map((orderItem: OrderItem, index: number) => {
          const orderStoreItem = storeItems.find(
            (storeItem) => storeItem.id === orderItem.storeItemId
          );
          return (
            <View key={index} className="flex flex-col ">
              <View className="bg-[#121212]/90 border-b border-[#fffffc]/5 px-6 py-4 flex flex-row  w-full items-center justify-between">
                <View className="">
                  <Text
                    style={{ fontFamily: "medium" }}
                    className="text-white text-[15px]"
                  >
                    {orderStoreItem?.name}
                  </Text>

                  <Text
                    style={{ fontFamily: "medium" }}
                    className="text-white/60 text-xs  "
                  >
                    {orderStoreItem?.description}
                  </Text>
                </View>

                <View className="">
                  <Text
                    style={{ fontFamily: "medium" }}
                    className=" text-[#25D366] self-end"
                  >
                    x{orderItem?.quantity}
                  </Text>
                  <Text
                    style={{ fontFamily: "semibold" }}
                    className="text-white text-md "
                  >
                    {orderStoreItem?.price}{" "}
                    <Text className="text-xs text-white/70">ден</Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {orderDetails.comment && (
          <View className="mt-4 flex items-center flex-row">
            <InfoCircle variant="Bulk" size={15} color={Colors.primary} />
            <Text
              style={{ fontFamily: "medium" }}
              className="ml-1 text-xs text-white/80"
            >
              Коментар: {orderDetails.comment}
            </Text>
          </View>
        )}
      </View>

      <View className="px-6 flex flex-col">
        {orderDetails.status === 'ACCEPTED' ? (null) : (
        <View className="flex border-t border-[#fffffc]/5 pt-4 space-x-2 flex-row items-center justify-center">
          <Pressable onPress={() => setdoneAt('PT10M')} className={doneAt === 'PT10M' ? "py-2.5 px-3 border-2 border-[#25D366]  rounded-xl bg-[#121212]/90 flex justify-center items-center" : "py-2.5 px-3 border-2 border-[#fffffc]/40 rounded-xl bg-[#121212]/90 flex justify-center items-center"}>
            <Text
              style={{ fontFamily: "medium" }}
              className=" text-white"
            >
              10 мин
            </Text>
          </Pressable>

          <Pressable onPress={() => setdoneAt('PT15M')} className={doneAt === 'PT15M' ? "py-2.5 px-3 border-2 border-[#25D366]  rounded-xl bg-[#121212]/90 flex justify-center items-center" : "py-2.5 px-3 border-2 border-[#fffffc]/40 rounded-xl bg-[#121212]/90 flex justify-center items-center"}>
            <Text
              style={{ fontFamily: "medium" }}
              className=" text-white"
            >
              15 мин
            </Text>
          </Pressable>


          <Pressable onPress={() => setdoneAt('PT20M')} className={doneAt === 'PT20M' ? "py-2.5 px-3 border-2 border-[#25D366]  rounded-xl bg-[#121212]/90 flex justify-center items-center" : "py-2.5 px-3 border-2 border-[#fffffc]/40 rounded-xl bg-[#121212]/90 flex justify-center items-center"}>
            <Text
              style={{ fontFamily: "medium" }}
              className=" text-white"
            >
              20 мин
            </Text>
          </Pressable>


          <Pressable onPress={() => setdoneAt('PT25M')} className={doneAt === 'PT25M' ? "py-2.5 px-3 border-2 border-[#25D366]  rounded-xl bg-[#121212]/90 flex justify-center items-center" : "py-2.5 px-3 border-2 border-[#fffffc]/40 rounded-xl bg-[#121212]/90 flex justify-center items-center"}>
            <Text
              style={{ fontFamily: "medium" }}
              className=" text-white"
            >
              25 мин
            </Text>
          </Pressable>

        </View>)}

        <View className="flex  flex-row items-center mt-3  gap-x-2  ">
          <Pressable className="py-4 flex-1 rounded-2xl bg-[#fffffc]/10 flex justify-center items-center">
            <Text
              style={{ fontFamily: "medium" }}
              className="text-[13px] text-white"
            >
              Одбиј
            </Text>
          </Pressable>

          {orderDetails.status === "ACCEPTED" ? null : (
            <Pressable
              onPress={acceptOrder}
              className="py-4 flex-1 rounded-2xl border-2 bg-[#25D366]/90 flex justify-center items-center"
            >
              <Text
                style={{ fontFamily: "medium" }}
                className="text-[13px] text-black"
              >
                Прифати
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 48 : 28,
    paddingBottom: Platform.OS === "android" ? 28 : 36,
  },
});
