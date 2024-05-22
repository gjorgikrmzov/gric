import { Text, Pressable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArchiveTick, ArrowRight, Map1 } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";

const Page = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0b0b0b]">
      <Animated.View className="flex-1 flex justify-center items-center">
        <Animated.View
          className="flex relative top-0"
          entering={FadeInDown.springify().duration(1000).delay(100)}
        >
          <ArchiveTick variant="Bulk" size={56} color={Colors.primary} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.springify().duration(1000).delay(150)}
          style={{ fontFamily: "medium" }}
          className="text-white mt-3 text-lg"
        >
          Успешно нарачавте
        </Animated.Text>
      </Animated.View>

      <View className="gap-y-3 px-6">
        <Pressable
          className="border rounded-2xl py-5 flex flex-row items-center justify-center  border-[#fffffc] "
          onPress={() => router.push("/(tabs)/")}
        >
          <Text className="text-white" style={{ fontFamily: "medium" }}>
            Врати се на почетна
          </Text>
          <ArrowRight
            variant="Broken"
            size={20}
            className="ml-2"
            color={Colors.primary}
          />
        </Pressable>

        <View className="flex flex-row justify-center items-center gap-x-2">
          <View className="w-20 h-[1px] bg-[#fffffc]/10"></View>
          <Text
            style={{ fontFamily: "medium" }}
            className="text-center text-[#fffffc]/50 text-xs"
          >
            или
          </Text>
          <View className="w-20 h-[1px] bg-[#fffffc]/10"></View>
        </View>

        <Pressable
          className="border rounded-2xl py-5 flex flex-row items-center justify-center  border-[#fffffc] mb-4 "
          onPress={() => router.push("/(order)/trackOrder")}
        >
          <Text className="text-white" style={{ fontFamily: "medium" }}>
            Прати ја нарачката
          </Text>
          <Map1
            variant="Broken"
            size={20}
            className="ml-2"
            color={Colors.primary}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Page;
