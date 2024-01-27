import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft, Bag, Shop } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Page = () => {
  return (
    <SafeAreaView className='bg-[#0b0b0b]'>
      <View className='h-full px-6 py-4 bg-[#0b0b0b]'>
        <StatusBar style='light' />
        <View className='flex w-full flex-row items-center justify-between'>
          <TouchableOpacity className='bg-[#e0e0e0] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className='text-black ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <View className='flex-1 justify-center items-center'>
          <View className='flex justify-center items-center w-28 h-28 rounded-2xl bg-white/5'>
            <Bag size={56} variant='Bulk' color={Colors.primary} />
          </View>

          <Text className='text-[#e0e0e0] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Вашата корпа {'\n'} е празна</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(tabs)/restaurants')} className='w-full flex-row py-5 bg-[#ff4b19] flex justify-center items-center rounded-2xl mb-2'>
            <Shop variant='Bulk' size={24} color={Colors.white} />
            <Text style={{ fontFamily: "medium" }} className='text-white ml-3'>Пребарај Ресторани</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default Page