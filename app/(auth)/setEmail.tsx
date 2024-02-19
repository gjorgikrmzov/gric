import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, ArrowLeft2, ArrowRight, Eye, EyeSlash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Link, router, useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Page = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [email, setemail] = useState('')
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const savedFirstName = await AsyncStorage.getItem('@userFirstName');
                if (savedFirstName !== null) {
                    setFirstName(savedFirstName);
                }
            } catch (error) {
                console.error('Failed to fetch user data.', error);
            }
        };

        getUserData();
    }, []);


    const saveEmail = async (email: string) => {
        try {
            await AsyncStorage.setItem('@userEmail', email);
        } catch (error) {
            console.error('Failed to save email.', error);
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

                        <Text className='text-4xl text-[#98CE00]' style={{ fontFamily: "heavy" }}>G</Text>
                    </View>

                    <View className='py-6 px-6 pt-10'>
                        <Text className='text-lg text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Здраво {firstName},</Text>
                        <Text className='text-3xl text-[#0b0b0b]/90 mt-1' style={{ fontFamily: "bold" }}>Внесете ја вашата</Text>
                        <Text className='text-3xl text-[#0b0b0b]/90' style={{ fontFamily: "bold" }}>Е-маил адреса.</Text>
                    </View>

                    <View className='flex px-6 h-min flex-col gap-y-3'>
                        <TextInput value={email}
                            onChangeText={(text) => setemail(text)} className='px-5 bg-[#fafafa]/90 rounded-2xl text-[#0b0b0b] border-2 border-[#fafafa]/0 focus:border-2 focus:border-[#98CE00]' style={styles.input} placeholder='Е-маил' placeholderTextColor='#0b0b0b97' />
                    </View>

                    <View className='px-6 pb-4 flex-1 justify-end'>
                        <TouchableOpacity onPress={async () => {
                            await saveEmail(email);
                            router.push('/(auth)/setPassword')
                            // navigate to profile screen
                        }} className='bg-[#0b0b0b] flex flex-row items-center justify-center py-5 w-1/2 self-end rounded-2xl'>
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