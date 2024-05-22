import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ArrowDown, Location, LocationAdd, Trash } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { TouchableOpacity } from "react-native";
import { deleteAddress, fetchAddress } from "../reduxStore/addressSlice";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

const Page = () => {
  const dispatch = useDispatch<any>();
  const { addresses } = useSelector((state: RootState) => state.addresses);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const personId = useSelector((state: RootState) => state.user.id);

  const handleDeleteAddress = async (id: string) => {
    try {
      Alert.alert("Избриши Адреса", "Дали сакате да ја избришете адресата?", [
        { text: "Не", style: "cancel" },
        {
          text: "Да",
          onPress: async () => {
            const response = await fetch(
              `http://172.20.10.2:8080/address?addressId=${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.ok) {
              dispatch(deleteAddress(id));
              dispatch(fetchAddress({ personId, accessToken }));
            }
          },
        },
      ]);
    } catch (error) {}
  };

  const selectAddress = async (address: any) => {
    try {
      const response = await fetch(
        `http://172.20.10.2:8080/selectAddress?addressId=${address.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        Haptics.selectionAsync();
        dispatch(fetchAddress({ personId, accessToken }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.header} className="flex flex-1 bg-[#0b0b0b] ">
      <StatusBar style="light" />

      <View className="bg-[#0b0b0b] flex-1">
        <View className="flex px-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-14 h-14 flex justify-center items-center bg-[#121212]/90 rounded-full"
          >
            <ArrowDown variant="Broken" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text
            className="text-lg text-[#fffffc]"
            style={{ fontFamily: "medium" }}
          >
            Адреси
          </Text>
          <Text
            className="text-4xl text-[#1BD868]"
            style={{ fontFamily: "heavy" }}
          >
            G
          </Text>
        </View>

        {addresses?.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <View className="flex justify-center items-center w-28 h-28 rounded-3xl bg-[#121212]/90">
              <Location size={56} variant="Bulk" color={Colors.primary} />
            </View>

            <Text
              className="text-[#fffffc]/80 text-[16px] mt-4 text-center"
              style={{ fontFamily: "medium" }}
            >
              Во моментов немате внесено {"\n"} адреса на достава
            </Text>
          </View>
        ) : (
          <View className="mt-2 flex-1">
            <View className="px-6 mt-8">
              <Text
                className="text-[#fffffc]/60"
                style={{ fontFamily: "medium" }}
              >
                Адреса на достава
              </Text>
              <Text
                className="text-lg text-[#fffffc] flex items-center"
                style={{ fontFamily: "medium" }}
              >
                Ваши адреси
              </Text>
            </View>

            <ScrollView>
              <View className="mt-4 w-full flex-1">
                {addresses?.map((address, index) => (
                  <TouchableOpacity
                    onPress={() => selectAddress(address)}
                    key={index}
                    className="border-b border-[#fffffc]/5 px-6 w-full py-5 flex flex-row items-center justify-between"
                  >
                    <View className="flex-col items-start">
                      <View className="flex flex-row items-center">
                        <Location
                          size={22}
                          variant={
                            address.isSelected === true ? "Bold" : "Broken"
                          }
                          color={Colors.white}
                        />
                        <View className="ml-4">
                          <Text
                            className="text-xs text-[#fffffc]/80 uppercase"
                            style={{ fontFamily: "semibold" }}
                          >
                            {address.name}
                          </Text>
                          <Text
                            className="text-md text-[#fffffc] text-[15px]"
                            style={{ fontFamily: "medium" }}
                          >
                            {address.street.length > 15
                              ? `${address.street.substring(0, 15)}...`
                              : address.street}{" "}
                            {address.streetNumber}
                          </Text>
                        </View>
                      </View>

                      <View className="flex flex-row mt-2 items-center space-x-1">
                        {address.flat && (
                          <View className="p-1 px-2 border bg-[#121212]/90 border-[#fffffc]/5  rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fffffc]"
                            >
                              кат - {address.flat}
                            </Text>
                          </View>
                        )}

                        {address.apartment && (
                          <View className="p-1 px-2 border bg-[#121212]/90 border-[#fffffc]/5 rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#fffffc]"
                            >
                              стан - {address.apartment}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address.id)}
                      className="w-10 h-10 flex justify-center items-center rounded-xl border border-[#0b0b0b]/5 bg-[#121212]/90"
                    >
                      <Trash size={18} color={Colors.white} variant="Broken" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View className="px-6 w-full pb-2.5">
          <TouchableOpacity
            onPress={() => router.push("/(modals)/addAddress")}
            className="py-6 rounded-2xl flex-row flex justify-center items-center border-2 border-[#1BD868] "
          >
            <LocationAdd size={22} color={Colors.primary} variant="Bulk" />
            <Text
              className="ml-3 text-[#fffffc]"
              style={{ fontFamily: "medium" }}
            >
              Додај адреса
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 48 : 28,
    paddingBottom: Platform.OS === "android" ? 20 : 28,
  },
  input: {
    paddingVertical: Platform.OS === "android" ? 16 : 22,
    fontFamily: "medium",
  },
});
