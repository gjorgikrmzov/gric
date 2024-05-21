import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { ArrowDown, Location, LocationAdd, Trash } from "iconsax-react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { TouchableOpacity } from "react-native";
import { deleteAddress, fetchAddress } from "../reduxStore/addressSlice";
import { StatusBar } from "expo-status-bar";

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
    console.log(address)
    try {
      const response = await fetch("http://172.20.10.2:8080/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        
        body: JSON.stringify({
          id: address.id,
          name: address.name,
          street: address.street,
          streetNumber: address.streetNumber,
          flat: address.flat,
          apartment: address.apartment,
          latitude: address.latitude,
          longitude: address.longitude,
          personId: personId,
          isSelected: true,
        }),
      });

      if (response.ok) {
        dispatch(fetchAddress({ personId, accessToken }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.header} className="flex flex-1 bg-[#FFFFFC] ">
      <StatusBar style="light" />

      <View className="bg-[#FFFFFC] flex-1">
        <View className="flex px-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full"
          >
            <ArrowDown variant="Broken" size={20} color={Colors.dark} />
          </TouchableOpacity>
          <Text
            className="text-lg text-[#0b0b0b]"
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
            <View className="flex justify-center items-center w-28 h-28 rounded-3xl bg-[#fafafa]/90">
              <Location size={56} variant="Bulk" color={Colors.primary} />
            </View>

            <Text
              className="text-[#0b0b0b]/80 text-[16px] mt-4 text-center"
              style={{ fontFamily: "medium" }}
            >
              Во моментов немате внесено {"\n"} адреса на достава
            </Text>
          </View>
        ) : (
          <View className="mt-2 flex-1">
            <View className="px-6 mt-8">
              <Text
                className="text-[#0B0B0B]/60"
                style={{ fontFamily: "medium" }}
              >
                Адреса на достава
              </Text>
              <Text
                className="text-lg text-[#0b0b0b] flex items-center"
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
                    className="border-b border-[#0b0b0b]/5 px-6 w-full py-5 flex flex-row items-center justify-between"
                  >
                    <View className="flex-col items-start">
                      <View className="flex flex-row items-center">
                        {/* <Location
                          size={22}
                          variant={
                            address.id === address.isSelected
                              ? "Bold"
                              : "Broken"
                          }
                          color={Colors.dark}
                        /> */}
                        <View className="ml-4">
                          <Text
                            className="text-xs text-[#0b0b0b]/80 uppercase"
                            style={{ fontFamily: "semibold" }}
                          >
                            {address.name}
                          </Text>
                          <Text
                            className="text-md text-[15px]"
                            style={{ fontFamily: "medium" }}
                          >
                            {address.street} {address.streetNumber}
                          </Text>
                        </View>
                      </View>

                      <View className="flex flex-row mt-2 items-center space-x-1">
                        {address.flat && (
                          <View className="p-1 px-2 border border-[#0b0b0b]/5 bg-[#fffffc] rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#0b0b0b]"
                            >
                              кат - {address.flat}
                            </Text>
                          </View>
                        )}

                        {address.apartment && (
                          <View className="p-1 px-2 border border-[#0b0b0b]/5 bg-[#fffffc] rounded-lg flex justify-center items-center">
                            <Text
                              style={{ fontFamily: "medium" }}
                              className="text-xs text-[#0b0b0b]"
                            >
                              стан - {address.apartment}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address.id)}
                      className="w-10 h-10 flex justify-center items-center rounded-xl border border-[#0b0b0b]/5 bg-[#fffffc]"
                    >
                      <Trash size={18} color={Colors.dark} variant="Broken" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View className="px-6 w-full pb-2">
          <TouchableOpacity
            onPress={() => router.push("/(modals)/addAddress")}
            className="py-6 rounded-2xl flex-row flex justify-center items-center bg-[#0b0b0b]"
          >
            <LocationAdd size={22} color={Colors.primary} variant="Bulk" />
            <Text
              className="ml-3 text-[#FFFFFC]"
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
