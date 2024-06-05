import { View, Text, ActivityIndicator, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Heart } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../../app/reduxStore";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { PressableScale } from "react-native-pressable-scale";
import getStoreType from "../../utils/getStoreType";

const StoreCard = ({ item }: { item: any }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);

  const handleRouteStoreDetails = (store: any) => {
    const storeType = getStoreType(store.storeType)
    router.push({
      pathname: "/store/[id]",
      params: {
        id: store.id,
        name: store.name,
        isOpen: store.isOpen,
        storeType: storeType,
        address: JSON.stringify(store.address),
        imageUrl: store.imageUrl,
      },
    } as any);
  };

  const openingTimeParts = item.openingHour.split(":");
  const openingTime = openingTimeParts[0] + ":" + openingTimeParts[1];


  return (
    <>
      <PressableScale
        className="mt-3 pb-1"
        onPress={() => handleRouteStoreDetails(item)}
      >
        <View className="flex overflow-hidden relative">
          {item.isOpen ? null : (
            <View className="bg-[#121212]/80 rounded-2xl z-[999] flex justify-center items-center w-full h-40 p-5 absolute overflow-hidden">
              <Text
                style={{ fontFamily: "medium" }}
                className="text-white text-center"
              >
                Отвара во {"\n"} {openingTime} часот
              </Text>
            </View>
          )}

          {!loaded && (
            <View className="absolute h-full bg-[#121212]/90 left-0 rounded-2xl top-0 w-full"></View>
          )}

          {item.imageUrl === null ? (
            <View className="absolute h-full bg-[#121212]/90 left-0 rounded-2xl top-0 w-full"></View>
          ) : null}
          <Image
            onLoad={() => setLoaded(false)}
            source={{ uri: item.imageUrl }}
            className="absolute h-full left-0 rounded-2xl top-0 w-full"
          />

          <View className="w-full h-40 p-4 relative overflow-hidden">
            <View className="flex flex-row items-center justify-end w-full">
              <PressableScale className="z-[999] flex flex-row items-center">
                <Heart color={Colors.white} size={20} />
              </PressableScale>
            </View>
          </View>
        </View>

        <View className="ml-1 mt-2">
          <View className="flex flex-row w-full justify-between items-start">
            <View className="flex ">
              <Text className="text-[16px] text-white" style={{ fontFamily: "semibold" }}>
                {item.name}
              </Text>
              <Text
                className="text-[#ffffff]/60 text-xs"
                style={{ fontFamily: "medium" }}
              >
                {getStoreType(item.storeType)}
              </Text>
            </View>

            <View
              className={
                item.isOpen
                  ? "px-2.5 py-1.5 bg-[#1BD868] flex items-center justify-center rounded-xl"
                  : "px-2.5 py-1.5 bg-[#fafafa]/5 flex items-center justify-center rounded-xl"
              }
            >
              <Text
                style={{ fontFamily: "medium" }}
                className={
                  item.isOpen ? "text-white text-xs" : "text-xs text-white/90"
                }
              >
                {item.isOpen ? "Отворено" : "Затворено"}
              </Text>
            </View>
          </View>
        </View>
      </PressableScale>
    </>
  );
};

export default StoreCard;
