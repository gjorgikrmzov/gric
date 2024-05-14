import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'
import { ArrowLeft, Notification } from 'iconsax-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Page = () => {
  return (

    <SafeAreaView className=' bg-[#FFFFFC]'>

      <View className='h-full bg-[#FFFFFC]'>
        <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
            <ArrowLeft variant='Broken' size={20} color={Colors.dark} />
          </TouchableOpacity>
          <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Известувања</Text>

          <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <ScrollView refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={false} />} className='h-full' contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }} >

          <View className='flex justify-center items-center flex-col'>
            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#fafafa]/90'>
              <Notification size={56} variant='Bulk' color={Colors.dark} />
            </View>
            <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате известувања {'\n'} во моментов</Text>
          </View>
        </ScrollView>
      </View>


    </SafeAreaView>
  )
}

export default Page