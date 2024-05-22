import {
  View,
  Text,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ArrowDown,
  CloseCircle,
  CloseSquare,
  SaveAdd,
} from "iconsax-react-native";
import Colors from "../../constants/Colors";
import * as Haptics from 'expo-haptics'
import { useComment } from "../commentContext";

const Page = () => {
  
    const { comment, setComment } = useComment();

  return (
    <View className="flex-1 px-6 bg-[#0b0b0b]" style={styles.header}>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
        >
          <CloseSquare variant="Broken" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text
          className="text-lg text-[#fffffc]"
          style={{ fontFamily: "medium" }}
        >
          Коментар
        </Text>
        <Text
          className="text-4xl text-[#1BD868]"
          style={{ fontFamily: "heavy" }}
        >
          G
        </Text>
      </View>

      <View className="mt-8">
        <Text
          style={{ fontFamily: "medium" }}
          className="text-white/80 text-[16px]"
        >
          Остави коментар
        </Text>
        <TextInput
           value={comment}
           onChangeText={setComment}
          style={{ fontFamily: "medium" }}
          className="mt-4 px-3.5 py-6 bg-[#121212]/90 rounded-2xl text-white"
          placeholder="Коментар..."
        />
      </View>

      <Link href={{ pathname: '/cart', params: { comment }}} asChild>
      <Pressable onPress={() => Haptics.impactAsync()}  className="w-full mt-2.5 flex-row py-5 border-2 border-[#fffffc]/70  flex justify-center items-center rounded-2xl">
        <Text style={{ fontFamily: "medium" }} className="text-[#fffffc]">
          Зачувај
        </Text>
        <SaveAdd
          variant="Linear"
          size={24}
          className="ml-2"
          color={Colors.primary}
        />
      </Pressable>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 48 : 28,
    paddingBottom: Platform.OS === "android" ? 20 : 28,
  },
});
