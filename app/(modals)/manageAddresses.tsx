import { View, Text, TextInput, StyleSheet, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowDown2, ArrowLeft2, CloseSquare, Edit, Edit2, Export, ExportSquare, Gps, Location, LocationAdd, SearchNormal, SearchNormal1, Trash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { fetchUserInfo } from '../reduxStore/userSlice';

const Page = () => {


  // const maxLength = 20;
  // const trimmedAdress = st?.length > maxLength ? `${address.substring(0, maxLength)}...` : address;

  const dispatch = useDispatch<any>()
  const addresses = useSelector((state: RootState) => state.user.addresses)
  const {accessToken} = useSelector((state: RootState) => state.accessToken)


  useEffect(() => {
    dispatch(fetchUserInfo(accessToken))
  }, [accessToken])



  return (
    <SafeAreaView className='flex flex-1 bg-[#FFFFFC] '>

      <View className='bg-[#FFFFFC] flex-1'>
        <View className='flex px-6 flex-row items-center justify-between'>
          <TouchableOpacity  onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
            <ArrowDown variant='Broken' size={20} color={Colors.dark} />
          </TouchableOpacity>
          <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Адреси</Text>
          <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        {addresses?.length === 0 ? (
          <View className='flex-1 justify-center items-center'>
            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#fafafa]/90'>
              <Location size={56} variant='Bulk' color={Colors.primary} />
            </View>

            <Text className='text-[#0b0b0b]/80 text-[16px] mt-4 text-center' style={{ fontFamily: 'medium' }}>Во моментов немате внесено {'\n'} адреса на достава</Text>
          </View>
        ) : (
          <View className='mt-2 flex-1'>
            <View className='px-6 mt-8'>
              <Text className='text-[#0B0B0B]/60' style={{ fontFamily: 'medium' }}>Адреса на достава</Text>
              <Text className='text-lg text-[#0b0b0b] flex items-center' style={{ fontFamily: 'medium' }}>Ваши адреси</Text>
            </View>

            <ScrollView>

              <View className='mt-4 w-full flex-1 border-b border-[#0b0b0b]/5'>
                {addresses?.map((address, index) => (
                  <TouchableOpacity key={index} className=' bg-[#fafafa]/80 px-6 w-full py-5 flex flex-row items-center justify-between' >
                    <View className='flex-col items-start'>
                      <View className='flex flex-row items-center'>
                        <Location size={22} variant='Bold' color={Colors.dark} />
                        <View className='ml-4'>
                          <Text className='text-xs text-[#0b0b0b]/80 uppercase' style={{ fontFamily: "semibold" }}>{address.name}</Text>
                          <Text className='text-md text-[15px]' style={{ fontFamily: "medium" }}>{address.street} {address.streetNumber}</Text>
                        </View>
                      </View>

                      {address.apartment && address.flat ? (

                        <View className='flex flex-row mt-2 items-center space-x-1'>
                          <View className='p-1 px-2 border border-[#0b0b0b]/5 bg-[#fffffc] rounded-lg flex justify-center items-center'>
                            <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>кат - {address.flat}</Text>
                          </View>

                          <View className='p-1 px-2 border border-[#0b0b0b]/5 bg-[#fffffc] rounded-lg flex justify-center items-center'>
                            <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>стан - {address.apartment}</Text>
                          </View>
                        </View>
                        ) : null
                      }

                    </View>

                    <View className='flex flex-row items-center space-x-2'>
                      <TouchableOpacity className='w-10 h-10 flex justify-center items-center rounded-xl border border-[#0b0b0b]/5 bg-[#fffffc]'>
                        <Edit size={18} color={Colors.dark} variant='Broken' />
                      </TouchableOpacity>

                      <TouchableOpacity className='w-10 h-10 flex justify-center items-center rounded-xl border border-[#0b0b0b]/5 bg-[#fffffc]'>
                        <Trash size={18} color={Colors.dark} variant='Broken' />
                      </TouchableOpacity>
                    </View>

                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}


        <View className='px-6 w-full pb-2'>
          <TouchableOpacity onPress={() => router.push('/(modals)/addAddress')} className='py-6 rounded-2xl flex-row flex justify-center items-center bg-[#0b0b0b]'>
            <LocationAdd size={22} color={Colors.primary} variant='Bulk' />
            <Text className='ml-3 text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Додај адреса</Text>
          </TouchableOpacity>
        </View>
      </View>


    </SafeAreaView >
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