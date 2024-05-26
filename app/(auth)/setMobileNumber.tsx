import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowRight} from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'
import { CountryPicker } from "react-native-country-codes-picker";

const Page = () => {

    const { firstName, lastName, email } = useLocalSearchParams()

    const [mobileNumber, setmobileNumber] = useState('')
    const [errorMessage, seterrorMessage] = useState('')

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+389')
    const [countryFlag, setCountryFlag] = useState('🇲🇰')


    const formatPhoneNumber = (text: string): string => {
        const cleaned = text.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})$/);

        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join(' ');
        }

        return text;
    };

    const handleTextChange = (text: string) => {
        const formattedNumber = formatPhoneNumber(text);
        setmobileNumber(formattedNumber);
    };


    const setAccMobileNumber = async () => {
        if (!mobileNumber || mobileNumber.length < 9) {
            seterrorMessage("Внесете валиден мобилен број")
        } else {
            router.push({ pathname: '/(auth)/setPassword', params: { firstName, lastName, email, mobileNumber } })
        }
    };

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
                    <Text className='text-3xl text-[#fffffc]/90 mt-1' style={{ fontFamily: "bold" }}>Внесете го вашиот телефонски број.</Text>
                    <Text className='text-sm mt-1 text-[#fffffc]/60' style={{ fontFamily: "medium" }}>Ќе ви испратиме верификациски код</Text>
                </View>

                <View className='flex px-6 h-min flex-row  gap-y-3'>
                    <TouchableOpacity onPress={() => setShow(true)} className='px-4 flex justify-center flex-row items-center py-5 rounded-2xl bg-[#121212]/90'>
                        <Text style={{ fontFamily: 'medium' }} className='text-lg'>{countryFlag}</Text>
                        <Text style={{ fontFamily: 'medium' }} className='ml-2 text-white '>{countryCode}</Text>
                    </TouchableOpacity>

                    <TextInput value={mobileNumber}
                        onChangeText={handleTextChange} maxLength={10} keyboardType='phone-pad' className=' text-white ml-2 flex-1 px-5 bg-[#121212]/90 rounded-2xl  fffffcer-2 border-[#fafafa]/0 focus:border-2 focus:border-[#1BD868]' style={styles.input} placeholder='78 239 880' placeholderTextColor='#fffffc97' />

                </View>
                {errorMessage ? <Text className='mt-3 text-red-600 mx-6' style={{ fontFamily: 'medium' }}>{errorMessage}</Text> : null}

                <KeyboardAvoidingView style={{ flex: 1 }} className='justify-end' behavior='position'>
                    <View className='px-6 pb-6 justify-end'>
                        <TouchableOpacity onPress={setAccMobileNumber} className='bg-[#121212]/90 border-2 border-[#1BD868] flex flex-row items-center justify-center py-5 w-1/2 self-end rounded-2xl'>
                            <Text className='text-lg text-[#FFFFFC] ' style={{ fontFamily: "medium" }}>Следно</Text>
                            <ArrowRight color={Colors.primary} className='ml-2' variant='Linear' size={22} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>


            </SafeAreaView>

            <CountryPicker
                lang='en'
                show={show}
                style={{
                    modal: {
                        height: 500,
                        backgroundColor: '#0b0b0b'
                    },
                    itemsList: {
                        backgroundColor: "#121212"
                    },
                    textInput: {
                        backgroundColor: "#121212"

                    },
                    countryButtonStyles: {
                        backgroundColor: "#121212"
                    },
                    countryName: {
                        color: '#fff'
                    },
                    dialCode: {
                        color: '#fff'
                    },
                    line: {
                        backgroundColor: "#fffffc40",
                    }

                }}

                initialState='+389'
                onBackdropPress={() => setShow(false)}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setCountryFlag(item.flag)
                    console.log(item.flag)
                    setShow(false);
                }}
            />
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