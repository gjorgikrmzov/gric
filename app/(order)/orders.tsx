import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'iconsax-react-native';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import { Dimensions } from 'react-native';


const Page = () => {

    const screenWidth = Dimensions.get('window').width;
    const halfScreenWidth = screenWidth * 0.5;


    const [selectedTab, setSelectedTab] = useState<'currentOrder' | 'allOrders'>('currentOrder');
    const animation = useSharedValue(0);

    const onTabPress = (tab: 'currentOrder' | 'allOrders') => {
        setSelectedTab(tab);
        animation.value = withTiming(tab === 'currentOrder' ? 0 : 1, {
            duration: 250, 
            easing: Easing.inOut(Easing.circle),
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: animation.value * halfScreenWidth,
                },
            ],
        };
    }, []);


    return (
        <SafeAreaView className='flex-1 bg-[#FFFFFC]'>
            <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                    <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
                </TouchableOpacity>
                <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Нарачки</Text>

                <Text className='text-4xl text-[#1dd868]' style={{ fontFamily: "heavy" }}>G</Text>
            </View>

            <View className='w-full pt-3 '>

                <View className='justify-center w-full items-center flex'>
                    <View className='flex flex-col justify-center items-center w-full '>
                        <View className='flex flex-row'>
                            <TouchableOpacity className=' w-44 h-16 flex justify-center items-center py-4' onPress={() => onTabPress('currentOrder')} >
                                <Text style={{ fontFamily: 'semibold' }} className={selectedTab === 'currentOrder' ? 'text-[#0b0b0b]' : "text-[#0b0b0b]/50"}>Нарачки во тек</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className=' w-44 h-16 flex justify-center items-center py-4' onPress={() => onTabPress('allOrders')} >
                                <Text style={{ fontFamily: 'semibold' }} className={selectedTab === 'currentOrder' ? 'text-[#0b0b0b]/50' : "text-[#0b0b0b]"}>Готови нарачки</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='w-full flex absolute left-0 bottom-0 h-1 bg-[#757780]/10 '>
                            <Animated.View className='h-1 bg-[#0b0b0b]' style={[styles.highlight, animatedStyle]} />
                        </View>
                    </View>

                </View>
            </View>


            <View className=' flex-1'>

                {selectedTab === 'currentOrder' ? (
                    <View className='px-6 flex-1 justify-center items-start mt-6 flex-row'>
                        {/* <View className='flex justify-center items-center flex-col'>
                            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#F0F1F3]/80'>
                                <DirectboxNotif size={56} variant='Bulk' color={Colors.primary} />
                            </View>
                            <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате нарачки {'\n'}во моментов</Text>
                        </View> */}

                        <ScrollView className='flex h-full flex-col w-full'>
                            <View className='jusify-start flex-1 flex flex-col items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='flex flex-row items-start'>

                                    <View className='w-20 h-20  bg-[#0B0B0B]/10 rounded-2xl'></View>
                                    <View className='ml-3 flex-1'>
                                        <View className='flex flex-col'>
                                            <Text className='text-[16px]' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                            <Text className='text-sm mt-2 text-[#0b0b0b]/90' style={{ fontFamily: "medium" }}>1x Бонапарта, Мал помфрит</Text>
                                        </View>

                                        <View className='mt-4 flex-1 flex-row flex justify-between items-center'>
                                            <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Пон. 7 Феб.</Text>
                                            <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>210 ден</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className='flex-1 items-center flex gap-x-2 flex-row justify-center mt-3'>
                                    <TouchableOpacity onPress={() => router.push('/(order)/trackOrder')} className='flex items-center bg-[#0b0b0b] px-3 flex-1 py-4 rounded-2xl'>
                                        <Text style={{ fontFamily: "medium" }} className='text-white'>Види нарачка</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity className='flex items-center bg-[#0b0b0b] px-3 flex-1 py-4 rounded-2xl'>
                                        <Text style={{ fontFamily: "medium" }} className='text-white'>Откажи</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                ) : (
                    <View className='px-6 flex-1 justify-center items-start mt-6 flex-row'>
                        {/* <View className='flex justify-center items-center flex-col'>
                            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#F0F1F3]/80'>
                                <DirectboxNotif size={56} variant='Bulk' color={Colors.primary} />
                            </View>
                            <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате предходни {'\n'}нарачки</Text>
                        </View> */}

                        <ScrollView className='h-full flex flex-col  w-full'>
                            <TouchableOpacity className='rotunded-3xl jusify-start flex flex-row items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='w-20 h-20  bg-[#0B0B0B]/10 rounded-2xl'></View>
                                <View className='ml-3 flex-1'>
                                    <View className='flex flex-col'>
                                        <Text className='text-[16px]' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                        <Text className='text-sm mt-2 text-[#0b0b0b]/90' style={{ fontFamily: "medium" }}>1x Бонапарта, Мал помфрит</Text>
                                    </View>

                                    <View className='mt-4 flex-1 flex-row flex justify-between items-center'>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Пон. 7 Феб.</Text>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>210 ден</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity className='rotunded-3xl jusify-start flex flex-row items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='w-20 h-20  bg-[#0B0B0B]/10 rounded-2xl'></View>
                                <View className='ml-3 flex-1'>
                                    <View className='flex flex-col'>
                                        <Text className='text-[16px]' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                        <Text className='text-sm mt-2 text-[#0b0b0b]/90' style={{ fontFamily: "medium" }}>1x Бонапарта, Мал помфрит</Text>
                                    </View>

                                    <View className='mt-4 flex-1 flex-row flex justify-between items-center'>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Пон. 7 Феб.</Text>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>210 ден</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className='rotunded-3xl jusify-start flex flex-row items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='w-20 h-20  bg-[#0B0B0B]/10 rounded-2xl'></View>
                                <View className='ml-3 flex-1'>
                                    <View className='flex flex-col'>
                                        <Text className='text-[16px]' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                        <Text className='text-sm mt-2 text-[#0b0b0b]/90' style={{ fontFamily: "medium" }}>1x Бонапарта, Мал помфрит</Text>
                                    </View>

                                    <View className='mt-4 flex-1 flex-row flex justify-between items-center'>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Пон. 7 Феб.</Text>
                                        <Text className='text-sm text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>210 ден</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        marginHorizontal: 10,
    },
    tabText: {
        fontSize: 16,
    },
    highlight: {
        width: '50%', // Set this to your tab width
    },
    content: {
        fontSize: 20,
    },
});
export default Page;
