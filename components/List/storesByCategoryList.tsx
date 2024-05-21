import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../app/reduxStore";
import MiniStoreCard from "../Cards/smallStoreCard";
import { View } from "react-native";

const StoresByCategoryList = () => {
  const storesByCategory = useSelector(
    (state: RootState) => state.store.storesByCategory
  );

  return (
    <FlatList
      data={storesByCategory}
      scrollEnabled={false}
      className="px-4 py-3"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MiniStoreCard item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 6,
        backgroundColor: "#FFFFFC",
      }}
    />
  );
};

export default StoresByCategoryList;
