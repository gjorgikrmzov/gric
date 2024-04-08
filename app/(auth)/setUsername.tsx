import { View, Text, TextInput, TouchableOpacity, Keyboard, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowLeft2, ArrowRight, Eye, EyeSlash, LoginCurve } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Link, router, usePathname } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Page = () => {

  const [hidePassword, sethidePassword] = useState<boolean>(false)
  const [isSecure, setIsSecure] = useState(true);

  const [firstName, setfirstName] = useState<string>('')
  const [lastName, setlastName] = useState<string>('')

  const handleHidePassword = () => {
    sethidePassword(prev => !prev)
    setIsSecure(prev => !prev)
  }

  const saveUserName = async (firstName: string, lastName: string) => {
    try {
      await AsyncStorage.setItem('@userFirstName', firstName);
      await AsyncStorage.setItem('@userLastName', lastName);
    } catch (error) {
      console.error('Failed to save user name.', error);
    }
  };

  return (
    <Animated.View className='flex-1 pt-4' entering={FadeIn.springify().delay(150).duration(200)}>
      <SafeAreaView className='flex-1 bg-[#FFFFFC]'>
        <TouchableOpacity activeOpacity={1} className='flex-1' onPress={() => Keyboard.dismiss()}>

          <View className='px-6 flex flex-row gap-x-3 items-center justify-between '>
            <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
              <ArrowLeft variant='Linear' size={20} color={Colors.white} />
              <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
            </TouchableOpacity>

            <Text className='text-4xl text-[#1dd868]' style={{ fontFamily: "heavy" }}>G</Text>
          </View>

          <View className='py-6 px-6 pt-10'>
            <Text className='text-lg text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Креирај профил</Text>
            <Text className='text-3xl text-[#0b0b0b]/90 mt-1' style={{ fontFamily: "bold" }}>Како се викате?</Text>
          </View>

          <View className='flex px-6 h-min flex-col gap-y-3'>
            <TextInput value={firstName}
              onChangeText={(text) => setfirstName(text)} className=' px-5 bg-[#fafafa]/90 rounded-2xl border-2 border-[#fafafa]/0  focus:border-2 focus:border-[#1dd868]' style={styles.input} placeholder='Име' placeholderTextColor='#0b0b0b97' />
            <TextInput value={lastName}
              onChangeText={(text) => setlastName(text)} className=' px-5 bg-[#fafafa]/90 rounded-2xl border-2 border-[#fafafa]/0 focus:border-2 focus:border-[#1dd868]' style={styles.input} placeholder='Презиме' placeholderTextColor='#0b0b0b97' />
            
            <TouchableOpacity className='mt-4 ml-0.5'>
              <Text className='text-[#1dd868] text-sm' style={{ fontFamily: 'semibold' }}>Веќе имам профил</Text>
            </TouchableOpacity>
          </View>



          <View className='flex-1 flex justify-end '>
            <View className='px-6 pb-4'>

              <TouchableOpacity onPress={async () => {
                await saveUserName(firstName, lastName);
                router.push('/(auth)/setEmail')
              }} className='bg-[#0b0b0b] flex flex-row items-center self-end justify-center rounded-2xl w-1/2 py-5'>
                <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: "medium" }}>Следно</Text>
                <ArrowRight color={Colors.primary} className='ml-2' variant='Linear' size={22} />
              </TouchableOpacity>
            </View>
          </View>

        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  )
}

export default Page


const styles = StyleSheet.create({
  input: {
    paddingVertical: (Platform.OS === 'android') ? 20 : 24,
    fontFamily: 'medium',
  }
});