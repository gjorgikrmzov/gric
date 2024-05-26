import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import React, {useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowRight } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'

const Page = () => {

    const { firstName, lastName } = useLocalSearchParams()
    const [email, setemail] = useState('')
    const [errorMessage, seterrorMessage] = useState('')


    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(text) || text === "") {
            seterrorMessage('');
        } else {
            seterrorMessage('Внесете валидна Е-маил адреса');
        }
    };

    const handleTextChange = (text: string) => {
        setemail(text);
        validateEmail(text);
    };

    const setAccEmail = async () => {
        if (!email || errorMessage) {
            seterrorMessage("Внесете валидна Е-маил адреса")
        } else {
            router.push({ pathname: '/(auth)/setMobileNumber', params: { firstName, lastName, email } })
        }
    };

    return (
        <Animated.View className='flex-1 pt-4 bg-[#0b0b0b]' entering={FadeIn.springify().delay(150).duration(200)}>
            <SafeAreaView className='flex-col justify-between flex-1 bg-[#0b0b0b]'>


                <View>
                    <View className='px-6 flex flex-row gap-x-3 items-center justify-between '>
                        <TouchableOpacity className='bg-[#121212]/90 px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
                            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
                            <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
                        </TouchableOpacity>

                        <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
                    </View>

                    <View className='py-6 px-6 pt-10'>
                        <Text className='text-lg text-[#fffffc]/60' style={{ fontFamily: "medium" }}>Здраво {firstName},</Text>
                        <Text className='text-3xl text-[#fffffc]/90 mt-1' style={{ fontFamily: "bold" }}>Внесете ја вашата</Text>
                        <Text className='text-3xl text-[#fffffc]/90' style={{ fontFamily: "bold" }}>Е-маил адреса.</Text>
                    </View>

                    <View className='flex px-6 h-min flex-col gap-y-3'>
                        <TextInput value={email}
                            onChangeText={handleTextChange} className='px-5 bg-[#121212]/90 rounded-2xl text-[#fffffc] border-2 border-[#fafafa]/0 focus:border-2 focus:border-[#1BD868]' style={styles.input} placeholder='example@gmail.com' placeholderTextColor='#fffffc97' />
                        {errorMessage ? <Text className='mt-3 text-red-600' style={{ fontFamily: "medium" }}>{errorMessage}</Text> : null}
                    </View>
                </View>

                <KeyboardAvoidingView style={{ flex: 1 }} className='justify-end' behavior='position'>
                    <View className=' justify-end px-6 pb-6'>
                        <TouchableOpacity onPress={setAccEmail} className='bg-[#121212]/90 border-2 border-[#1BD868] flex flex-row items-center justify-center py-5 w-1/2 self-end rounded-2xl'>
                            <Text className='text-lg text-[#FFFFFC] ' style={{ fontFamily: "medium" }}>Следно</Text>
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