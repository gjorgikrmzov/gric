import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { Image } from 'react-native'
import { Gps } from 'iconsax-react-native'
import * as Location from 'expo-location';

const Page = () => {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDetectLocation = async () => {
    setIsLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setIsLoading(false);
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation);

    // Reverse geocode to get address from coordinates
    let [reverseGeocodeResult] = await Location.reverseGeocodeAsync({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });

    if (reverseGeocodeResult) {
      // Concatenate address components to form the complete address
      const formattedAddress = `${reverseGeocodeResult.street} ${reverseGeocodeResult.city}, ${reverseGeocodeResult.region} ${reverseGeocodeResult.postalCode}, ${reverseGeocodeResult.country}`;
      setAddress(formattedAddress);
    }

    setIsLoading(false);
  };

  let userLocation = 'Кликни на копчето за Гриц да ве лоцира';
  if (isLoading) {
    userLocation = 'Гриц ја лоцира вашата адреса...';
  } else if (errorMsg) {
    userLocation = errorMsg;
  } else if (location) {
    userLocation = address || 'Гриц ја лоцира вашата адреса...';
  }


    return (
        <>
            <StatusBar style='light' />
            <View className='bg-[#131313] px-6 py-16 flex flex-col h-full justify-between'>
                <Image source={require('../../assets/images/bg.jpg')} className="w-screen h-screen bottom-0 right-0 top-0 z-0 absolute" />
                <View>
                    <Text className='text-3xl' style={{ fontFamily: 'heavy', color: Colors.primary }} >GRIC</Text>
                    <Text className='text-lg text-white' style={{ fontFamily: "semibold" }}>Локација</Text>
                    <TextInput style={{ fontFamily: 'medium' }} value={userLocation} className='mt-4 w-full px-4 bg-[#ffffff06] border-white/10 border py-5 rounded-2xl text-white' placeholderTextColor={Colors.white} />
                    <TouchableOpacity onPress={handleDetectLocation} className='mt-4 flex flex-row items-center justify-center w-full px-4 bg-[#ffffff14] border-white/10 border py-5 rounded-2xl'>
                        <Gps size={24} color={Colors.primary} variant='Broken' />
                        <Text className='ml-3 text-white' style={{ fontFamily: 'medium' }}>Детектирај локација</Text>
                    </TouchableOpacity>
                </View>



                <TouchableOpacity onPress={() => router.replace('/(tabs)/')} className='w-full mt-3 flex flex-row justify-center items-center py-5 bg-[#ff4b19] rounded-2xl'>
                    <Text className='text-lg ml-3 text-white' style={{ fontFamily: 'medium' }}>Продолжи понатаму</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Page