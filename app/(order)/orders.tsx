import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ArrowLeft2, Clock, DirectboxDefault, DirectboxNotif, Notification, Receipt, Receipt1 } from 'iconsax-react-native';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
// Note: Ensure you're importing router from a valid source, as 'expo-router' might be a placeholder.
// import { router } from 'expo-router';



const Page = () => {
    const [selectedTab, setSelectedTab] = useState<'currentOrder' | 'allOrders'>('currentOrder');
    const animation = useSharedValue(0);

    const onTabPress = (tab: 'currentOrder' | 'allOrders') => {
        setSelectedTab(tab);
        animation.value = withSpring(tab === 'currentOrder' ? 0 : 1, {
            damping: 18, // Less damping for more "bounciness"
            stiffness: 170, // Adjust for the "speed" of the spring
            mass: 1, // Can be adjusted for the "heaviness" of the animation
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: animation.value * 176,
                },
            ],
        };
    }, []);


    return (
        <SafeAreaView className='flex-1 bg-[#fafafa]'>
            <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/80 rounded-xl' >
                    <ArrowLeft2 variant='Linear' size={22} color={Colors.dark} />
                </TouchableOpacity>
                <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Нарачки</Text>

                <Text className='text-4xl text-[#32BB78]' style={{ fontFamily: "heavy" }}>G</Text>
            </View>

            <View className='w-full mt-3 pt-3'>

                <View className='justify-center w-full items-center flex'>
                    <View className='flex flex-col'>
                        <View className='flex flex-row'>
                            <TouchableOpacity className={selectedTab === 'currentOrder' ? 'w-44 h-16 flex justify-center items-center py-4': ' bg-[#0b0b0b]/5 rounded-2xl w-44 h-16 flex justify-center items-center py-4'} onPress={() => onTabPress('currentOrder')} >
                                <Text style={{ fontFamily: 'medium' }} className={selectedTab === 'currentOrder' ? 'text-[#fafafa]' : "text-black"}>Нарачки во тек</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={selectedTab === 'currentOrder' ? ' bg-[#0b0b0b]/5 rounded-2xl w-44 h-16 flex justify-center items-center py-4': 'w-44 h-16 flex justify-center items-center py-4'} onPress={() => onTabPress('allOrders')} >
                                <Text style={{ fontFamily: 'medium' }} className={selectedTab === 'currentOrder' ? 'text-black' : "text-[#fafafa]"}>Сите нарачки</Text>
                            </TouchableOpacity>
                        </View>
                        <Animated.View className='h-16 absolute top-0 rounded-2xl bg-[#0b0b0b] z-[-1]' style={[styles.highlight, animatedStyle]} />
                    </View>

                </View>
            </View>


            <View className=' py-4 mt-6  flex-1'>
                <View className='w-full h-2 bg-[#F0F1F3] '>

                </View>
                {selectedTab === 'currentOrder' ? (
                    <Animated.View entering={FadeInDown.delay(200).duration(200).springify()} className='px-6 flex-1 justify-center items-start mt-6 flex-row'>
                        {/* <View className='flex justify-center items-center flex-col'>
                            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#F0F1F3]/80'>
                                <DirectboxNotif size={56} variant='Bulk' color={Colors.primary} />
                            </View>
                            <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате нарачки {'\n'}во моментов</Text>
                        </View> */}

                        <ScrollView className='flex flex-col w-full'>
                            <View className='jusify-start flex-1 flex flex-col items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='flex flex-row items-start'>

                                    <View className='w-20 h-20  bg-[#0b0b0b] rounded-2xl'></View>
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
                                    <TouchableOpacity className='flex items-center bg-[#F0F1F3] px-3 flex-1 py-4 rounded-2xl'>
                                        <Text style={{ fontFamily: "medium" }}>Види нарачка</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity className='flex items-center bg-[#F0F1F3] px-3 flex-1 py-4 rounded-2xl'>
                                        <Text style={{ fontFamily: "medium" }}>Откажи</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>





                        </ScrollView>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeInDown.delay(200).duration(200).springify()} className='px-6 flex-1 justify-center items-start mt-6 flex-row'>
                        {/* <View className='flex justify-center items-center flex-col'>
                            <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#F0F1F3]/80'>
                                <DirectboxNotif size={56} variant='Bulk' color={Colors.primary} />
                            </View>
                            <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: "medium" }}>Немате предходни {'\n'}нарачки</Text>
                        </View> */}

                        <ScrollView className='flex flex-col  w-full'>
                            <TouchableOpacity className='rotunded-3xl jusify-start flex flex-row items-center border-b border-[#0b0b0b]/10 py-5'>
                                <View className='w-20 h-20  bg-[#0b0b0b] rounded-2xl'></View>
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
                                <View className='w-20 h-20  bg-[#0b0b0b] rounded-2xl'></View>
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
                                <View className='w-20 h-20  bg-[#0b0b0b] rounded-2xl'></View>
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
                    </Animated.View>
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
        width: 176, // Set this to your tab width
    },
    content: {
        fontSize: 20,
    },
});
export default Page;
