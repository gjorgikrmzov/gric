import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Add, ArrowLeft2, ArrowUp, Bag, Bookmark, Clock, Element, Element2, Heart, Location } from 'iconsax-react-native'
import { router } from 'expo-router'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const Page = () => {

    const foodDetails = [
        { foodName: 'Бонапарта', foodDesc: 'Кашкавал · Мортадела ', price: 180, image: require('../assets/images/burger.png') },
        { foodName: 'Бонапарта', foodDesc: 'Кашкавал · Мортадела ', price: 180, image: require('../assets/images/burger.png') },
        { foodName: 'Бонапарта', foodDesc: 'Кашкавал · Мортадела ', price: 180, image: require('../assets/images/burger.png') },
        { foodName: 'Бонапарта', foodDesc: 'Кашкавал · Мортадела ', price: 180, image: require('../assets/images/burger.png') },
        { foodName: 'Бонапарта', foodDesc: 'Кашкавал · Мортадела ', price: 180, image: require('../assets/images/burger.png') },
    ]

    const [loadPizza, setloadPizza] = useState(false)

    const handleToggle = () => {
        setloadPizza(prev => !prev);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 8, animated: true });
        }
    };

    const handleToggleBurger = () => {
        setloadPizza(prev => !prev);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 8, animated: true });
        }
    };


    const scrollViewRef = useRef<ScrollView>(null);

    const [activeItem, setActiveItem] = useState<string | null>(null);

    const toggleCategory = (itemName: string) => {
        setActiveItem((prevItem) => (prevItem === itemName ? null : itemName));
    };

    const renderItem = (itemName: string) => {
        const isActive = activeItem === itemName;

        return (
            <TouchableOpacity
                onPress={() => toggleCategory(itemName)}
                style={{
                    backgroundColor: isActive ? '#0b0b0b' : '#fafafa',
                    borderColor: '#0b0b0b',
                }}
                className='h-10 w-max start items-center flex-row flex border border-[#0b0b0b]/20 rounded-xl px-4'
            >
                <Text style={{ color: isActive ? '#fafafa' : '#0b0b0b', fontFamily: 'semibold' }}>
                    {itemName}
                </Text>
            </TouchableOpacity>
        );
    };

    

    return (
        <View className='flex-1 pb-6 bg-[#fafafa]'>

            <StatusBar style='light' />
            <View className='bg-[#0b0b0b] pt-20 pb-6 px-6 overflow-hidden'>
                <View>

                    <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/10 rounded-xl' >
                        <ArrowLeft2 variant='Linear' size={22} color={Colors.white} />
                    </TouchableOpacity>

                    <Text className=' text-[#fafafa]/60 uppercase mt-10' style={{ fontFamily: "bold" }}>Пица ресторан</Text>
                    <Text className='text-3xl text-[#fafafa] mt-1' style={{ fontFamily: "bold" }}>Бу Хаус</Text>

                    <View className='flex flex-col gap-y-2 mt-3'>

                        <View className='flex flex-row items-center'>
                            <Clock variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                        </View>
                        <View className='flex flex-row items-center'>
                            <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Бургер · Сендвич · Салата</Text>
                        </View>
                    </View>
                </View>
            </View>



            <View className='mt-2 mb-4 flex-col '>


                <ScrollView removeClippedSubviews
                    horizontal
                    decelerationRate={'fast'}
                    snapToAlignment='end'
                    showsHorizontalScrollIndicator={false}

                    className='h-min  mt-2'  >

                    <View className='px-6 justify-left items-center gap-x-3 flex flex-row'>
                        {renderItem('🍔 Бургер')}
                        {renderItem('🍕 Пица')}
                        {renderItem('🌮 Тако')}
                        {renderItem('🥪 Сендвич')}
                        {renderItem('🥗 Салата')}
                    </View>
                </ScrollView>
            </View>



            <ScrollView ref={scrollViewRef}>
                <View className='flex-1 bg-[#fafafa]  pb-24'>
                    <Text className='text-2xl px-6 text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Пица</Text>

                    <View className='flex flex-col'>


                        {foodDetails.map((food, index) => (
                            <TouchableOpacity key={index} onPress={() => router.push('/foodDetails')} className='flex-row flex justify-between items-center py-6 px-6 border-b border-[#0b0b0b]/20'>
                                <View>
                                    <Text className='text-lg' style={{ fontFamily: "semibold" }}>{food.foodName}</Text>
                                    <Text className='text-[#0b0b0b]/80 mt-1' style={{ fontFamily: "medium" }}>{food.foodDesc}</Text>
                                    <Text className='text-xl mt-3 text-[#85B4FF]' style={{ fontFamily: 'bold' }}>{food.price} ден</Text>
                                </View>

                                <View className='flex justify-center items-center bg-[#0b0b0b]/10 rounded-2xl overflow-hidden w-20 h-20'>
                                  
                                </View>
                            </TouchableOpacity>
                        ))}


                    </View>
                </View>
            </ScrollView >


            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', '#fafafa']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                <TouchableOpacity onPress={() => router.replace('/(tabs)/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                    <Bag variant='Bulk' size={22} color={Colors.primary} />
                    <Text style={{ fontFamily: "medium" }} className=' text-[#fafafa] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> 1</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View >
    )
}

export default Page