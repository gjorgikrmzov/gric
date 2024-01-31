import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft, Bag, Shop } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Page = () => {
  return (
    <SafeAreaView className='bg-[#FAFAFA]'>
      <View className='h-full px-6 py-4 bg-[#FAFAFA]'>
       
        <View className='flex w-full flex-row items-center justify-between'>
          <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.white} />
            <Text style={{ fontFamily: 'medium' }} className='text-[#fafafa] ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#6BA368]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <View className='flex-1 justify-center items-center'>
          <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#0b0b0b]/5'>
            <Bag size={56} variant='Bulk' color={Colors.primary} />
          </View>

          <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Вашата корпа {'\n'} е празна</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/restaurants')} className='w-full flex-row py-5 bg-[#0b0b0b] flex justify-center items-center rounded-3xl'>
            <Shop variant='Bulk' size={24} color={Colors.white} />
            <Text style={{ fontFamily: "medium" }} className='text-[#fafafa] ml-3'>Пребарај Ресторани</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default Page