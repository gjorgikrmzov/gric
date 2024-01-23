import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo'

const Page = () => {

    const { user } = useUser();

    return (
        <>
            <SafeAreaView className='bg-[#131313] flex-1 relative'>
                <View className='bg-[#131313] px-6 py-2 pb-6 flex justify-between items-center flex-row '>
                    <StatusBar style='light' />
                    <View>
                        <Text className='text-md text-white/50' style={{ fontFamily: 'semibold' }}>Здраво, {user ? <Text>{user.fullName}</Text> : 'User'}</Text>
                        <Text style={{ fontFamily: 'semibold' }} className='text-[#f7f7f7] text-lg'>Добар ден</Text>
                    </View>

                    <View className='flex flex-row items-center gap-x-2'>
                        <TouchableOpacity onPress={() => router.push('/notifications')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-white/10'>
                            <View className='w-3 h-3 bg-[#ff4b19] rounded-full absolute right-3 z-10 top-3 flex justify-center items-center'>
                                <Text className='text-[8px] text-white left-[0.5px]' style={{ fontFamily: 'bold' }}>2</Text>
                            </View>
                            <Notification1 color={Colors.white} size={22} variant='Broken' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/profile')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-white/10'>
                            <User color={Colors.white} size={22} variant='Broken' />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView refreshControl={<RefreshControl tintColor={Colors.white} refreshing={false} className='z-10 relative pb-4' />}>
                    <View className='mt-6 px-6'>
                        <Text className='text-4xl' style={{ fontFamily: 'heavy', color: Colors.primary }} >GRIC</Text>

                        <TouchableOpacity onPress={() => router.push('/search')} className='h-14 flex flex-row items-center mt-4'>
                            <View className='w-14 h-full flex justify-center items-center rounded-xl border border-white/10'>
                                <SearchNormal1 color={Colors.white} size={20} variant='Broken' />
                            </View>
                            <View className='rounded-xl  justify-center ml-2 h-full flex-1 border border-white/10'>
                                <Text className='pl-5 text-[#f7f7f7]' style={{ fontFamily: 'medium' }}>Пребарај Ресторани</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View className='px-6 mt-10'>
                        <View className='w-full justify-between items-center flex flex-row'>
                            <Text className='text-lg text-white' style={{ fontFamily: 'semibold' }}>Ресторани</Text>
                            <TouchableOpacity onPress={() => router.replace('/(tabs)/restaurants')}>
                                <Text style={{ fontFamily: 'bold' }} className='text-white/60 text-xs'>Види повеќе</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='h-32 w-full rounded-2xl p-2 border items-center border-white/10 mt-3 flex flex-row justify-between'>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                        </View>
                    </View>


                    <View className='px-6 mt-6'>
                        <View className='w-full justify-between items-center flex flex-row'>
                            <Text className='text-lg text-white ' style={{ fontFamily: 'semibold' }}>Категории</Text>
                            <TouchableOpacity onPress={() => router.replace('/(tabs)/restaurants')}>
                                <Text style={{ fontFamily: 'bold' }} className='text-white/60 text-xs'>Види повеќе</Text>
                            </TouchableOpacity>
                        </View>

                        <View className='h-32 w-full rounded-2xl p-2 border items-center border-white/10 mt-3 flex flex-row justify-between'>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                            <View className='border-white/10 bg-white/5 h-full rounded-xl w-[32%] border'></View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Page