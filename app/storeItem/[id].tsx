import { View, Text, Platform, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Add,
  Archive,
  ArrowDown,
  Minus,
  ShoppingCart,
} from "iconsax-react-native";
import { TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../reduxStore/cartSlice";
import { RootState } from "../reduxStore";
import { Image } from "expo-image";
import { fetchOrder } from "../reduxStore/orderSlice";

const Page = () => {
  const { imageUrl, storeId, id, name, description, price, isOpen, category } =
    useLocalSearchParams<{
      imageUrl: string;
      storeId: string;
      id: string;
      name: string;
      description: string;
      price: any;
      isOpen: string;
      category: any;
    }>();

  const { orders } = useSelector((state: RootState) => state.orders);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const dispatch = useDispatch<any>();
  const isStoreOpen =
    isOpen === "true" ? true : isOpen === "false" ? false : isOpen;
    
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const itemPrice = parseFloat(price);
  const totalItemPrice: number = itemQuantity * itemPrice;

  const decreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (itemQuantity < 99) {
      setItemQuantity(itemQuantity + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchOrder(accessToken));
  }, []);

  const handleAddToCart = () => {
    const differentStoreItemExists = cartItems.some(
      (cartItem) => cartItem.storeId !== storeId
    );

    if (orders.length !== 0) {
      Alert.alert(
        "Нарачка во тек",
        "Имате нарача во тек, ке можете да нарачате повторно кога ке се заврши веке постоечката.",
        [{ text: "Во ред", style: "cancel" }]
      );
      return false;
    }

    if (!isStoreOpen) {
      Alert.alert(
        "Продавницата е затворена",
        "Во моментов сме затворени. Дојдете подоцна",
        [{ text: "Во ред", style: "cancel" }]
      );
      return false;
    }

    if (differentStoreItemExists) {
      Alert.alert(
        "Корпа",
        "Вашата корпа содржи продукти од различни продавници. Дали сакате да ги избришете и да ги додадете новите?",
        [
          { text: "Не", style: "cancel" },
          {
            text: "Да",
            onPress: () => {
              dispatch(clearCart());
              dispatch(
                addItem({
                  storeId,
                  id,
                  quantity: itemQuantity,
                  name,
                  price,
                  imageUrl,
                } as any)
              );
              router.back();
            },
          },
        ]
      );
      return true;
    } else {
      dispatch(
        addItem({
          storeId,
          id,
          quantity: itemQuantity,
          name,
          price,
          imageUrl,
        } as any)
      );
      router.back();
    }
  };

  return (
    <View style={styles.header} className="h-full bg-[#121212]">
      <View className="bg-[#121212]/90 px-6 h-44 ">
        <View className="flex flex-row justify-between items-center w-full">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full"
          >
            <ArrowDown variant="Broken" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 bg-[#0b0b0b]">
        <View className="mt-6 px-6">
          <View className="flex items-center flex-row">
            <Archive variant="Bulk" size={18} color={Colors.primary} />
            <Text
              className="text-[#fffffc]/60 uppercase ml-1"
              style={{ fontFamily: "bold" }}
            >
              {category}
            </Text>
          </View>
          <Text
            className="text-2xl text-[#fffffc] mt-1"
            style={{ fontFamily: "semibold" }}
          >
            {name}
          </Text>
          <Text className="text-[#fffffc]/80" style={{ fontFamily: "medium" }}>
            {description}
          </Text>
          <Text
            className="text-[#fffffc] text-lg mt-3"
            style={{ fontFamily: "semibold" }}
          >
            {price}{" "}
            <Text
              style={{ fontFamily: "medium" }}
              className="text-[#fffffc]/60 text-sm"
            >
              ден
            </Text>
          </Text>
        </View>

        <View style={styles.bottomButton} className="absolute flex flex-row items-center px-6 gap-x-3">
          <View className=" bg-[#121212]/90 border-2 border-[#fffffc] p-1 flex-row items-center rounded-2xl justify-between ">
            <TouchableOpacity
              onPress={decreaseQuantity}
              className="flex justify-center items-center w-12 h-10 rounded-xl "
            >
              <Minus size={20} color={Colors.white} variant="Linear" />
            </TouchableOpacity>

            <Text className="text-[16px] text-[#fafafa]">{itemQuantity}</Text>

            <TouchableOpacity
              onPress={increaseQuantity}
              className="flex justify-center items-center w-12 h-10 rounded-xl "
            >
              <Add size={20} color={Colors.white} variant="Linear" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 flex-row py-3.5  bg-[#121212]/90 border-2 border-[#1BD868] flex justify-center items-center rounded-2xl"
          >
            <ShoppingCart variant="Bulk" size={22} color={Colors.primary} />
            <Text
              style={{ fontFamily: "medium" }}
              className="text-[#FFFFFC] ml-2"
            >
              Додај во Корпа
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 30,
  },
  bottomButton: {
    bottom: Platform.OS === "android" ? 16 : 40,
  }
});
