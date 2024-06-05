import {
  View,
  Text,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ArrowLeft, Heart } from "iconsax-react-native";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reduxStore";
import { fetchStoresByCategory } from "./reduxStore/storeSlice";
import { NativeScrollEvent } from "react-native";
import { Image } from "expo-image";
import StoresByCategoryList from "../components/List/storesByCategoryList";
import SkeletonList from "../components/List/skeletonList";
import { StatusBar } from "expo-status-bar";
import { PressableScale } from "react-native-pressable-scale";

const Page = () => {
  const { name, id } = useLocalSearchParams<{ name: string; id: any }>();
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const storesByCategory = useSelector(
    (state: RootState) => state.store.storesByCategory
  );
  
  const dispatch = useDispatch<any>();
  const [loadingStores, setloadingStores] = useState(true);
  const router = useRouter();
  const scrollTreshold = 80;
  const [isScrolled, setisScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setloadingStores(true);
      await dispatch(fetchStoresByCategory({ id, accessToken }));
      setloadingStores(false);
    };

    fetchData();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > scrollTreshold && !isScrolled) {
      setisScrolled(true);
    } else if (scrollPosition <= scrollTreshold && isScrolled) {
      setisScrolled(false);
    }
  };

  const renderCategoryIcon = (name: any) => {
    switch (name) {
      case "Бургер":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/burger.svg")}
          />
        );
      case "Пица":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/pizza.svg")}
          />
        );
      case "Кафе":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/coffe.svg")}
          />
        );
      case "Десерт":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/donut.svg")}
          />
        );
      case "Паста":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/pasta.svg")}
          />
        );
      case "Месо":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/meet.svg")}
          />
        );

      case "Тако":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/cake.svg")}
          />
        );

      case "Сендвич":
        return (
          <Image
            tintColor={Colors.primary}
            className="w-12 h-12 rotate-[20deg]"
            source={require("../assets/images/bread.svg")}
          />
        );
    }
  };
  return (
    <GestureHandlerRootView>
      <StatusBar style="light" />
      <View className=" flex-1 bg-[#0b0b0b]">
        <View
          style={styles.header}
          className="bg-[#121212]/90 border-b border-[#0b0b0b]/5 py-6  flex "
        >
          <View className="flex z-[999] mt-4">
            <View className="w-full px-6 flex-row items-center">
              <PressableScale
                onPress={() => router.back()}
                className="flex justify-center items-center  rounded-full"
              >
                <ArrowLeft variant="Broken" size={24} color={Colors.white} />
              </PressableScale>

              {isScrolled && (
                <Text
                  style={{ fontFamily: "medium" }}
                  className="text-lg ml-5 text-white"
                >
                  {name}
                </Text>
              )}

            </View>
          </View>

          <View
            className={
              isScrolled
                ? "hidden px-6 mt-6"
                : "flex px-6 flex-row mt-6 w-full justify-between items-center"
            }
          >
            <Text
              style={{ fontFamily: "medium" }}
              className="text-2xl text-white"
            >
              {name}
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} className="bg-[#0b0b0b] flex-1">
          {loadingStores ? <SkeletonList /> : <StoresByCategoryList />}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 50,
  },
});
