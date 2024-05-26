import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  ArrowDown,
  CloseCircle,
  Location,
  SaveAdd,
  TickCircle,
} from "iconsax-react-native";
import { router } from "expo-router";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { fetchAddress } from "../reduxStore/addressSlice";
import { StatusBar } from "expo-status-bar";
import * as expoLocation from "expo-location";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { customMapStyle } from "../../mapStyle";

const GOOGLE_API_KEY = "AIzaSyCEpWqaSJleG-l3EO4uqpliX5ADoUGrsUA";

const Page = () => {
  const dispatch = useDispatch<any>();
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const personId = useSelector((state: RootState) => state.user.id);
  const [addressDescription, setaddressDescription] = useState<string>("");
  const [street, setstreet] = useState<any>(null);

  const [location, setlocation] = useState<expoLocation.LocationObject | any>(
    null
  );
  const [streetNumber, setstreetNumber] = useState<any>(null);
  const [flat, setFlat] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");

  const [addressSuccess, setaddressSuccess] = useState<boolean | null>(null);
  const [loadingLocation, setloadingLocation] = useState(false);

  const allowedCity = "Strumica";

  const isWithinCityBounds = (addressComponents: any[]) => {
    for (const component of addressComponents) {
      if (component.types.includes("locality")) {
        return component.long_name === allowedCity;
      }
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      let { status } = await expoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await expoLocation.getCurrentPositionAsync({});
      setlocation(location);
    })();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      setloadingLocation(true);
      if (location) {
        const { latitude, longitude } = location.coords;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            let streetNumber = null;
            let streetName = null;

            addressComponents.forEach((component: any) => {
              if (component.types.includes("street_number")) {
                streetNumber = component.long_name;
              }
              if (component.types.includes("route")) {
                streetName = component.long_name;
              }
            });

            setstreet(streetName);
            setstreetNumber(streetNumber);
            setaddressSuccess(true)
          } else {
            setstreet(null);
            setstreetNumber(null);
            setaddressSuccess(false)
            Alert.alert("Адреса на достава", "Нема пронајдено адреса.");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setloadingLocation(false);
        }
      }
    };

    fetchAddress();
  }, [location]);

  const getCoordsForAddress = async () => {
    try {
      const fullAddress = `${streetNumber} ${street}`;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();
      if (data.results && data.results.length > 0 && data.results[0].geometry) {
        const addressComponents = data.results[0].address_components;
        const newLocation = {
          coords: {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        };
        setlocation(newLocation);
        setaddressSuccess(true)
        
      } else {
        setaddressSuccess(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

 const addAddress = async () => {
  if (!location || !location.coords) {
    Alert.alert("Адреса на достава", "Адресата не е пронајдена", [
      { text: "Во ред", style: "cancel" },
    ]);
    return;
  }

  const { latitude, longitude } = location.coords;

  try {
    if (!addressDescription) {
      Alert.alert(
        "Адреса на достава",
        "Полето 'зачувај адреса како' е празно.",
        [{ text: "Во ред", style: "cancel" }]
      );
    } else if (!street || !streetNumber) {
      Alert.alert("Адреса на достава", "Внесете име и број на улица.", [
        { text: "Во ред", style: "cancel" },
      ]);
    } else {
      const response = await fetch(
        `http://172.20.10.2:8080/address?personId=${personId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: addressDescription,
            street: street,
            streetNumber: streetNumber,
            flat: flat,
            apartment: apartment,
            latitude: latitude,
            longitude: longitude,
            isSelected: false,
          }),
        }
      );

      if (response.ok) {
        dispatch(fetchAddress({ personId, accessToken }));
        router.back();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.header} className="bg-[#0b0b0b] px-6 flex-1">
      <StatusBar style="light" />

      <View className="flex flex-row items-center justify-between">
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
          Додај адреса
        </Text>
        <Text
          className="text-4xl text-[#1BD868]"
          style={{ fontFamily: "heavy" }}
        >
          G
        </Text>
      </View>

      <View className="mt-5 flex-1">
        <View className="opacity-100">
          <View className="flex  flex-row items-center ml-1">
            <Location variant="Bulk" color={Colors.primary} size={18} />
            <Text
              style={{ fontFamily: "medium" }}
              className="ml-1 text-[15px] text-[#fffffc]"
            >
              Податоци на адреса
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2 mt-2">
            <View className="flex-1 justify-between px-5 flex-row border-2  rounded-2xl border-[#121212]/80 bg-[#121212]/80 items-center">
              <TextInput
                onEndEditing={getCoordsForAddress}
                onChangeText={(text) => setstreet(text)}
                value={street ?? ""}
                style={{ fontFamily: "medium" }}
                className="flex-1  py-5  text-white  "
                placeholder="Име на улица"
                placeholderTextColor="#fafafa97"
              />

              {loadingLocation ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <>
                  {addressSuccess ? (
                    <TickCircle
                      size={18}
                      variant="Bulk"
                      color={Colors.primary}
                    />
                  ) : (
                    <CloseCircle size={18} variant="Bulk" color="#aaa" />
                  )}
                </>
              )}
            </View>

            <TextInput
              onChangeText={(text) => setstreetNumber(text)}
              value={streetNumber}
              maxLength={5}
              style={{ fontFamily: "medium" }}
              className="p-5 border-2 border-[#121212]/80 text-white rounded-2xl bg-[#121212]/80 "
              placeholder="Број"
              placeholderTextColor="#fafafa97"
            />
          </View>

          <View className="mt-2">
            <TextInput
              value={addressDescription}
              selectionColor={Colors.primary}
              onChangeText={(text) => setaddressDescription(text)}
              style={{ fontFamily: "medium" }}
              className=" px-5 py-5 border-2 border-[#121212]/80 text-white rounded-2xl bg-[#121212]/80"
              placeholder="Зачувај како:  Дома/Работа.."
              placeholderTextColor="#fafafa97"
            />
          </View>

          <View className="mt-2">
            <View className="flex flex-row space-x-2 items-center">
              <TextInput
                onChangeText={(text) => setFlat(text)}
                value={flat}
                style={{ fontFamily: "medium" }}
                selectionColor={Colors.primary}
                className="flex-1 px-5 py-5 border-2 border-[#121212]/80 text-white focus:border-2  rounded-2xl bg-[#121212]/80 "
                placeholder="Број на кат"
                placeholderTextColor="#fafafa97"
              />
              <TextInput
                onChangeText={(text) => setApartment(text)}
                value={apartment}
                style={{ fontFamily: "medium" }}
                selectionColor={Colors.primary}
                className="flex-1 px-5 py-5 border-2 border-[#121212]/80 text-white focus:border-2  rounded-2xl bg-[#121212]/80"
                placeholder="Број на стан"
                placeholderTextColor="#fafafa97"
              />
            </View>
          </View>
        </View>

        {location && (
          <View className="flex-1 my-2.5 overflow-hidden rounded-2xl">
            <MapView
              className="w-full flex-1"
              showsCompass={false}
              focusable
              initialRegion={INITIAL_REGION}
              provider={PROVIDER_DEFAULT}
              customMapStyle={customMapStyle}
            >
              <Marker
                coordinate={{
                  latitude: location?.coords.latitude!,
                  longitude: location?.coords.longitude!,
                }}
              >
                <View className="-z-0 p-2 justify-center items-center flex rounded-2xl bg-[#fafafa]">
                  <Location size={19} variant="Bulk" color={Colors.dark} />
                </View>
              </Marker>
            </MapView>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={addAddress}
        className=" border-2 border-[#1BD868] mb-2 py-6 flex justify-center flex-row  items-center rounded-2xl"
      >
        <SaveAdd variant="Bulk" color={Colors.primary} size={22} />
        <Text style={{ fontFamily: "medium" }} className="text-[#FFFFFC] ml-2">
          Зачувај адреса
        </Text>
      </TouchableOpacity>
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
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -13,
    marginTop: -13,
  },
});
