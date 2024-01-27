import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl, Dimensions, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User, Location, Shop, DocumentText, ArrowDown, ArrowDown2 } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import * as expoLocation from 'expo-location';
import Animated, { FadeIn } from 'react-native-reanimated'

const Page = () => {

    const restaurants = [
        { restaurantTitle: 'Бу Хаус' },
        { restaurantTitle: 'Бонита' },
        { restaurantTitle: 'Ла Вита' },
        { restaurantTitle: 'Хепинес' },
        { restaurantTitle: 'Елизабет' },
        { restaurantTitle: 'Бонџорно' },
        // Add more restaurants as needed
    ];

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        // Perform any additional refreshing logic if needed.

        // Simulate a delay (you can replace this with your actual refreshing logic)
        setTimeout(() => {
            setRefreshing(false);
        }, 600); // Adjust the delay as needed
    };



    return (
        <>
            <Animated.View className='flex-1' entering={FadeIn.springify().duration(400)}>
                <SafeAreaView className='bg-[#0b0b0b] flex-1 relative'>
                    <View className='bg-[#0b0b0b] border-b border-[#e0e0e0]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row '>
                        <StatusBar style='light' />
                        <TouchableOpacity onPress={() => router.push('/(modals)/manageLocation')}>
                            <View className='flex items-center flex-row'>
                                <Location size={16} color={Colors.primary} variant='Bulk' />
                                <Text className='text-[#e0e0e0]/60 ml-1' style={{ fontFamily: "medium" }}>Достави на</Text>
                                <ArrowDown2 className='ml-0.5' size={14} color={Colors.white} variant='Linear' />
                            </View>

                            <Text className='text-[#e0e0e0] mt-1 ' style={{ fontFamily: 'medium'}}>Внесете ja вашата адреса</Text>
                        </TouchableOpacity>

                        <View className='flex flex-row items-center gap-x-2'>
                            <TouchableOpacity onPress={() => router.push('/notifications')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-[#e0e0e0]/10'>
                                <View className='w-4 h-4 bg-[#ff4b19] border-2 border-[#0b0b0b] rounded-full absolute right-2.5 z-10 top-2.5 flex justify-center items-center'>
                                    <Text className='text-[8px] text-[#e0e0e0] left-[0.5px]' style={{ fontFamily: 'extrabold' }}>2</Text>
                                </View>
                                <Notification1 color={Colors.white} size={22} variant='Broken' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/profile')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-[#e0e0e0]/10'>
                                <User color={Colors.white} size={22} variant='Broken' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView refreshControl={<RefreshControl tintColor={Colors.white} refreshing={refreshing}
                        onRefresh={onRefresh} className='z-10 relative' />}>

                        <View className='mt-2 px-6'>
                            <View className='flex flex-col mt-4'>
                                <Text className='text-4xl' style={{ fontFamily: 'heavy', color: Colors.primary }} >GRIC</Text>
                                <Text className='text-md mt-[-5px] ml-0.5' style={{ fontFamily: 'extraboldI', color: Colors.white }} >DELIVERY</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/search')} className='flex flex-row items-center mt-4'>
                                <View className='p-5 flex justify-center items-center rounded-2xl bg-[#e0e0e0]/5 border border-[#e0e0e0]/10'>
                                    <SearchNormal1 color={Colors.white} size={20} variant='Broken' />
                                </View>
                                <View className='rounded-2xl ml-2 py-5 px-5 justify-center flex-1 bg-[#e0e0e0]/5 border border-[#e0e0e0]/10'>
                                    <Text className='text-[#e0e0e0] text-[#16px]' style={{ fontFamily: 'medium' }}>Пребарај Ресторани</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className='px-6 mt-8'>
                            <View className='w-full justify-between items-end flex flex-row'>
                                <View className='flex flex-col'>
                                    <View className='flex items-center flex-row gap-x-2'>
                                        <Shop size={19} color={Colors.primary} variant='Bulk' />
                                        <Text className='text-lg text-[#e0e0e0]' style={{ fontFamily: 'semibold' }}>Ресторани</Text>
                                    </View>
                                    <Text className='text-xs   text-[#e0e0e0]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Популарни Ресторани</Text>
                                </View>
                                <TouchableOpacity onPress={() => router.push('/(tabs)/restaurants')}>
                                    <Text style={{ fontFamily: 'bold' }} className=' text-[#ff4b19] text-xs'>Види повеќе</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal className='rounded-2xl border border-[#e0e0e0]/10  mt-3 flex-row flex-1' snapToInterval={332} decelerationRate={'fast'}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                snapToAlignment='end'
                                showsHorizontalScrollIndicator={false}>

                                <View className='flex flex-row py-2 px-2 gap-x-2'>

                                    {restaurants.map((restaurant, index) => (
                                        <TouchableOpacity key={index} className='border-[#e0e0e0]/10 overflow-hidden bg-[#e0e0e0]/5 flex-1 flex justify-center items-center rounded-xl w-[100px] h-28 border'>
                                            <Shop className='mb-5' size={36} color={Colors.primary} variant='Bulk' />
                                            <View className='absolute bg-[#e0e0e0]/10  flex justify-center items-center rounded-xl w-full h-1/2 bottom-0'>
                                                <Text className='text-[#e0e0e0] text-xs' style={{ fontFamily: 'bold' }}>{restaurant.restaurantTitle}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    ))}
                                </View>
                            </ScrollView>

                        </View>


                        <View className='px-6 mt-6'>
                            <View className='w-full justify-between items-end flex flex-row'>
                                <View className='flex flex-col'>
                                    <View className='flex items-center flex-row gap-x-2'>
                                        <DocumentText size={19} color={Colors.primary} variant='Bulk' />
                                        <Text className='text-lg text-[#e0e0e0] ' style={{ fontFamily: 'semibold' }}>Категории</Text>
                                    </View>
                                    <Text className='text-xs text-[#e0e0e0]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Популарни Категории</Text>
                                </View>
                                <TouchableOpacity onPress={() => router.push('/categories')}>
                                    <Text style={{ fontFamily: 'bold' }} className=' text-[#ff4b19] text-xs '>Види повеќе</Text>
                                </TouchableOpacity>
                            </View>

                            <View className='w-full rounded-2xl p-2 border items-center border-[#e0e0e0]/10 mt-3 flex flex-row justify-between'>
                                <TouchableOpacity onPress={() => router.push('/categories')} className='h-28 border-[#e0e0e0]/10 overflow-hidden bg-[#e0e0e0]/5 flex justify-center items-center rounded-xl w-[32%] border'>
                                    <Image source={require('../../assets/images/burger.svg')} className='w-11 h-11 mb-6' />
                                    <View className='absolute bg-[#e0e0e0]/10  flex justify-center items-center rounded-xl w-full h-1/2 bottom-0'>
                                        <Text className='text-[#e0e0e0] text-xs' style={{ fontFamily: 'bold' }}>Бургер</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('/categories')} className='h-28 border-[#e0e0e0]/10 overflow-hidden bg-[#e0e0e0]/5 flex justify-center items-center rounded-xl w-[32%] border'>
                                    <Image source={require('../../assets/images/meat.svg')} className='w-11 h-11 mb-6' />
                                    <View className='absolute bg-[#e0e0e0]/10  flex justify-center items-center rounded-xl w-full h-1/2 bottom-0'>
                                        <Text className='text-[#e0e0e0] text-xs' style={{ fontFamily: 'bold' }}>Месо</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('/categories')} className='h-28 border-[#e0e0e0]/10 overflow-hidden bg-[#e0e0e0]/5 justify-center items-center flex rounded-xl w-[32%] border'>
                                    <Image source={require('../../assets/images/pizza.svg')} className='w-11 h-11 mb-6' />
                                    <View className='absolute bg-[#e0e0e0]/10  flex justify-center items-center rounded-xl w-full h-1/2 bottom-0'>
                                        <Text className='text-[#e0e0e0] text-xs' style={{ fontFamily: 'bold' }}>Пица</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
        </>
    )
}

export default Page