import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'

const Page = () => {
    return (
        <SafeAreaView className='bg-[#FAFAFA]'>
            <View className='h-full px-6 py-4 bg-[#FAFAFA]'>
                

                <View className='flex w-full flex-row items-center justify-between'>
                    <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
                        <ArrowLeft variant='Linear' size={20} color={Colors.white} />
                        <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
                    </TouchableOpacity>

                    <Text className='text-4xl text-[#6BA368]' style={{ fontFamily: "heavy" }}>G</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Page