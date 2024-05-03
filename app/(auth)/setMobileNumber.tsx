import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowLeft2, ArrowRight, Eye, EyeSlash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Link, router, useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Page = () => {

    const { firstName, lastName, email } = useLocalSearchParams()

    const [mobileNumber, setmobileNumber] = useState('')
    const [errorMessage, seterrorMessage] = useState('')

    const setAccMobileNumber = async () => {
        if (!mobileNumber) {
            seterrorMessage("Внесете валиден мобиле број")
        } else {
            router.push({ pathname: '/(auth)/setPassword', params: { firstName, lastName, email, mobileNumber } })
        }
    };

    return (
        <Animated.View className='flex-1 pt-4 bg-[#FFFFFC]' entering={FadeIn.springify().delay(150).duration(200)}>
            <SafeAreaView className='flex-1 bg-[#FFFFFC]'>
                <TouchableOpacity activeOpacity={1} className='flex-1' onPress={() => Keyboard.dismiss()}>

                    <View className='px-6 flex flex-row gap-x-3 items-center justify-between '>
                        <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
                            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
                            <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
                        </TouchableOpacity>

                        <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
                    </View>

                    <View className='py-6 px-6 pt-10'>
                        <Text className='text-lg text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}></Text>
                        <Text className='text-3xl text-[#0b0b0b]/90 mt-1' style={{ fontFamily: "bold" }}>Внесете го вашиот мобилен број.</Text>
                    </View>

                    <View className='flex px-6 h-min flex-col gap-y-3'>
                        <TextInput value={mobileNumber}
                            onChangeText={(text) => setmobileNumber(text)} className='px-5 bg-[#fafafa]/90 rounded-2xl text-[#0b0b0b] border-2 border-[#fafafa]/0 focus:border-2 focus:border-[#1BD868]' style={styles.input} placeholder='Вашиот мoбилен број' placeholderTextColor='#0b0b0b97' />
                       
                        <Text className='mt-3 text-red-600' style={{ fontFamily: "medium" }}>{errorMessage}</Text>
                    </View>



                    <View className='px-6 pb-4 flex-1 justify-end'>
                        <TouchableOpacity onPress={setAccMobileNumber} className='bg-[#0b0b0b] flex flex-row items-center justify-center py-5 w-1/2 self-end rounded-2xl'>
                            <Text className='text-lg text-[#FFFFFC] ' style={{ fontFamily: "medium" }}>Следно</Text>
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