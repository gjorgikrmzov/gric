import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../app/reduxStore";
import MiniStoreCard from "../Cards/smallStoreCard";
import { View } from "react-native";
import { MessageQuestion } from "iconsax-react-native";
import Colors from "../../constants/Colors";

const StoresByCategoryList = () => {
  const storesByCategory = useSelector(
    (state: RootState) => state.store.storesByCategory
  );

  return (
    <>
      {storesByCategory.length === 0 ? (
        <View className="top-1/2 flex  justify-center items-center">
          <View className="flex justify-center items-center w-28 h-28 rounded-3xl bg-[#121212]/90">
            <MessageQuestion size={56} variant="Bulk" color={Colors.white} />
          </View>
          <Text
            style={{ fontFamily: "medium" }}
            className="text-white text-[16px] text-center mt-4"
          >
            Нема пронајдено резултати
          </Text>
        </View>
      ) : (
        <FlatList
          data={storesByCategory}
          scrollEnabled={false}
          className="px-4 py-2"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MiniStoreCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 6,
            backgroundColor: "#0b0b0b",
          }}
        />
      )}
    </>
  );
};

export default StoresByCategoryList;
