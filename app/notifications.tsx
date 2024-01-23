import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { router } from 'expo-router'
import { ArrowLeft2, Notification1 } from 'iconsax-react-native'
import { StatusBar } from 'expo-status-bar'

const Page = () => {
  return (

    <SafeAreaView className='bg-[#131313]'>
      <StatusBar style='light' />
      <View className='h-full bg-[#131313]'>
        <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} >
            <ArrowLeft2 variant='Linear' size={26} color={Colors.white} />
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
              <Notification1 size={56} variant='Broken' color={Colors.primary} />
            </View>
            <Text className='text-[#f7f7f7] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате известувања {'\n'} во моментов</Text>
          </View>
        </ScrollView>
      </View>


    </SafeAreaView>
  )
}

export default Page