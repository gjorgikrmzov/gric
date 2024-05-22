import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Box,
  Card,
  ExportSquare,
  Location,
  LocationAdd,
  Receipt1,
} from "iconsax-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet/";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../reduxStore";
import { clearCart } from "../reduxStore/cartSlice";
import * as Haptics from "expo-haptics";
import { useComment } from "../commentContext";

const Page = () => {
  const { subtotal } = useLocalSearchParams();
  const personId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch<any>();

  const { addresses } = useSelector((state: RootState) => state.addresses);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const {comment, setComment} = useComment();

  const deliveryCost = 100;
  const subtotalNumber = Number(subtotal) || 0;
  const total: number = subtotalNumber + deliveryCost;

  const snapPoints = useMemo(() => ["40%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [cardPayment, setcardPayment] = useState(false);
  const [ondeliveryPayment, setondeliveryPayment] = useState(true);

  const handleSelectCardPayment = () => {
    Haptics.selectionAsync();
    setcardPayment(true);
    setondeliveryPayment(false);
  };

  const handleSelectOnDeliveryPayment = () => {
    Haptics.selectionAsync();
    setondeliveryPayment(true);
    setcardPayment(false);
  };

  const storeId = cartItems.length > 0 ? cartItems[0].storeId : "";
  const selectedAddress = addresses.find(
    (address) => address.isSelected === true
  );

  const createOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        storeItemId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch("http://172.20.10.2:8080/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          customerId: personId,
          storeId: storeId,
          deliveryAddressId: selectedAddress?.id,
          status: "CREATED",
          comment: comment,
          items: items,
        }),
      });

      if (response.ok) {
        router.push("/orderPlaced");
        setComment('');
        dispatch(clearCart());
      }
    } catch (error) {
        console.log(error)
    }
  };
  
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full flex flex-col justify-start bg-[#0b0b0b]">
        <View className="px-6 py-4 flex flex-row gap-x-3 items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
          >
            <ArrowLeft variant="Broken" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text
            className="text-lg text-[#fafafa]"
            style={{ fontFamily: "medium" }}
          >
            Наплата
          </Text>

          <Text
            className="text-4xl text-[#1BD868]"
            style={{ fontFamily: "heavy" }}
          >
            G
          </Text>
        </View>

        <View className="flex-1 mb-4">
          <ScrollView className="flex-1 mb-4">
            <View className="w-full mt-3">
              <View className=" px-6 ">
                <Text
                  className=" text-[#fffffc]/60"
                  style={{ fontFamily: "medium" }}
                >
                  Ваши адреси
                </Text>
                <Text
                  className="text-lg text-[#fffffc]"
                  style={{ fontFamily: "medium" }}
                >
                  Адреса на достава
                </Text>
              </View>

              <View className="w-full mt-3">
                {selectedAddress ? (
                  <TouchableOpacity className="border-b border-[#fafafa]/5 px-6 w-full py-4  flex flex-row items-center justify-between">
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
                            {selectedAddress.name}
                          </Text>
                          <Text
                            className="text-[#fafafa]"
                            style={{ fontSize: 16, fontFamily: "medium" }}
                          >
                            {selectedAddress.street.length > 15
                              ? `${selectedAddress.street.substring(0, 15)}...`
                              : selectedAddress.street}{" "}
                            {selectedAddress.streetNumber}
                          </Text>
                        </View>
                      </View>

                      <View className="flex flex-row mt-2 items-center space-x-1">
                        {selectedAddress.flat && (
                          <View className="p-1 px-2 border border-[#fafafa]/5 rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fafafa]"
                            >
                              Кат - {selectedAddress.flat}
                            </Text>
                          </View>
                        )}

                        {selectedAddress.apartment && (
                          <View className="p-1 px-2 border border-[#fafafa]/5 rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fafafa]"
                            >
                              Стан - {selectedAddress.apartment}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => router.push("/(modals)/manageAddresses")}
                      className="p-3"
                    >
                      <ExportSquare
                        variant="Linear"
                        size={20}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => router.push("/manageAddresses")}
                      className="border-b border-[#fffffc]/5 px-6 w-full py-6  flex flex-row items-center justify-start"
                    >
                      <LocationAdd
                        variant="Bold"
                        className=""
                        size={22}
                        color={Colors.white}
                      />
                      <Text
                        style={{ fontFamily: "medium" }}
                        className="ml-2 text-[16px] text-[#0b0b0b]"
                      >
                        Додај адреса
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View className="w-full px-6 mt-6">
              <View>
                <Text
                  className=" text-[#fffffc]/60"
                  style={{ fontFamily: "medium" }}
                >
                  Избери
                </Text>
                <Text
                  className="text-lg text-[#fffffc]"
                  style={{ fontFamily: "medium" }}
                >
                  Начин на плаќање
                </Text>
                {/* <View className='flex mt-2 flex-row items-center'>
                                    <Money size={22} variant='Bold' color={Colors.dark} />
                                    <Text className='ml-2 text-[16px] text-[#fffffc]' style={{ fontFamily: 'medium' }}>Плаќањето се врши при достава!</Text>
                                </View> */}
              </View>
              <View className="flex flex-row gap-x-2 mt-3">
                <Pressable
                  onPress={handleSelectCardPayment}
                  className={
                    cardPayment
                      ? " flex flex-col bg-[#121212]/90 justify-between border-2 border-[#fffffc] flex-1 p-3.5 rounded-2xl"
                      : " border-2 bg-[#121212]/90 border-[#fffffc]/5 flex flex-col justify-between flex-1 p-3.5 rounded-2xl"
                  }
                >
                  <View className="flex-1 justify-between items-center flex-row">
                    <Card
                      size={24}
                      color={cardPayment ? Colors.primary : Colors.white}
                      variant={cardPayment ? "Bold" : "Linear"}
                    />
                  </View>
                  <Text
                    className="text-[#fffffc] mt-6"
                    style={{ fontFamily: "medium" }}
                  >
                    Со Картичка
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSelectOnDeliveryPayment}
                  className={
                    ondeliveryPayment
                      ? " flex flex-col bg-[#121212]/90 justify-between border-2 border-[#fffffc] flex-1 p-3.5 rounded-2xl"
                      : "border-2 bg-[#121212]/90 border-[#fffffc]/5 flex flex-col justify-between flex-1 p-3.5 rounded-2xl"
                  }
                >
                  <View className="flex-1 justify-between items-center flex-row">
                    <Box
                      size={24}
                      color={ondeliveryPayment ? Colors.primary : Colors.white}
                      variant={ondeliveryPayment ? "Bold" : "Linear"}
                    />
                  </View>
                  <Text
                    className="text-[#fffffc] mt-6"
                    style={{ fontFamily: "medium" }}
                  >
                    При достава
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>

        <BottomSheet
          index={0}
          backgroundStyle={{ backgroundColor: "#0b0b0b" }}
          handleIndicatorStyle={{ backgroundColor: Colors.dark }}
          snapPoints={snapPoints}
        >
          <View className="w-full h-full py-6  justify-between flex flex-col">
            <View className="px-6">
              <View className="w-full flex-row items-center  justify-between flex">
                <Text
                  className="text-[#fafafa]/70"
                  style={{ fontFamily: "medium" }}
                >
                  Износ без достава
                </Text>
                <Text
                  className=" text-[#fafafa]"
                  style={{ fontFamily: "bold" }}
                >
                  {subtotal} ден
                </Text>
              </View>

              <View className="w-full flex-row items-center  mt-5 justify-between flex">
                <Text
                  className="text-[#fafafa]/70"
                  style={{ fontFamily: "medium" }}
                >
                  Достава
                </Text>
                <Text
                  className=" text-[#fafafa]"
                  style={{ fontFamily: "bold" }}
                >
                  {deliveryCost} ден
                </Text>
              </View>

              <View className=" border-b-0 border border-dashed border-[#fffffc]/10  mt-5"></View>

              <View className="w-full flex-row items-center  mt-5 justify-between flex">
                <Text
                  className="text-[#fafafa]/70"
                  style={{ fontFamily: "medium" }}
                >
                  Вкупно
                </Text>
                <Text
                  className=" text-[#fafafa]"
                  style={{ fontFamily: "bold" }}
                >
                  {total} ден
                </Text>
              </View>
            </View>

            <View className="px-6 mb-4">
              <TouchableOpacity
                onPress={createOrder}
                className="w-full flex-row py-6 border-2 border-[#1BD868] flex justify-center items-center rounded-2xl"
              >
                <Text
                  style={{ fontFamily: "medium" }}
                  className="text-[#fffffc]"
                >
                  Нарачај
                </Text>
                <Receipt1
                  variant="Bulk"
                  className="ml-2"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Page;
