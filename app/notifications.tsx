import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { router } from 'expo-router'
import { ArrowLeft2, Notification, Notification1 } from 'iconsax-react-native'
import { StatusBar } from 'expo-status-bar'

const Page = () => {
  return (

    <SafeAreaView className='bg-[#0b0b0b]'>
      <StatusBar style='light' />
      <View className='h-full bg-[#0b0b0b]'>
        <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl' >
          <ArrowLeft2 variant='Linear' size={22} color={Colors.white} />
        </TouchableOpacity>
          <Text className='text-lg text-white' style={{ fontFamily: 'medium' }}>Известувања</Text>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <ScrollView refreshControl={<RefreshControl tintColor={Colors.white} refreshing={false} />} className='h-full' contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }} >

          <View className='flex justify-center items-center flex-col'>
            <View className='flex justify-center items-center w-28 h-28 rounded-2xl bg-white/5'>
              <Notification size={56} variant='Bulk' color={Colors.primary} />
            </View>
            <Text className='text-[#e0e0e0] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате известувања {'\n'} во моментов</Text>
          </View>
        </ScrollView>
      </View>


    </SafeAreaView>
  )
}

export default Page