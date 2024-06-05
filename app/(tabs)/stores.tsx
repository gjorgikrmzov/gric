import {
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  Animated,
  Platform,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import {
  ArrowLeft,
  MessageQuestion,
  SearchNormal1,
  Shop,
} from "iconsax-react-native";
import Colors from "../../constants/Colors";
import {} from "react-native-gesture-handler";
import { Easing } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import StoreCard from "../../components/Cards/storeCard";
import { PressableScale } from "react-native-pressable-scale";
import * as Haptics from "expo-haptics";
import { fetchStores } from "../reduxStore/storeSlice";
import { fetchStoresTypes } from "../reduxStore/storeTypeSlice";

const Page = () => {
  const { stores } = useSelector((state: RootState) => state.store);
  const { storeTypes } = useSelector((state: RootState) => state.storeType);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<any>()
  const [filteredStores, setFilteredStores] = useState(stores);
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const searchBarResult = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const [selectedType, setselectedType] = useState<string>("Сите");
  const [refreshing, setRefreshing] = useState(false);

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

  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find((type) => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
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

  const filterStores = () => {
    let filtered = stores;

    if (selectedType === "Храна") {
      filtered = filtered.filter((store) => {
        const storeTypeName = getStoreTypeName(store.storeTypeId);
        return storeTypeName !== "Кафе" && storeTypeName !== "Тобако";
      });
    } else if (selectedType === "Сите") {
      setFilteredStores(stores);
    } else if (selectedType) {
      filtered = filtered.filter(
        (store) => getStoreTypeName(store.storeTypeId) === selectedType
      );
    }

    if (search.trim() !== "") {
      const lowercasedQuery = search.toLowerCase();
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredStores(filtered);
  };

  useEffect(() => {
    filterStores();
  }, [stores, selectedType]);

  const handleTypeFilter = (type: string) => {
    Haptics.selectionAsync();
    setselectedType(type);
    setSearch("");
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchStores(accessToken));
    dispatch(fetchStoresTypes(accessToken)).finally(() => {
      setRefreshing(false)
    });
  };

  return (
    <View style={styles.header} className="bg-[#0b0b0b] flex-1">
      <Animated.View className="px-4 flex flex-row items-center mt-6 pb-3">
        <View className=" bg-[#121212]/90 flex-1 items-center flex-row px-5 rounded-3xl">
          {isFocused ? (
            <PressableScale
              onPress={handleBlur}
              className=" flex justify-center items-center"
            >
              <ArrowLeft size={22} color={Colors.white} variant="Broken" />
            </PressableScale>
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
        className={isFocused ? "flex h-full mt-8 px-6" : "hidden"}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          className="flex flex-1 flex-col "
        >
          {filteredStores.map(
            (store, index) =>
              index < 5 && (
                <PressableScale
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
                </PressableScale>
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

      <View className=" flex flex-row items-center justify-between space-x-2 mx-4">
        <PressableScale
          onPress={() => handleTypeFilter("Сите")}
          className={
            selectedType === "Сите"
              ? "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/90 rounded-2xl bg-[#121212]/90"
              : "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/10 rounded-2xl bg-[#121212]/90"
          }
        >
          <Text style={{ fontFamily: "medium" }} className="text-white">
            Сите
          </Text>
        </PressableScale>

        <PressableScale
          onPress={() => handleTypeFilter("Храна")}
          className={
            selectedType === "Храна"
              ? "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/90 rounded-2xl bg-[#121212]/90"
              : "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/10 rounded-2xl bg-[#121212]/90"
          }
        >
          <Text style={{ fontFamily: "medium" }} className="text-white">
            Храна
          </Text>
        </PressableScale>

        <PressableScale
          onPress={() => handleTypeFilter("Тобако")}
          className={
            selectedType === "Тобако"
              ? "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/90 rounded-2xl bg-[#121212]/90"
              : "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/10 rounded-2xl bg-[#121212]/90"
          }
        >
          <Text style={{ fontFamily: "medium" }} className="text-white">
            Тобако
          </Text>
        </PressableScale>

        <PressableScale
          onPress={() => handleTypeFilter("Кафе")}
          className={
            selectedType === "Кафе"
              ? "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/90 rounded-2xl bg-[#121212]/90"
              : "flex justify-center items-center flex-1 py-3 border-2 border-[#fff]/10 rounded-2xl bg-[#121212]/90"
          }
        >
          <Text style={{ fontFamily: "medium" }} className="text-white">
            Кафе
          </Text>
        </PressableScale>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={Colors.white}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        className="h-full bg-[#0b0b0b] px-4 mt-4"
      >
        <View className="w-full">
          <FlatList
            data={filteredStores}
            scrollEnabled={false}
            className=""
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StoreCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 44 : 38,
  },
  input: {
    paddingVertical: Platform.OS === "android" ? 16 : 22,
    fontFamily: "medium",
  },
});
