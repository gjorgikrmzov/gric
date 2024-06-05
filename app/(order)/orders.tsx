import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, DirectboxNotif, ExportSquare } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { Order } from "../reduxStore/models";
import { fetchOrder } from "../reduxStore/orderSlice";
import { PressableScale } from "react-native-pressable-scale";

const Page = () => {
  const screenWidth = Dimensions.get("window").width;
  const halfScreenWidth = screenWidth * 0.5;
  const { orders } = useSelector((state: RootState) => state.orders);
  const { stores } = useSelector((state: RootState) => state.store);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const dispatch = useDispatch<any>();
  const [selectedTab, setSelectedTab] = useState<"currentOrder" | "allOrders">(
    "currentOrder"
  );
  const animation = useSharedValue(0);

  const onTabPress = (tab: "currentOrder" | "allOrders") => {
    setSelectedTab(tab);
    animation.value = withTiming(tab === "currentOrder" ? 0 : 1, {
      duration: 250,
      easing: Easing.inOut(Easing.circle),
    });

    dispatch(fetchOrder(accessToken));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation.value * halfScreenWidth,
        },
      ],
    };
  }, []);

  const currentOrder = orders.map((order) => {
    const store = stores.find(
      (store) => String(store.id) === String(order.storeId)
    );
    const storeName = store ? store.name : "Unknown Store";
    return { ...order, storeName };
  });

  const finishedOrders = orders
    .filter((order) => order.status === "FINISHED")
    .map((order) => {
      const store = stores.find(
        (store) => String(store.id) === String(order.storeId)
      );
      const storeName = store ? store.name : "Unknown Store";
      return { ...order, storeName };
    });

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0b0b0b]">
      <View className="px-6 py-4 flex flex-row gap-x-3 items-center justify-between">
        <PressableScale
          onPress={() => router.back()}
          className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
        >
          <ArrowLeft variant="Broken" size={20} color={Colors.white} />
        </PressableScale>
        <Text
          className="text-lg text-[#fffffc]"
          style={{ fontFamily: "medium" }}
        >
          Нарачки
        </Text>

        <Text
          className="text-4xl text-[#1BD868]"
          style={{ fontFamily: "heavy" }}
        >
          G
        </Text>
      </View>

      <View className="w-full ">
        <View className="justify-center w-full items-center flex">
          <View className="flex flex-col justify-center items-center w-full ">
            <View className="flex flex-row">
              <PressableScale
                className=" w-44 h-16 flex justify-center items-center py-4"
                onPress={() => onTabPress("currentOrder")}
              >
                <Text
                  style={{ fontFamily: "semibold" }}
                  className={
                    selectedTab === "currentOrder"
                      ? "text-[#fffffc]"
                      : "text-[#fffffc]/50"
                  }
                >
                  Нарачки во тек
                </Text>
              </PressableScale>
              <PressableScale
                className=" w-44 h-16 flex justify-center items-center py-4"
                onPress={() => onTabPress("allOrders")}
              >
                <Text
                  style={{ fontFamily: "semibold" }}
                  className={
                    selectedTab === "currentOrder"
                      ? "text-[#fffffc]/50"
                      : "text-[#fffffc]"
                  }
                >
                  Завршени
                </Text>
              </PressableScale>
            </View>
            <View className="w-full flex absolute left-0 bottom-0 h-1 bg-[#fffffc]/10 ">
              <Animated.View
                className="h-1 bg-[#fffffc]"
                style={[styles.highlight, animatedStyle]}
              />
            </View>
          </View>
        </View>
      </View>

      <View className=" flex-1">
        {selectedTab === "currentOrder" ? (
          <View className=" flex-1 justify-center items-center mt-6 flex-row">
            {currentOrder.length === 0 ? (
              <View className="flex flex-1 justify-center items-center flex-col">
                <View className="flex justify-center items-center w-28 h-28 rounded-3xl bg-[#121212]/90">
                  <DirectboxNotif
                    size={56}
                    variant="Bulk"
                    color={Colors.primary}
                  />
                </View>
                <Text
                  className="text-[#fffffc] text-lg mt-4 text-center"
                  style={{ fontFamily: "medium" }}
                >
                  Немате нарачки {"\n"}во моментов
                </Text>
              </View>
            ) : (
              <ScrollView className="flex h-full flex-col w-full">
                {currentOrder.map((order, index) => (
                  <View
                    key={index}
                    className="jusify-start flex-1 flex flex-col px-6 items-center border-b border-[#fffffc]/10 py-5"
                  >
                    <View className="flex flex-row items-start">
                      <View className="w-20 h-20  bg-[#fffffc]/10 rounded-2xl"></View>
                      <View className="ml-3 flex-1">
                        <View className="flex flex-col">
                          <Text
                            className="text-xs text-white/80"
                            style={{ fontFamily: "semibold" }}
                          >
                            Број на нарачка: {order.id}
                          </Text>
                          <Text
                            className="text-[15px] text-white mt-1"
                            style={{ fontFamily: "semibold" }}
                          >
                            {order.storeName}
                          </Text>
                        </View>

                        <View className="mt-4 flex-1 flex-row flex justify-between items-center">
                          <Text
                            className="text-[#fffffc]/60 text-xs"
                            style={{ fontFamily: "semibold" }}
                          >
                            {formatTime(order.createdAt)}
                          </Text>
                          <Text
                            className="text-[#fffffc]/60 "
                            style={{ fontFamily: "semibold" }}
                          >
                            <Text className="text-[#25D366]">
                              {order.totalPrice}
                            </Text>{" "}
                            ден
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="flex-1 items-center flex gap-x-2 flex-row justify-center mt-3">
                      <PressableScale
                        onPress={() => router.push("/trackOrder")}
                        className="flex items-center bg-[#121212]/90 px-3 flex-1 py-4 rounded-2xl"
                      >
                        <Text
                          style={{ fontFamily: "medium" }}
                          className="text-white"
                        >
                          Види нарачка
                        </Text>
                      </PressableScale>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        ) : (
          <View className="px-6 flex-1 justify-center items-start mt-6 flex-row">
            {/* <View className='flex justify-center items-center flex-col'>
                            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#F0F1F3]/80'>
                                <DirectboxNotif size={56} variant='Bulk' color={Colors.primary} />
                            </View>
                            <Text className='text-[#fffffc] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате предходни {'\n'}нарачки</Text>
                        </View> */}

            <ScrollView className="h-full flex flex-col  w-full">
              {finishedOrders.map((order, index) => (
                <PressableScale
                  key={index}
                  className="rotunded-3xl jusify-start flex flex-row items-center border-b border-[#fffffc]/10 py-5"
                >
                  <View className="w-20 h-20  bg-[#fffffc]/10 rounded-2xl"></View>
                  <View className="flex flex-row items-start">
                    <View className="w-20 h-20  bg-[#fffffc]/10 rounded-2xl"></View>
                    <View className="ml-3 flex-1">
                      <View className="flex flex-col">
                        <Text
                          className="text-xs text-white/80"
                          style={{ fontFamily: "semibold" }}
                        >
                          Број на нарачка: {order.id}
                        </Text>
                        <Text
                          className="text-[15px] text-white mt-1"
                          style={{ fontFamily: "semibold" }}
                        >
                          {order.storeName}
                        </Text>
                      </View>

                      <View className="mt-4 flex-1 flex-row flex justify-between items-center">
                        <Text
                          className="text-[#fffffc]/60 text-xs"
                          style={{ fontFamily: "semibold" }}
                        >
                          {order.createdAt}
                        </Text>
                        <Text
                          className="text-[#fffffc]/60 "
                          style={{ fontFamily: "semibold" }}
                        >
                          <Text className="text-[#25D366]">
                            {order.totalPrice}
                          </Text>{" "}
                          ден
                        </Text>
                      </View>
                    </View>
                  </View>
                </PressableScale>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    marginHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
  },
  highlight: {
    width: "50%", // Set this to your tab width
  },
  content: {
    fontSize: 20,
  },
});
export default Page;
