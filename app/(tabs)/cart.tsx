import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Add,
  AddSquare,
  ArrowRight,
  ArrowRight2,
  CloseSquare,
  DocumentText,
  Minus,
  Send,
  Shop,
  ShoppingCart,
  TickSquare,
  Trash,
} from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItem,
  selectCartTotal,
  updateItemQuantity,
} from "../reduxStore/cartSlice";
import { RootState } from "../reduxStore";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { useComment } from "../commentContext";
import { PressableScale } from "react-native-pressable-scale";

interface CartItemType {
  id: string;
  name: string;
  price: string;
  storeId: string;
  quantity: number;
  imageUrl: string;
}

interface CartItemProps {
  cartItem: {
    id: string;
    name: string;
    price: string;
    storeId: string;
    quantity: number;
    imageUrl: string;
  };
  handleIncreaseQuantity: (
    storeId: string,
    itemId: string,
    quantity: number
  ) => void;
  handleDecreaseQuantity: (
    storeId: string,
    itemId: string,
    quantity: number
  ) => void;
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ cartItem, handleIncreaseQuantity, handleDecreaseQuantity }) => (
    <View className="py-5 border-b border-[#0b0b0b]/5 px-6">
      <View className="flex flex-row items-center">
        <Image
          source={cartItem.imageUrl}
          className="flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden"
        />
        <View className="flex flex-row items-center justify-between flex-1">
          <View className="flex flex-col ml-3 flex-1">
            <Text className="text-[#fffffc]" style={{ fontFamily: "semibold" }}>
              {cartItem.name}
            </Text>
            <Text
              className="mt-1 text-[#fffffc]/60"
              style={{ fontFamily: "semibold" }}
            >
              {cartItem.price} ден
            </Text>
          </View>
          <View className="bg-[#121212]/90 px-1 py-1 flex-row items-center rounded-xl justify-between w-24">
            <PressableScale
              onPress={() =>
                handleDecreaseQuantity(
                  cartItem.storeId,
                  cartItem.id,
                  cartItem.quantity
                )
              }
              className="bg-[#121212]/90 flex justify-center items-center w-7 h-7 rounded-lg"
            >
              {cartItem?.quantity === 1 ? (
                <Trash size={20} color={Colors.white} variant="Linear" />
              ) : (
                <Minus size={20} color={Colors.white} variant="Linear" />
              )}
            </PressableScale>
            <Text className="text-[#fffffc]">{cartItem.quantity}</Text>
            <PressableScale
              onPress={() =>
                handleIncreaseQuantity(
                  cartItem.storeId,
                  cartItem.id,
                  cartItem.quantity
                )
              }
              className="bg-[#121212]/90 flex justify-center items-center w-7 h-7 rounded-lg"
            >
              <Add size={20} color={Colors.white} variant="Linear" />
            </PressableScale>
          </View>
        </View>
      </View>
    </View>
  )
);

