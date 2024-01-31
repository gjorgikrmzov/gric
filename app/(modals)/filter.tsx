import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowDown2 } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'

const Page = () => {
  return (
    <View className='flex-1 bg-[#fafafa]'>
      <View className='flex px-6 py-4 flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#0b0b0b]/5 rounded-xl' >
          <ArrowDown2 variant='Linear' size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Филтер</Text>
        <Text className='text-4xl text-[#0b0b0b]' style={{ fontFamily: "heavy" }}>G</Text>
      </View>
    </View>
  )
}

export default Page