import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowLeft2, ArrowRight, Eye, EyeSlash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecureEntry = () => {
      setIsSecure(!isSecure);
  };

  const validateUser = async () => {
      try {
          const storedUserData = await AsyncStorage.getItem('@userData');
          const userData = storedUserData ? JSON.parse(storedUserData) : null;

          if (userData && userData.email === email && userData.password === password) {
              Alert.alert("Success", "You are successfully logged in!");
              // Adjust based on your navigation setup
              router.replace('/(tabs)/');
          } else {
              Alert.alert("Error", "Invalid email or password!");
          }
      } catch (error) {
          console.error('Failed to fetch user data.', error);
      }
  };
  return (
    <Animated.View className='flex-1 pt-4' entering={FadeIn.springify().delay(150).duration(200)}>
      <SafeAreaView className='flex-1 bg-[#FFFFFC]'>
        <TouchableOpacity activeOpacity={1} className='flex-1' onPress={() => Keyboard.dismiss()}>

          <View className='px-6 flex flex-row gap-x-3 items-center justify-between '>
            <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
              <ArrowLeft variant='Linear' size={20} color={Colors.white} />
              <Text style={{ fontFamily: 'medium' }} className='text-[#FFFFFC] ml-1'>Назад</Text>
            </TouchableOpacity>

            <Text className='text-4xl text-[#1dd868]' style={{ fontFamily: "heavy" }}>G</Text>
          </View>

          <View className='py-6 px-6 pt-10'>

            <Text className='text-lg text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Добредојде назад</Text>
            <Text className='text-3xl text-[#0b0b0b]/90 mt-1' style={{ fontFamily: "bold" }}>Најавете се на вашиот профил.</Text>
          </View>

          <View className='flex px-6 h-min flex-col gap-y-3'>
            <TextInput value={email} onChangeText={setEmail} className='px-5 bg-[#fafafa]/90 rounded-2xl text-[#0b0b0b] border-2 border-[#fafafa]/0  focus:border-2 focus:border-[#1dd868]' style={styles.input} placeholder='Е-маил' placeholderTextColor='#0b0b0b97' />

            <View className='w-full flex items-center flex-row bg-[#fafafa]/90 border-2 border-[#fafafa]/0 rounded-2xl  focus:border-[#1dd868]'>
              <TextInput value={password} onChangeText={setPassword} className='px-5 w-[90%]' style={styles.input} placeholder='Лозинка' secureTextEntry={isSecure} placeholderTextColor='#0b0b0b97' />

              {isSecure ? (<EyeSlash onPress={toggleSecureEntry} color={Colors.dark} variant='Broken' size={22} className='absolute right-5' />) : (<Eye onPress={toggleSecureEntry} color={Colors.dark} variant='Broken' size={22} className='absolute right-5' />)}
            </View>
          </View>

          <TouchableOpacity className='mt-4 px-6 ml-1'>
            <Text className='text-sm text-[#1dd868]' style={{ fontFamily: 'semibold' }}>Заборавена лозинка</Text>
          </TouchableOpacity>

          <View className='px-6 pb-4 flex-1 justify-end'>
            <TouchableOpacity onPress={validateUser} className='bg-[#0b0b0b] flex flex-row items-center justify-center py-6 rounded-2xl'>
              <Text className='text-lg text-[#FFFFFC] ' style={{ fontFamily: "medium" }}>Најави се</Text>
              <ArrowRight color={Colors.primary} className='ml-2' variant='Linear' size={22} />
            </TouchableOpacity>
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