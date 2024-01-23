import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft, Bag } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Page = () => {
  return (
    <SafeAreaView className='bg-[#131313]'>
      <View className='h-full px-6 py-4 bg-[#131313]'>
        <StatusBar style='light' />
        <View className='flex w-full flex-row items-center justify-between'>
          <TouchableOpacity className='bg-[#f7f7f7] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className='text-black ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <View className='flex-1 justify-center items-center'>
          <View className='flex justify-center items-center w-28 h-28 rounded-2xl bg-white/5'>
            <Bag size={56} variant='Broken' color={Colors.primary} />
          </View>

          <Text className='text-[#f7f7f7] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Вашата корпа {'\n'} е празна</Text>
        </View>
      </View>


    </SafeAreaView>
  )
}

export default Page