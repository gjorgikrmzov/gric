import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeft2, Bookmark, Clock, Element, Heart, Location } from 'iconsax-react-native'
import { router } from 'expo-router'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'

const Page = () => {

    const restaurantDetails = [
        { restaurantName: 'Бу Хаус', restaurantCategories: 'Бургер Сендвич Салата' }
    ]

    return (
        <View className='flex-1 pb-6 bg-[#fafafa]'>

            <StatusBar style='light' />
            <View className='bg-[#0b0b0b] pt-20 pb-6 px-6 overflow-hidden'>
                {restaurantDetails.map((restaurantDetail, index) => (
                    <View>

                        <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#fafafa]/10 rounded-xl' >
                            <ArrowLeft2 variant='Linear' size={22} color={Colors.white} />
                        </TouchableOpacity>
                        
                        <View className='flex w-full flex-row justify-between mt-6 items-center'>
                            <Text className=' text-[#fafafa]/60 uppercase' style={{ fontFamily: "bold" }}>Пица ресторан</Text>
                            <Heart size={22} color={Colors.white} />
                        </View>

                        <Text className='text-3xl text-[#fafafa]' style={{ fontFamily: "bold" }}>Бу Хаус</Text>

                        <View key={index} className='flex flex-col gap-y-2 mt-3'>
                        
                            <View className='flex flex-row items-center'>
                                <Clock variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                            </View>
                            <View className='flex flex-row items-center'>
                                <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${restaurantDetail.restaurantCategories.split(' ').join(' · ')}`}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <View className='flex items-center flex-row px-6 ml-0.5 mt-6'>
                <Element size={20} color={Colors.dark} variant='Bulk' />
                <Text className='text-[#0b0b0b] text-[16px] ml-1' style={{ fontFamily: "semibold" }}>Категории</Text>
            </View>
            <View className=' mt-2.5'>
                <ScrollView removeClippedSubviews horizontal decelerationRate={'fast'}
                    snapToAlignment='end'
                    showsHorizontalScrollIndicator={false} className='h-min'  >

                    <View className='px-6 justify-left items-center gap-x-3 flex  flex-row'>

                        <View className=' bg-[#fafafa] h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/50  rounded-xl px-4 '>
                            <Text className='text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>
                                🍔 Бургер
                            </Text>
                        </View>

                        <View className=' bg-[#fafafa] h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/50  rounded-xl px-4 '>
                            <Text className='text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>
                                🍕 Пица
                            </Text>
                        </View>

                        <View className=' bg-[#fafafa] h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/50  rounded-xl px-4 '>
                            <Text className='text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>
                                🌮 Тако
                            </Text>
                        </View>

                        <View className=' bg-[#fafafa] h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/50  rounded-xl px-4 '>
                            <Text className='text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>
                                🥪 Сендвич
                            </Text>
                        </View>

                        <View className=' bg-[#fafafa] h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/50  rounded-xl px-4 '>
                            <Text className='text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>
                                🥗 Салата
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </View>

        </View>
    )
}

export default Page