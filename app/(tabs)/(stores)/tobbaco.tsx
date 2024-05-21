import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import StoreCard from "../../../components/Cards/storeCard";
import {  useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Page = () => {

  
  const { stores } = useSelector((state: RootState) => state.store);
  const { storeTypes } = useSelector((state: RootState) => state.storeType);
  const [tobbacoShops, setcoffeeShops] = useState(stores);
  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find((type) => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };

  useEffect(() => {
    const filteredStores = stores.filter(
      (store) => getStoreTypeName(store.storeTypeId) === "Тобако"
    );
    setcoffeeShops(filteredStores);
  }, []);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 px-4 bg-[#0b0b0b]">
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          className="h-full bg-[#0b0b0b]"
        >
          <View className="w-full">
            <FlatList
              data={tobbacoShops}
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
