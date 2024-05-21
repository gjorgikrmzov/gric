import { View, Text, ActivityIndicator, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Heart } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../../app/reduxStore";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const StoreCard = ({ item }: { item: any }) => {
  const router = useRouter();
  const { storeTypes } = useSelector((state: RootState) => state.storeType);
  const [loaded, setLoaded] = useState(true);

  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes?.find((type) => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };

  const handleRouteStoreDetails = (store: any) => {
    const storeTypeName = getStoreTypeName(store.storeTypeId);
    router.push({
      pathname: "/store/[id]",
      params: {
        id: store.id,
        name: store.name,
        isOpen: store.isOpen,
        storeTypeName,
        address: JSON.stringify(store.address),
        imageUrl: store.imageUrl,
      },
    } as any);
  };

  const openingTimeParts = item.openingHour.split(":");
  const openingTime = openingTimeParts[0] + ":" + openingTimeParts[1];

  return (
    <>
      <TouchableOpacity
        className="mt-3 pb-1"
        onPress={() => handleRouteStoreDetails(item)}
      >
        <View className="flex overflow-hidden relative">
          {item.isOpen ? null : (
            <View className="bg-[#0b0b0b]/80 rounded-2xl z-[999] flex justify-center items-center w-full h-40 p-5 absolute overflow-hidden">
              <Text
                style={{ fontFamily: "medium" }}
                className="text-white text-center"
              >
                Отвара во {"\n"} {openingTime} часот
              </Text>
            </View>
          )}

          {!loaded && (
            <View className="absolute h-full bg-[#fafafa] left-0 rounded-2xl top-0 w-full"></View>
          )}

          <Image
            onLoad={() => setLoaded(false)}
            source={{ uri: item.imageUrl }}
            className="absolute h-full left-0 rounded-2xl top-0 w-full"
          />

          <View className="w-full h-40 p-5 relative overflow-hidden">
            <View className="flex flex-row items-center justify-end w-full">
              <TouchableOpacity className="z-[999] flex flex-row items-center">
                <Heart color={Colors.white} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="ml-1 mt-2">
          <View className="flex flex-row w-full justify-between items-start">
            <View className="flex ">
              <Text className="text-[16px]" style={{ fontFamily: "semibold" }}>
                {item.name}
              </Text>
              <Text
                className="text-[#0b0b0b]/60 text-xs"
                style={{ fontFamily: "medium" }}
              >
                {getStoreTypeName(item.storeTypeId)}
              </Text>
            </View>

            <View
              className={
                item.isOpen
                  ? "px-2.5 py-1.5 bg-[#1BD868] flex items-center justify-center rounded-xl"
                  : "px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-xl"
              }
            >
              <Text
                style={{ fontFamily: "medium" }}
                className={
                  item.isOpen ? "text-white text-xs" : "text-xs text-black"
                }
              >
                {item.isOpen ? "Отворено" : "Затворено"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default StoreCard;
