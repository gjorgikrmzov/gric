import { View, Text, FlatList, ScrollView, Keyboard, Easing, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import StoreCard from "../../../components/Cards/storeCard";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ArrowLeft, MessageQuestion, SearchNormal1, Shop } from "iconsax-react-native";
import Colors from "../../../constants/Colors";
import { Animated } from "react-native";
import { router } from "expo-router";

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

  const [search, setSearch] = useState<string>("");

  const [filteredStores, setFilteredStores] = useState(stores);
  const inputRef = useRef<TextInput>(null);
  const [foodShops, setfoodShops] = useState(stores);
  const [isFocused, setIsFocused] = useState(false);
  const searchBarResult = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredStores(stores);
    } else {
      const lowercasedQuery = search.toLowerCase();
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredStores(filtered);
    }
  }, [search, stores]);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };


  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: -40,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 0,
        easing: Easing.circle,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: 0,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRouteStoreDetails = (store: any) => {
    const storeTypeName = getStoreTypeName(store.storeTypeId);
    router.push({
      pathname: "/store/[id]",
      params: {
        id: store.id,
        name: store.name,
        storeTypeName,
        isOpen: store.isOpen,
        address: JSON.stringify(store.address),
        imageUrl: store.imageUrl,
      },
    });
  };


  return (
    <GestureHandlerRootView>
      <View className="flex-1 px-4 bg-[#0b0b0b]">
      <Animated.View className="flex flex-row items-center mt-6 ">
          <View className=" bg-[#121212]/90 flex-1 items-center flex-row px-5 rounded-3xl">
            {isFocused ? (
              <TouchableOpacity
                onPress={handleBlur}
                className=" flex justify-center items-center"
              >
                <ArrowLeft size={22} color={Colors.white} variant="Broken" />
              </TouchableOpacity>
            ) : (
              <SearchNormal1
                size={22}
                color="#fffffc97"
                className="flex justify-center items-center"
                variant="Broken"
              />
            )}

            <TextInput
              onChangeText={handleSearchChange}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={search}
              className="text-[#fffffc] px-3 flex-1 "
              style={styles.input}
              placeholder="Пребарај"
              placeholderTextColor="#fffffc97"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateY: searchBarResult }] }}
          className={isFocused ? "flex h-full mt-12 px-2" : "hidden"}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            className="flex flex-1 flex-col "
          >
            {filteredStores.map(
              (store, index) =>
                index < 5 && (
                  <TouchableOpacity
                    onPress={() => handleRouteStoreDetails(store)}
                    key={index}
                    className="w-full flex-row  flex items-center justify-between"
                  >
                    <View className="flex items-center flex-row gap-x-4">
                      <Shop color={Colors.primary} size={25} variant="Broken" />
                      <View className="py-6 border-b border-[#fffffc]/10  w-full">
                        <Text
                          className="text-[#fffffc] text-[16px] "
                          style={{ fontFamily: "medium" }}
                        >
                          {store.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            )}

            {filteredStores.length === 0 ? (
              <View className="flex-1 mt-6 justify-center items-center flex ">
                <View className="w-14 h-14 bg-[#121212]/90 flex justify-center items-center rounded-lg">
                  <MessageQuestion
                    size={26}
                    color={Colors.white}
                    variant="Bulk"
                  />
                </View>
                <Text
                  className="text-center mt-2 text-[#fffffc]/60 text-[16px]"
                  style={{ fontFamily: "medium" }}
                >
                  Нема пронајдено {"\n"} резултати
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </Animated.View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          className="h-full bg-[#0b0b0b]"
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

const styles = StyleSheet.create({
  input: {
    paddingVertical: Platform.OS === "android" ? 16 : 22,
    fontFamily: "medium",
  },
});