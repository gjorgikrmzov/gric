import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Platform,
  TextInput,
  Keyboard,
  SafeAreaView,
  FlatList,
  Pressable,
  findNodeHandle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Notification1,
  SearchNormal1,
  User,
  Location,
  Shop,
  ArrowDown2,
  Heart,
  ArrowLeft,
  RecordCircle,
  Timer,
  MessageQuestion,
  BoxSearch,
  ReceiptSearch,
  FilterSearch,
  Filter,
  ArrowCircleRight,
} from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { Image } from "expo-image";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores, fetchStoresByCategory } from "../reduxStore/storeSlice";
import { fetchStoresTypes } from "../reduxStore/storeTypeSlice";
import { RootState } from "../reduxStore";
import { fetchCategories } from "../reduxStore/categorySlice";
import { fetchAddress } from "../reduxStore/addressSlice";
import StoresList from "../../components/List/allStoresList";
import SkeletonList from "../../components/List/skeletonList";

const Page = () => {
  const dispatch = useDispatch<any>();

  const { stores } = useSelector((state: RootState) => state.store);
  const { storeTypes } = useSelector((state: RootState) => state.storeType);
  const { categories } = useSelector((state: RootState) => state.category);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const { addresses } = useSelector((state: RootState) => state.addresses);
  const personId = useSelector((state: RootState) => state.user.id);

  const [refreshing, setRefreshing] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filteredStores, setFilteredStores] = useState(stores);
  const [loadingStores, setloadingStores] = useState(true);

  const overlayOpacity = useSharedValue(1);
  const searchResult = useSharedValue(0);
  const inputY = useSharedValue(0);

  const [orderExists, setorderExists] = useState(false);

  useEffect(() => {
    if (accessToken) {
      Promise.all([
        setloadingStores(false),
        dispatch(fetchStores(accessToken)),
        dispatch(fetchStoresTypes(accessToken)),
        dispatch(fetchCategories(accessToken)),
        dispatch(fetchAddress({ personId, accessToken })),
      ])
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }, [personId, accessToken, dispatch]);

  const onFocus = () => {
    setIsFocused(true);
    inputY.value = withTiming(-70, {
      easing: Easing.elastic(),
      duration: 350,
    });
    overlayOpacity.value = withTiming(0, {
      duration: 100,
    });

    searchResult.value = withTiming(1);
  };

  const onBlur = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    inputY.value = withTiming(10, {
      duration: 350,
      easing: Easing.elastic(),
    });

    overlayOpacity.value = withTiming(1);
    searchResult.value = withTiming(0);
  };

  const animatedInputStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: inputY.value }],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

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
    const storeType = storeTypes?.find((type) => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };

  const onRefresh = () => {
    setRefreshing(true);
    setloadingStores(true);
    dispatch(fetchStores(accessToken));
    dispatch(fetchStoresTypes(accessToken)).finally(() => {
      setRefreshing(false), setloadingStores(false);
    });
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

  const selectedAddress = addresses.find(
    (address) => address.isSelected === true
  );

  const renderCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Бургер":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/burger.svg")}
          />
        );
      case "Пица":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/pizza.svg")}
          />
        );
      case "Кафе":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/coffe.svg")}
          />
        );
      case "Десерт":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/donut.svg")}
          />
        );
      case "Паста":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/pasta.svg")}
          />
        );
      case "Месо":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/meet.svg")}
          />
        );

      case "Тако":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/cake.svg")}
          />
        );

      case "Сендвич":
        return (
          <Image
            tintColor={Colors.white}
            className="w-10 top-5 h-10 z-10 self-center"
            source={require("../../assets/images/bread.svg")}
          />
        );
    }
  };

  return (
    <>
      <View className="w-screen  h-screen absolute z-0 left-0 top-0 bg-[#0b0b0b]"></View>

      <SafeAreaView className="flex-1" style={styles.header}>
        <StatusBar style="light" />

        <View className="bg-[#0b0b0b] z-0 border-b  border-[#757780]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row ">
          <TouchableOpacity
            onPress={() => router.push("/(modals)/manageAddresses")}
          >
            <View className="flex items-center flex-row ml-1">
              <Location size={14} color={Colors.primary} variant="Bulk" />
              <Text
                className="text-[#fffffc]/60 ml-1 text-xs"
                style={{ fontFamily: "medium" }}
              >
                Достави на
              </Text>
              <ArrowDown2
                className="ml-0.5"
                size={12}
                color={"#fafafa80"}
                variant="Linear"
              />
            </View>
            <View className="rounded-2xl mt-1 px-6 py-2.5 flex items-center justify-center bg-[#121212]/90">
              {selectedAddress?.street ? (
                <Text
                  className="text-[#fffffc]"
                  style={{ fontFamily: "medium" }}
                >
                  {selectedAddress.street.length > 12
                    ? `${selectedAddress.street.substring(0, 12)}...`
                    : selectedAddress.street}
                </Text>
              ) : (
                <Text
                  className="text-[#fffffc]"
                  style={{ fontFamily: "medium" }}
                >
                  Внесете адреса
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-x-2">
            <TouchableOpacity
              onPress={() => router.push("/(user)/notifications")}
              className="w-14 h-14 flex justify-center items-center rounded-full border border-[#fffffc]/5"
            >
              <Notification1 color={Colors.white} size={20} variant="Broken" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(user)/profile")}
              className="w-14 h-14 flex justify-center items-center rounded-full border border-[#fffffc]/5"
            >
              <User color={Colors.white} size={20} variant="Broken" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={Colors.white}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Animated.View style={animatedOverlayStyle} className="mt-4 px-6">
            <View className="flex flex-col">
              <Animated.Text
                entering={FadeInDown.springify().duration(1000).delay(100)}
                className="text-4xl text-[#1BD868]"
                style={{ fontFamily: "heavy" }}
              >
                GRIC
              </Animated.Text>
              <Animated.Text
                entering={FadeInDown.springify().duration(1000).delay(200)}
                className="mt-[-3px] text-[#fffffc]/80"
                style={{ fontFamily: "heavy" }}
              >
                DELIVERY
              </Animated.Text>
            </View>
          </Animated.View>

          <View>
            <Animated.View className="mt-3" style={animatedInputStyle}>
              <View className="mx-6 z-[999] items-center bg-[#121212]/90 flex-row px-5 rounded-3xl">
                {isFocused ? (
                  <TouchableOpacity
                    onPress={onBlur}
                    className=" flex justify-center items-center"
                  >
                    <ArrowLeft
                      size={20}
                      color={Colors.white}
                      variant="Broken"
                    />
                  </TouchableOpacity>
                ) : (
                  <SearchNormal1
                    size={20}
                    color="#fafafa80"
                    className="flex justify-center items-center"
                    variant="Broken"
                  />
                )}

                <TextInput
                  style={styles.input}
                  onChangeText={handleSearchChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  className="text-[#fffffc] px-3 flex-1 "
                  placeholder="Пребарај"
                  placeholderTextColor="#fafafa80"
                />
              </View>

              <View
                className={
                  isFocused ? "flex h-full px-6" : "hidden h-full px-6"
                }
              >
                <ScrollView
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                  className="flex flex-col"
                >
                  <Text
                    className={
                      search !== ""
                        ? "text-[#fffffc]/60 mt-5 hidden"
                        : "text-[#fffffc]/60 mt-5"
                    }
                    style={{ fontFamily: "semibold" }}
                  >
                    Препорачани
                  </Text>
                  {filteredStores.map(
                    (store, index) =>
                      index < 5 && (
                        <TouchableOpacity
                          onPress={() => handleRouteStoreDetails(store)}
                          key={index}
                          className="w-full flex-row  flex items-center justify-between"
                        >
                          <View className="flex items-center flex-row gap-x-4">
                            <Shop
                              color={Colors.primary}
                              size={25}
                              variant="Broken"
                            />
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
                        className="text-center mt-2 text-[#fffffc]/60 "
                        style={{ fontFamily: "medium" }}
                      >
                        Нема пронајдено {"\n"} резултати
                      </Text>
                    </View>
                  ) : null}
                </ScrollView>
              </View>
            </Animated.View>

            <ScrollView
              removeClippedSubviews
              horizontal
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              className="flex-row"
              snapToInterval={324}
              decelerationRate={"fast"}
              snapToAlignment="end"
              showsHorizontalScrollIndicator={false}
            >
              <Animated.View
                entering={FadeIn.springify().duration(300).delay(100)}
                className="flex flex-row items-center mt-2 px-7 gap-x-2"
              >
                {categories &&
                  categories.map(
                    (category, index) =>
                      index < 8 && (
                        <Pressable
                          key={index}
                          onPress={() =>
                            router.push({
                              pathname: "/category",
                              params: { name: category.name, id: category.id },
                            })
                          }
                          className="flex justify-center"
                        >
                          {renderCategoryIcon(category.name)}
                          <View className="w-20 bg-[#121212]/90 py-3 rounded-2xl flex justify-center items-center">
                            <Text
                              className="text-xs mt-4 text-[#fffffc]"
                              style={{ fontFamily: "semibold" }}
                            >
                              {category.name}
                            </Text>
                          </View>
                        </Pressable>
                      )
                  )}
              </Animated.View>
            </ScrollView>
          </View>

          <View className="mt-3">
            {loadingStores ? <SkeletonList /> : <StoresList />}
          </View>
        </ScrollView>

        {/* <View
          className={
            orderExists
              ? "px-6 flex w-full justify-center items-center absolute bottom-4"
              : "hidden"
          }
        >
          <TouchableOpacity
            onPress={() => router.push("/(order)/trackOrder")}
            className="w-full p-4 rounded-2xl flex items-center justify-between flex-row bg-[#0b0b0b] shadow-md"
          >
            <View className="flex flex-row items-center  space-x-3">
              <View className=" flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden"></View>
              <View className="flex flex-col">
                <Text
                  className=" text-[#fffffc]/80 uppercase"
                  style={{ fontFamily: "semibold" }}
                >
                  Бу Хаус
                </Text>
                <Text
                  className=" mt-1 text-[#fffffc]"
                  style={{ fontFamily: "medium" }}
                >
                  x1 Бонапарата
                </Text>
              </View>
            </View>

            <Timer variant="Bulk" color={Colors.primary} size={36} />
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 44 : 0,
  },
  input: {
    paddingVertical: Platform.OS === "android" ? 16 : 22,
    fontFamily: "medium",
  },
  highlightIndicator: {
    position: "absolute",
    height: 2,
    backgroundColor: Colors.dark,
    bottom: 0,
  },
});
