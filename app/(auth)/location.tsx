import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { Image } from 'react-native'
import { Gps } from 'iconsax-react-native'
import * as expoLocation from 'expo-location';
import Geocoding from 'react-native-geocoding';

Geocoding.init("AIzaSyCx8TbmRb49VZX2zKEk1hmp3GuYtepbNEM");

const Page = () => {

  const [location, setLocation] = useState<expoLocation.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDetectLocation = async () => {
    setIsLoading(true);

    let { status } = await expoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await expoLocation.getCurrentPositionAsync({});
    setLocation(location);

    // Reverse geocoding to get a human-readable address
    try {
      const response = await Geocoding.from(location.coords.latitude, location.coords.longitude);

      // Extract city, street number, and name components
      const city = response.results[0]?.address_components
        .filter(component => component.types.includes('locality'))
        .map(component => component.long_name)
        .join(', ');

      const streetNumber = response.results[0]?.address_components
        .filter(component => component.types.includes('street_number'))
        .map(component => component.long_name)
        .join(' ');

      const streetName = response.results[0]?.address_components
        .filter(component => component.types.includes('route'))
        .map(component => component.long_name)
        .join(', ');

      // Combine city, street number, and name
      const fullAddress = `${city} ${streetNumber} ${streetName}`;

      setAddress(fullAddress);
    } catch (error) {
      console.error(error);
      setAddress(null);
    }

    setIsLoading(false);
  };

  let userLocation = 'На Гриц му е потребна вашата адреса';
  if (isLoading) {
    userLocation = 'Гриц ја детектира вашата адреса...';
  } else if (errorMsg) {
    userLocation = errorMsg;
  } else if (location) {
    userLocation = address || 'Гриц ја детектира вашата адреса...';
  }


  return (
    <>
      <StatusBar style='light' />
      <View className='bg-[#0b0b0b] px-6 py-16 flex flex-col h-full justify-between'>
        <Image source={require('../../assets/images/bg-0.jpg')} className="w-screen h-screen bottom-0 right-0 top-0 z-0 absolute" />
        <View>
          <Text className='text-3xl' style={{ fontFamily: 'heavy', color: Colors.primary }} >GRIC</Text>
          <Text className='text-lg text-white' style={{ fontFamily: "semibold" }}>Внесете ја вашата адреса</Text>
          <TextInput style={{ fontFamily: 'medium' }} value={userLocation} className='mt-4 w-full px-4 bg-[#ffffff06] border-white/10 border py-5 rounded-2xl text-white' placeholderTextColor={Colors.white} />
          <TouchableOpacity onPress={handleDetectLocation} className='mt-4 flex flex-row items-center justify-center w-full px-4 bg-[#ffffff14] border-white/10 border py-5 rounded-2xl'>
            <Gps size={24} color={Colors.primary} variant='Broken' />
            <Text className='ml-3 text-white' style={{ fontFamily: 'medium' }}>Детектирај адреса</Text>
          </TouchableOpacity>
        </View>



        <View className='mb-2'>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/')} className='w-full mt-3 flex flex-row justify-center items-center py-5 bg-[#ff4b19] rounded-2xl'>
            <Text className='ml-3 text-white' style={{ fontFamily: 'medium' }}>Продолжи понатаму</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/(tabs)/')} className='mt-5'>
            <Text className='text-center text-white/80' style={{ fontFamily: "medium" }}>Додај адреса подоцна</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Page

