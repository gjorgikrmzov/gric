import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import StoreCard from "../../../components/Cards/storeCard";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Page = () => {

    const { stores } = useSelector((state: RootState) => state.store);
  const { storeTypes } = useSelector((state: RootState) => state.storeType);
  const [coffeeShops, setcoffeeShops] = useState(stores);
  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find((type) => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };

  useEffect(() => {
    const filteredStores = stores.filter(
      (store) => getStoreTypeName(store.storeTypeId) === "Кафе"
    );
    setcoffeeShops(filteredStores);
  }, []);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 px-4 bg-[#fffffc]">
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          className="h-full bg-[#FFFFFC]"
        >
          <View className="w-full">
            <FlatList
              data={coffeeShops}
              className="py-3"
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <StoreCard item={item} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    
    </GestureHandlerRootView>
  );
};

export default Page;
