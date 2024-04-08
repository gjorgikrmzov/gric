import { View, Text, TextInput, StyleSheet, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as expoLocation from 'expo-location';
import { ArrowDown, ArrowDown2, ArrowLeft2, CloseSquare, Edit, Edit2, Export, ExportSquare, Gps, Location, SearchNormal, SearchNormal1, Trash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Geocoding from 'react-native-geocoding';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


Geocoding.init("AIzaSyCx8TbmRb49VZX2zKEk1hmp3GuYtepbNEM");


const Page = () => {

  const [location, setLocation] = useState<expoLocation.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [IsInputFocused, setIsInputFocused] = useState(false)
  const [locationLoading, setlocationLoading] = useState(false)

  const handleGetLocation = async () => {
    try {
      setlocationLoading(true);

      let { status } = await expoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await expoLocation.getCurrentPositionAsync({});

      // Reverse geocoding to get a human-readable address
      const response = await Geocoding.from(location.coords.latitude, location.coords.longitude);

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

      const fullAddress = `${city} ${streetNumber} ${streetName}`;

      // Store address in AsyncStorage instead of setting it to the address state
      await AsyncStorage.setItem('address', fullAddress);
      console.log('Address saved to AsyncStorage');
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to fetch and store address');
    } finally {
      setlocationLoading(false);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };



  const maxLength = 20;
  const trimmedAdress = address.length > maxLength ? `${address.substring(0, maxLength)}...` : address;

  return (
    <TouchableOpacity className='flex flex-1 bg-[#FFFFFC]' activeOpacity={1} onPress={() => Keyboard.dismiss()}>

      <View style={styles.header} className='bg-[#FFFFFC]  flex-1 '>
        <View className='flex px-6 flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
          <ArrowDown variant='Linear' size={20} color={Colors.dark} />
        </TouchableOpacity>
          <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Адреси</Text>
          <Text className='text-4xl text-[#1dd868]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <View className='mt-4 px-6'>
          <View className='w-full justify-start items-center flex-row px-4 rounded-2xl bg-[#fafafa]/80'>
            <SearchNormal1 variant='Broken' size={20} color='#0b0b0b97' />
            <TextInput onBlur={handleInputBlur} onFocus={handleInputFocus} className=' w-full ml-3 text-dark' placeholder='Пребарај Адреса' placeholderTextColor='#0b0b0b97' style={styles.input} />
          </View>
        </View>


        {IsInputFocused ? (<View></View>) :

          (<View>
            <View className='px-6 mt-4'>
              <TouchableOpacity onPress={() => router.push("/(modals)/setAddressInfo")} className='py-5 rounded-2xl flex-row flex w-full justify-center items-center bg-[#0b0b0b]'>
                <Gps size={22} color={Colors.primary} variant='Broken' />
                <Text className='ml-3 text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Детектирај адреса</Text>
              </TouchableOpacity>
            </View>

            <View className='mt-10 w-full h-1 bg-[#F0F1F3]'></View>

            <View className='px-6 mt-8'>
              <Text className='text-lg text-[#0b0b0b] flex items-center' style={{ fontFamily: 'medium' }}>Ваши адреси</Text>
            </View>

            <View className='mt-4 w-full'>

              {locationLoading ? (
                <TouchableOpacity className='border-b border-[#0b0b0b]/10 px-6 w-full py-7 bg-[#F0F1F3]/60 flex flex-row items-center justify-between' >
                  <View className='flex-row items-center'>
                    <Location size={22} variant='Bulk' color={Colors.primary} />
                    <Text className='ml-2 ' style={{ fontFamily: "medium" }}>Гриц ја бара вашата адреса...</Text>
                  </View>
                </TouchableOpacity>
              ) : address ? (
                <TouchableOpacity className='border-b border-[#0b0b0b]/10 px-6 w-full py-7 bg-[#F0F1F3]/60 flex flex-row items-center justify-between' >
                  <View className='flex-col items-start'>
                    <View className='flex flex-row items-center'>
                      <Location size={22} variant='Bulk' color={Colors.primary} />
                      <Text className='ml-1' style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }}>{address}</Text>
                    </View>

                    <View className='flex flex-row mt-2 items-center space-x-1'>
                      <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                        <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Кат 1</Text>
                      </View>

                      <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                        <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Стан 4</Text>
                      </View>

                      <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                        <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Достави на врата</Text>
                      </View>
                    </View>

                  </View>

                  <TouchableOpacity>
                    <Trash size={24} color={Colors.dark} variant='Linear' />
                  </TouchableOpacity>
                </TouchableOpacity>
              ) : (
                <View className='px-6'>
                  <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Моментално немате {'\n'}внесено адреса</Text>
                </View>
              )}


            </View>
          </View>)
        }




      </View >
    </TouchableOpacity>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 30,
  },
  input: {
    paddingVertical: (Platform.OS === 'android') ? 16 : 22,
    fontFamily: 'medium',
  }
});