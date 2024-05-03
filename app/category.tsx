import { View, Text, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft } from 'iconsax-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'

const Page = () => {

  const { name, id } = useLocalSearchParams<{ name: string, id: any }>()


  return (
    <SafeAreaView className='bg-[#0b0b0b]'>
      <StatusBar style='light' />

      <View className='flex w-full flex-col px-6 pb-6 bg-[#0b0b0b]' style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
          <ArrowLeft variant='Broken' size={20} color={Colors.white} />
        </TouchableOpacity>

        <View className='mt-6'>
          <Text className='text-2xl text-white' style={{ fontFamily: "medium" }}>{name}</Text>
        </View>
      </View>

      <View className='h-full px-6 py-4 bg-[#fffffc]'>

      </View>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 20 : 16
  },
  input: {
    paddingVertical: (Platform.OS === 'android') ? 16 : 22,
    fontFamily: 'medium',
  }
});