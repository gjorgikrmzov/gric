import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowDown, ArrowDown2, ArrowLeft } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';


const Page = () => {
  return (
    <View style={styles.header} className='bg-[#FFFFFC]  flex-1 '>

      <View className='flex px-6 flex-row items-center justify-between'>
        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
          <ArrowDown variant='Linear' size={20} color={Colors.dark} />
        </TouchableOpacity>
        <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Филтер</Text>
        <Text className='text-4xl text-[#98CE00]' style={{ fontFamily: "heavy" }}>G</Text>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 30,
  }
});