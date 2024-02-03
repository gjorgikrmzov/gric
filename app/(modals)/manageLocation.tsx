import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as expoLocation from 'expo-location';
import { ArrowDown, ArrowDown2, ArrowLeft2, CloseSquare, Edit, Edit2, Export, ExportSquare, Location, SearchNormal, SearchNormal1 } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Geocoding from 'react-native-geocoding';
import { SafeAreaView } from 'react-native-safe-area-context';


Geocoding.init("AIzaSyCx8TbmRb49VZX2zKEk1hmp3GuYtepbNEM");


const Page = () => {

  const [location, setLocation] = useState<expoLocation.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
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
      setLocation(location);

      // Reverse geocoding to get a human-readable address
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
    } finally {
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <View style={styles.header} className='bg-[#fafafa]  flex-1 '>
      <View className='flex px-6 flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#0b0b0b]/5 rounded-xl' >
          <ArrowDown2 variant='Linear' size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Адреси</Text>
        <Text className='text-4xl text-[#6BA368]' style={{ fontFamily: "heavy" }}>G</Text>
      </View>

      <View className='mt-4 px-6'>
        <View className='w-full justify-start items-center flex-row px-4 rounded-2xl bg-[#F0F1F3]'>
          <SearchNormal1 variant='Broken' size={20} color={Colors.dark} />
          <TextInput onBlur={handleInputBlur} onFocus={handleInputFocus} className=' w-full ml-3 text-dark' placeholder='Пребарај Адреса' placeholderTextColor={Colors.dark} style={styles.input} />
        </View>
      </View>


      {IsInputFocused ? (<View></View>) :

        (<View>
          <View className='px-6 mt-8'>
            <Text className='text-lg text-[#0b0b0b] flex items-center' style={{ fontFamily: 'medium' }}>Моментална локација</Text>
            <View className='flex flex-row items-center mt-2 justify-between'>
              {address ?
                (<Text className='text-[#0b0b0b]/60 ' style={{ fontFamily: "medium", fontSize: 14, }}>Пристапот до вашата {'\n'}адреса е вклучен</Text>) :
                (<Text style={{ fontSize: 14, fontFamily: 'medium' }} className='text-[#0b0b0b]/60 '>Пристапот до вашата {'\n'}адреса е исклучен</Text>)
              }
              {address ? null : (<TouchableOpacity onPress={handleGetLocation} className='bg-[#6BA368] justify-center items-center flex px-2.5 py-2.5 rounded-lg'>
                <Text className='text-[#fafafa] text-xs' style={{ fontFamily: "medium" }}>Вклучи</Text>
              </TouchableOpacity>)}
            </View>
          </View>

          <View className='mt-10 w-full h-[1px] bg-[#0b0b0b]/10'></View>

          <View className='px-6 mt-8'>
            <Text className='text-lg text-[#0b0b0b] flex items-center' style={{ fontFamily: 'medium' }}>Ваши адреси</Text>
          </View>

          <View className='mt-4 w-full'>

            {
              locationLoading ? (<TouchableOpacity className='border-b border-[#0b0b0b]/10 px-6 w-full py-7 bg-[#F0F1F3] flex flex-row items-center justify-between' >
                <View className='flex-row items-center'>
                  <Location size={22} variant='Bulk' color={Colors.dark} />

                  {address ?
                    (
                      <Text style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }} className='ml-2 text-[#0e0e0e]'>{address}</Text>
                    ) :
                    (
                      <Text style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }} className='ml-2 text-[#0e0e0e]'>Гриц ја бара вашата адреса...</Text>
                    )
                  }

                </View>
                <TouchableOpacity>


                  <ExportSquare color={Colors.dark} variant='Broken' size={18} />
                </TouchableOpacity>

              </TouchableOpacity>) :

                (
                  <View className='px-6'>
                    <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Моментално немате {'\n'}внесено адреса</Text>
                  </View>
                )
            }


          </View>
        </View>)
      }




    </View >
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 30,
  },
    input: {
    paddingVertical: (Platform.OS === 'android') ? 14 : 20,
    fontFamily: 'medium',
  }
});