const Page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector(selectCartTotal);

  const { comment } = useComment();

  const handleIncreaseQuantity = (
    storeId: string,
    itemId: string,
    quantity: number
  ) => {
    dispatch(
      updateItemQuantity({ storeId, id: itemId, quantity: quantity + 1 })
    );
    Haptics.selectionAsync();
  };

  const handleDecreaseQuantity = (
    storeId: string,
    itemId: string,
    quantity: number
  ) => {
    if (quantity > 1) {
      dispatch(
        updateItemQuantity({ storeId, id: itemId, quantity: quantity - 1 })
      );
    } else {
      Alert.alert("Избриши продукт", "Дали сакате да го избришете продуктот?", [
        { text: "Не", style: "cancel" },
        {
          text: "Да",
          onPress: () => {
            dispatch(removeItem({ id: itemId }));
          },
        },
      ]);
    }
    Haptics.selectionAsync();
  };

  const handleRemoveCart = () => {
    Alert.alert("Избриши Корпа", "Дали сакате да ја избришете корпата?", [
      { text: "Не", style: "cancel" },
      {
        text: "Да",
        onPress: () => {
          dispatch(clearCart());
        },
      },
    ]);
  };

  const renderItem = useCallback(
    ({ item }: { item: CartItemType }) => (
      <CartItem
        cartItem={item}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
    ),
    [handleIncreaseQuantity, handleDecreaseQuantity]
  );

  return (
    <GestureHandlerRootView>
      <View className="flex-1 flex flex-col  bg-[#0b0b0b]">
        <View
          style={styles.header}
          className="full px-6 flex flex-row justify-between items-center"
        >
          <View className="flex flex-row items-center">
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "semibold" }}
            >
              Корпа
            </Text>
          </View>
          <PressableScale
            onPress={() => router.push("/(order)/orders")}
            className="px-4 bg-[#121212]/90 rounded-2xl py-3"
          >
            <Text style={{ fontFamily: "semibold" }} className="text-white">
              Нарачки
            </Text>
          </PressableScale>
        </View>

        <View
          className={
            cartItems.length == 0
              ? "hidden"
              : "flex-1 mt-4 border-t border-[#0b0b0b]/5"
          }
        >
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View className="w-full h-1 bg-[#757780]/10"></View>
          <View className="px-6">
            <PressableScale
              onPress={handleRemoveCart}
              className="w-full flex-row flex items-center justify-between"
            >
              <View className="py-6 border-b flex flex-row items-center justify-between border-[#fffffc]/5  w-full">
                <View className=" flex flex-row">
                  <Trash color={Colors.white} size={20} variant="Broken" />
                  <Text
                    className="text-[#fffffc] ml-3 "
                    style={{ fontFamily: "medium" }}
                  >
                    Избриши корпа
                  </Text>
                </View>
              </View>
            </PressableScale>

            <PressableScale
              onPress={() =>
                router.push({ pathname: "/orderComment", params: { comment } })
              }
              className="w-full flex-row flex items-center justify-between"
            >
              <View className="py-6 border-b flex flex-row items-center justify-between border-[#fffffc]/5  w-full">
                <View className=" flex flex-row">
                  <DocumentText
                    color={Colors.white}
                    size={20}
                    variant="Broken"
                  />

                  {comment ? (
                    <View className="flex ml-3 flex-row items-center">
                      <Text
                        className="text-[#fffffc] "
                        style={{ fontFamily: "medium" }}
                      >
                        Коментар:{" "}
                      </Text>
                      <Text
                        className="text-[#fffffc]/60 "
                        style={{ fontFamily: "medium" }}
                      >
                        {comment}
                      </Text>
                    </View>
                  ) : (
                    <Text  className="text-[#fffffc] ml-3 "
                    style={{ fontFamily: "medium" }}>Остави коментар</Text>
                  )}
                </View>
                {comment ? (
                  <TickSquare color={Colors.primary} variant="Bulk" size={20} />
                ) : (
                  <AddSquare color={Colors.white} size={20} />
                )}
              </View>
            </PressableScale>

            <View className="flex flex-row my-6 justify-between items-center">
              <Text
                style={{ fontFamily: "semibold" }}
                className="text-[16px] text-white"
              >
                Без достава
              </Text>
              <Text
                style={{ fontFamily: "semibold" }}
                className="text-[16px] text-white"
              >
                {subtotal} ден
              </Text>
            </View>
          </View>

          <View className="px-6 mb-4 flex">
            <PressableScale
              onPress={() =>
                router.push({
                  pathname: "/(order)/checkout",
                  params: { subtotal, cartItems },
                } as any)
              }
              className="w-full flex-row py-6 border-2 border-[#1BD868]  flex justify-center items-center rounded-3xl"
            >
              <Text style={{ fontFamily: "medium" }} className="text-[#fffffc]">
                Кон наплата
              </Text>
              <ArrowRight
                variant="Linear"
                size={24}
                className="ml-2"
                color={Colors.primary}
              />
            </PressableScale>
          </View>
        </View>

        <View
          className={
            cartItems.length == 0
              ? "flex-1 justify-center items-center"
              : "hidden"
          }
        >
          <View className="flex justify-center items-center w-28 h-28 rounded-3xl bg-[#121212]/90">
            <ShoppingCart size={56} variant="Bulk" color={Colors.primary} />
          </View>

          <Text
            className="text-[#fffffc] text-xl mt-4 text-center"
            style={{ fontFamily: "medium" }}
          >
            Вашата корпа {"\n"} е празна
          </Text>
        </View>

        <View className="px-6">
          <PressableScale
            onPress={() => router.push("/stores")}
            className={
              cartItems.length == 0
                ? "mb-4 w-full flex-row py-6 border-2 border-[#1BD868] bg-[#121212]/90 flex justify-center items-center rounded-3xl"
                : "hidden"
            }
          >
            <Shop variant="Bulk" size={24} color={Colors.primary} />
            <Text
              style={{ fontFamily: "medium" }}
              className="text-[#fffffc] ml-2"
            >
              Пребарај Ресторани
            </Text>
          </PressableScale>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 38 : 54,
  },
});
