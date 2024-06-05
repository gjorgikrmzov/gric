import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  ArrowLeft,
  Box,
  Call,
  Driving,
  ExportSquare,
  Location,
  NotificationStatus,
  Refresh,
  Shop,
  SidebarBottom,
  SidebarTop,
  StopCircle,
} from "iconsax-react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { customMapStyle } from "../../mapStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { fetchOrder } from "../reduxStore/orderSlice";
import { PressableScale } from "react-native-pressable-scale";
import * as Haptics from "expo-haptics";


const Page = () => {
  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const dispatch = useDispatch<any>();
  const [currentSheetIndex, setcurrentSheetIndex] = useState(0);
  const snapPoints = useMemo(() => ["25%", "50%", "76%"], []);
  const { storeItems } = useSelector((state: RootState) => state.storeItem);
  const { stores } = useSelector((state: RootState) => state.store);
  const [refreshing, setRefreshing] = useState(false);
  const { addresses } = useSelector((state: RootState) => state.addresses);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const [loading, setloading] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const makeCall = (number: string) => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported: boolean) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err: any) => console.error(err));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "CREATED":
        return "Вашата нарачка е испратена";
      case "ACCEPTED":
        return "Вашата нарачка е прифатена";
      case "DELIVERER_ON_THE_WAY_TO_STORE":
        return "Доставувачот се упати кон продавницата";
      case "DELIVERER_ON_THE_WAY_TO_CUSTOMER":
        return "Доставувачот се упати кон вас";
      case "FINISHED":
        return "Нарачката е доставена";
    }
  };

  const refreshOrder = () => {
    Haptics.impactAsync;
    setloading(true);
    dispatch(fetchOrder(accessToken));
    setloading(false);
  };


  const currentOrder = orders.map((order) => {
    const store = stores.find(
      (store) => String(store.id) === String(order.storeId)
    );

    const deliveryAddress = addresses.find(
      (address) => address.id === order.deliveryAddressId
    );

    const storeName = store?.name;

    return { ...order, storeName, deliveryAddress };
  });



  return (
    <GestureHandlerRootView>
      {currentOrder.map((order, index) => {
        return (
          <View key={index} className="bg-[#0b0b0b] flex-1">
            <StatusBar style="auto" />
            <View
              style={styles.header}
              className="flex px-6 bg-[#0b0b0b] pb-5 absolute left-0 z-20  w-full "
            >
              <View className="flex flex-row items-center justify-between">
                <PressableScale
                  onPress={() => router.back()}
                  className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
                >
                  <ArrowLeft variant="Broken" size={20} color={Colors.white} />
                </PressableScale>

                <PressableScale
                  onPress={refreshOrder}
                  className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                  ) : (
                    <Refresh variant="Broken" size={20} color={Colors.white} />
                  )}
                </PressableScale>
              </View>

              <View className="mt-4">
                <View className="flex flex-row items-center">
                  <NotificationStatus
                    size={14}
                    variant="Bulk"
                    color={Colors.primary}
                  />
                  <Text
                    style={{ fontFamily: "semibold" }}
                    className="text-xs ml-1 text-[#fffffc]/80 uppercase"
                  >
                    Статус
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "medium" }}
                  className="text-lg mt-0.5 text-[#fffffc]"
                >
                  {getStatusText(order.status)}
                </Text>

                <View className="flex mt-3 flex-row items-center gap-x-1.5 w-full">
                  <View
                    className={
                     order.status === "CREATED" || order.status === "ACCEPTED" || order.status === "DELIVERER_ON_THE_WAY_TO_STORE" || order.status === "DELIVERER_ON_THE_WAY_TO_CUSTOMER" || order.status === 'FINISHED'
                        ? "bg-[#1BD868] h-1 flex-1"
                        : "bg-[#fffffc]/10 h-1 flex-1"
                    }
                  ></View>
                  <View
                    className={
                     order.status === "ACCEPTED" || order.status === "DELIVERER_ON_THE_WAY_TO_STORE" || order.status === "DELIVERER_ON_THE_WAY_TO_CUSTOMER" || order.status === "DELIVERER_ON_THE_WAY_TO_STORE" || order.status === 'FINISHED'
                        ? "bg-[#1BD868] h-1 flex-1"
                        : "bg-[#fffffc]/10 h-1 flex-1"
                    }
                  ></View>
                  <View
                    className={
                     order.status === "DELIVERER_ON_THE_WAY_TO_STORE" || order.status === "DELIVERER_ON_THE_WAY_TO_CUSTOMER"  || order.status === 'FINISHED'
                        ? "bg-[#1BD868] h-1 flex-1"
                        : "bg-[#fffffc]/10 h-1 flex-1"
                    }
                  ></View>
                  <View
                    className={
                     order.status === "DELIVERER_ON_THE_WAY_TO_CUSTOMER"  || order.status === 'FINISHED'
                        ? "bg-[#1BD868] h-1 flex-1"
                        : "bg-[#fffffc]/10 h-1 flex-1"
                    }
                  ></View>
                  <View
                    className={
                      order.status === "FINISHED"
                        ? "bg-[#1BD868] h-1 flex-1"
                        : "bg-[#fffffc]/10 h-1 flex-1"
                    }
                  ></View>
                </View>
              </View>
            </View>

            <View className="border-black/10  flex-1  overflow-hidden">
              <MapView
                showsMyLocationButton={false}
                className="w-full h-3/4"
                showsCompass={false}
                focusable
                initialRegion={INITIAL_REGION}
                provider={PROVIDER_DEFAULT}
                customMapStyle={customMapStyle}
              >
                <Marker
                  coordinate={
                    {
                      latitude: order.deliveryAddress?.latitude,
                      longitude: order.deliveryAddress?.longitude,
                    } as any
                  }
                >
                  <View className="-z-0 p-2 justify-center items-center flex rounded-2xl bg-[#fafafa]">
                    <Location size={19} variant="Bulk" color={Colors.dark} />
                  </View>
                </Marker>

                <Marker coordinate={INITIAL_REGION}>
                  <View className="-z-0 p-2 justify-center items-center flex rounded-2xl bg-[#fafafa]">
                    <Driving size={19} variant="Bulk" color={Colors.dark} />
                  </View>
                </Marker>
              </MapView>
            </View>

            <BottomSheet
              onChange={(index) => setcurrentSheetIndex(index)}
              ref={bottomSheetRef}
              index={0}
              backgroundStyle={{
                backgroundColor: Colors.dark,
                borderRadius: currentSheetIndex === 2 ? 0 : 12,
              }}
              handleIndicatorStyle={{ backgroundColor: Colors.white }}
              snapPoints={snapPoints}
            >
              <View className="flex py-3 flex-col h-full pb-14">
                <BottomSheetScrollView
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      tintColor={Colors.white}
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      className="z-10 "
                    />
                  }
                >
                  <View className="px-6">
                    <Text
                      style={{ fontFamily: "semibold" }}
                      className="text-[#fffffc]/80"
                    >
                      Доставувач
                    </Text>
                    <View className="flex flex-row items-center justify-between mt-3">
                      <View className="flex flex-row space-x-3 items-center">
                        <View className="w-16 h-16 border-2 border-[#fffffc]/20 bg-[#7577804C]/10 rounded-2xl flex items-center justify-center">
                          <Driving variant="Broken" color={Colors.primary} />
                        </View>
                        <View className="space-y-1">
                          <Text
                            className="text-[#fffffc]/60 text-[10px]"
                            style={{ fontFamily: "semibold" }}
                          >
                            ДОСТАВУВАЧ
                          </Text>

                          <Text
                            style={{ fontFamily: "medium" }}
                            className="text-white"
                          >
                            {order.deliverer.firstName} {order.deliverer.lastName}
                          </Text>
                        </View>
                      </View>

                      <PressableScale
                        onPress={() => makeCall("+389 78 239 880")}
                        className="w-12 h-12 flex justify-center items-center rounded-2xl bg-[#121212]/90"
                      >
                        <Call size={22} color={Colors.white} variant="Broken" />
                      </PressableScale>
                    </View>
                  </View>

                  <Text
                    style={{ fontFamily: "semibold" }}
                    className="px-6 mt-6 text-[#fffffc]/80"
                  >
                    Адреса на достава
                  </Text>

                  <View className="bg-[#121212]/90 mt-3 px-6 w-full py-4  flex flex-row items-center justify-between">
                    <View className="flex-col items-start">
                      <View className="flex flex-row items-center">
                        <Location
                          size={22}
                          variant="Bulk"
                          color={Colors.primary}
                        />
                        <View className="ml-1.5">
                          <Text
                            className="text-xs text-[#fafafa]/80 uppercase"
                            style={{ fontFamily: "semibold" }}
                          >
                            {order.deliveryAddress?.name}
                          </Text>
                          <Text
                            className="text-[#fafafa]"
                            style={{ fontSize: 16, fontFamily: "medium" }}
                          >
                            {order.deliveryAddress?.street}{" "}
                            {order.deliveryAddress?.streetNumber}
                          </Text>
                        </View>
                      </View>

                      <View className="flex flex-row mt-2 items-center space-x-1">
                        {order.deliveryAddress?.flat && (
                          <View className="p-1 px-2 border border-[#fafafa]/5 rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fafafa]"
                            >
                              Кат - {order.deliveryAddress?.flat}
                            </Text>
                          </View>
                        )}

                        {order.deliveryAddress?.apartment && (
                          <View className="p-1 px-2 border border-[#fafafa]/5 rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fafafa]"
                            >
                              Стан - {order.deliveryAddress?.apartment}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                  <View className="w-full h-[1px] bg-[#fffffc]/5 my-6"></View>
                  <View className="flex px-6 flex-row items-center">
                    <Shop size={18} variant="Bulk" color={Colors.primary} />
                    <Text
                      style={{ fontFamily: "medium" }}
                      className="text-[#fffffc]/80 ml-1"
                    >
                      {order.storeName}
                    </Text>
                  </View>
                  <View className="mt-3 flex flex-col space-y-1">
                    {order.items.map((item, index) => {
                      return (
                        <View
                          key={index}
                          className="bg-[#121212]/90 flex flex-row justify-between items-end py-6 px-6"
                        >
                          <View className="flex flex-row items-center">
                            <View className="flex-1 flex flex-row justify-between items-start">
                              <View>
                                <Text
                                  style={{ fontFamily: "medium" }}
                                  className=" text-[#fffffc]"
                                >
                                  {item?.name}
                                </Text>
                              </View>
                              <Text
                                style={{ fontFamily: "medium" }}
                                className=" text-[#fffffc] text-[16px]"
                              >
                                x{item.quantity}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <View className="mt-1 bg-[#121212]/90 border-b-2 border-[#25D366] py-6 px-6 flex-1 justify-between flex-row items-center">
                    <Text
                      style={{ fontFamily: "medium" }}
                      className="text-[15px] text-[#fffffc]"
                    >
                      Вкупно
                    </Text>
                    <Text
                      className="text-[#25D366] text-[15px]"
                      style={{ fontFamily: "semibold" }}
                    >
                      {order.totalPrice}
                      <Text className="text-white text-xs"> ден</Text>
                    </Text>
                  </View>
                </BottomSheetScrollView>
              </View>
            </BottomSheet>
          </View>
        );
      })}
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 64,
  },
});
