import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowRight} from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'

const Page = () => {

  const [firstName, setfirstName] = useState<string>('')
  const [lastName, setlastName] = useState<string>('')
  const [errorMessage, seterrorMessage] = useState('')

  const setAccName = () => {
    if (!firstName || !lastName) {
      seterrorMessage("Внесете валидно име и презиме")
    } else {
      router.push({ pathname: '/(auth)/setEmail', params: { firstName, lastName } })
    }
  }


  return (
    <Animated.View className='flex-1 pt-4 bg-[#0b0b0b]' entering={FadeIn.springify().delay(150).duration(200)}>
      <SafeAreaView className='flex-1 bg-[#0b0b0b]'>

        <View className='px-6 flex flex-row gap-x-3 items-center justify-between '>
          <TouchableOpacity className='bg-[#121212]/90 px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
            <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <View className='py-6 px-6 pt-10'>
          <Text className='text-lg text-[#fffffc]/60' style={{ fontFamily: "medium" }}>Креирај профил</Text>
          <Text className='text-3xl text-[#fffffc]/90 mt-1' style={{ fontFamily: "bold" }}>Како се викате?</Text>
        </View>

        <View className='flex px-6 h-min flex-col gap-y-3'>
          <TextInput value={firstName}
            onChangeText={(text) => setfirstName(text)} className=' px-5 bg-[#121212]/90 text-white rounded-2xl border-2 border-[#fafafa]/0  focus:border-2 focus:border-[#1BD868]' style={styles.input} placeholder='Име' placeholderTextColor='#fffffc97' />
          <TextInput value={lastName}
            onChangeText={(text) => setlastName(text)} className=' px-5 bg-[#121212]/90 text-white rounded-2xl border-2 border-[#fafafa]/0 focus:border-2 focus:border-[#1BD868]' style={styles.input} placeholder='Презиме' placeholderTextColor='#fffffc97' />

          <TouchableOpacity onPress={() => router.push('/signIn')} className='mt-4 ml-0.5'>
            <Text className='text-[#1BD868] text-sm' style={{ fontFamily: 'semibold' }}>Веќе имам профил</Text>
          </TouchableOpacity>

          <Text className='mt-3 text-red-600' style={{ fontFamily: "medium" }}>{errorMessage}</Text>
        </View>



        <KeyboardAvoidingView style={{ flex: 1 }} className='justify-end' behavior='position'>
          <View className='px-6  pb-6'>
            <TouchableOpacity onPress={setAccName} className='bg-[#121212]/90 border-2 border-[#1BD868] flex flex-row items-center self-end justify-center rounded-2xl w-1/2 py-5'>
              <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: "medium" }}>Следно</Text>
              <ArrowRight color={Colors.primary} className='ml-2' variant='Linear' size={22} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

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