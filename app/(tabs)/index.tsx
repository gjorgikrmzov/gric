import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Dimensions, AppState, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User, Location, Shop, DocumentText, ArrowDown, ArrowDown2, DiscountShape, InfoCircle, Information, Clock, HambergerMenu, SidebarTop, Heart, Category, Bookmark, Element } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';


const Page = () => {

    const restaurants = [
        { restaurantTitle: 'Бу Хаус', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
        { restaurantTitle: 'Бонита', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
        // { restaurantTitle: 'Хепинес', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', restaurantImage: require('../../assets/images/bongjorno.png') },
        { restaurantTitle: 'Елизабет', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
        { restaurantTitle: 'Бонџорно', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
    ];

    const categories = [
        { categoryImage: require('../../assets/images/burger.png'), categoryTitle: 'Бургер' },
        { categoryImage: require('../../assets/images/piza.png'), categoryTitle: 'Пица' },
        { categoryImage: require('../../assets/images/taco.png'), categoryTitle: 'Тако' },
        { categoryImage: require('../../assets/images/pasta.png'), categoryTitle: 'Паста' },
        { categoryImage: require('../../assets/images/salad.png'), categoryTitle: 'Салата' },
        { categoryImage: require('../../assets/images/donut.png'), categoryTitle: 'Слатко' },
        { categoryImage: require('../../assets/images/meat.png'), categoryTitle: 'Скара' },
    ]


    const [likeStatus, setLikeStatus] = useState<boolean[]>(Array(restaurants.length).fill(true));

    const handleLikeRestaurant = (index: number) => {
        const updatedLikeStatus = [...likeStatus];
        updatedLikeStatus[index] = !updatedLikeStatus[index];
        setLikeStatus(updatedLikeStatus);
    };



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

            <View className='w-screen  h-screen absolute z-0 left-0 top-0 bg-[#FAFAFA]'>
            </View>

            <Animated.View className='flex-1' entering={FadeIn.springify().duration(400)}>
                <SafeAreaView style={styles.header} className='bg-[#FAFAFA] h-screen'>

                    <View className='bg-[#FAFAFA] border-b  border-[#0b0b0b]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row '>
                        <StatusBar style='dark' />
                        <TouchableOpacity onPress={() => router.push('/(modals)/manageLocation')}>
                            <View className='flex items-center flex-row'>
                                <Location size={16} color={Colors.primary} variant='Bulk' />
                                <Text className='text-[#0b0b0b]/60 ml-1' style={{ fontFamily: "medium" }}>Достави на</Text>
                                <ArrowDown2 className='ml-0.5' size={14} color={Colors.dark} variant='Linear' />
                            </View>

                            <Text className='text-[#0b0b0b] mt-1 ' style={{ fontFamily: 'medium' }}>Внесете ja вашата адреса</Text>
                        </TouchableOpacity>

                        <View className='flex flex-row items-center gap-x-2'>
                            <TouchableOpacity onPress={() => router.push('/(user)/notifications')} className='w-12 h-12 flex justify-center items-center rounded-2xl border border-[#0b0b0b]/10'>
                                <View className='w-4 h-4 bg-[#0b0b0b] border-2 border-[#FAFAFA] rounded-full absolute right-2.5 z-10 top-2.5 flex justify-center items-center'>
                                    <Text className='text-[8px] text-[#FAFAFA] left-[0.5px]' style={{ fontFamily: 'extrabold' }}>2</Text>
                                </View>
                                <Notification1 color={Colors.dark} size={22} variant='Broken' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(user)/profile')} className='w-12 h-12 flex justify-center items-center rounded-2xl border border-[#0b0b0b]/10'>
                                <User color={Colors.dark} size={22} variant='Broken' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView removeClippedSubviews showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
                        onRefresh={onRefresh} className='z-10 ' />}>

                        {/* SEARCH BAR */}
                        <View className='mt-4  px-6'>

                            <View className='w-full  items-center flex-row flex justify-between'>

                                <View className='flex flex-col'>
                                    <Animated.Text entering={FadeInDown.springify().duration(300).delay(200)} className='text-4xl text-[#6BA368]' style={{ fontFamily: 'heavy' }} >GRIC</Animated.Text>
                                    <Animated.Text entering={FadeInDown.springify().duration(300).delay(300)} className='text-xs text-[#0b0b0b] mt-[-5px] ml-0.5' style={{ fontFamily: 'extraboldI' }} >DELIVERY</Animated.Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/restaurants')} className='flex flex-row items-center mt-4'>
                                <View className='rounded-2xl py-5 px-5 flex-row items-center flex-1 bg-[#F0F1F3]  '>
                                    <SearchNormal1 variant='Broken' color='#0b0b0b97' size={22} />
                                    <Text className='text-[#0b0b0b]/60 ml-3' style={{ fontFamily: 'medium' }}>Пребарај Ресторани</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className='w-full mt-6 px-6 justify-between items-end flex flex-row'>
                            <View className='flex flex-col ml-1'>
                                <View className='flex items-center flex-row gap-x-2'>
                                    <Element size={19} color={Colors.primary} variant='Bulk' />
                                    <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Категории</Text>
                                </View>
                                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Популарни Категории</Text>
                            </View>

                        </View>

                        <View className='w-full'>
                            <ScrollView removeClippedSubviews horizontal contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} className='flex-row flex-1' snapToInterval={324} decelerationRate={'fast'}
                                snapToAlignment='end'
                                showsHorizontalScrollIndicator={false} >
                                <Animated.View entering={FadeIn.springify().duration(300).delay(100)} className='flex flex-row items-center px-6 gap-x-2'>
                                    {categories.map((category, index) => (
                                        <TouchableOpacity key={index} className='flex justify-center'>
                                            <Image style={{ tintColor: '#0b0b0b' }} className='w-10 h-10 z-10 top-4 self-center' contentFit='contain' source={category.categoryImage} />
                                            <View className='bg-[#F0F1F3]  w-20 py-3 rounded-2xl flex justify-center items-center'>
                                                <Text className='text-[#0b0b0b]/80 mt-4 text-xs' style={{ fontFamily: 'semibold' }}>{category.categoryTitle}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </Animated.View>
                            </ScrollView>

                        </View>


                        {/* RESTAURANTS SECTION */}
                        <View className='mt-6'>
                            <View className='w-full px-6 justify-between items-end flex flex-row'>
                                <View className='flex flex-col ml-1'>
                                    <View className='flex items-center flex-row gap-x-2'>
                                        <Shop size={19} color={Colors.primary} variant='Bulk' />
                                        <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Ресторани</Text>
                                    </View>
                                    <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Популарни Ресторани</Text>
                                </View>

                            </View>

                            <View className='w-full mt-3 '>

                                <ScrollView
                                    removeClippedSubviews
                                    horizontal
                                    contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                                    className='flex-row flex-1'
                                    snapToAlignment='start'
                                    showsHorizontalScrollIndicator={false}
                                    decelerationRate={'fast'}
                                    snapToInterval={290 + 12}
                                >
                                    <View className='flex px-6 flex-row items-center gap-x-3'>
                                        {restaurants.map((restaurant, index) => (
                                            <View key={index} className='flex overflow-hidden  flex-row items-center relative'>

                                                {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                                                <TouchableOpacity
                                                    className='w-[290px] border border-[#0b0b0b]/40 p-5 bg-[#0b0b0b]  rounded-3xl'
                                                    style={{ overflow: 'hidden' }} // Add this style to hide the overflow
                                                >
                                                    <View className='flex flex-row items-center justify-between w-full'>
                                                        <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantType}</Text>
                                                        <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                                                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                                                        </TouchableOpacity>

                                                    </View>
                                                    <Text className='text-primary text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantTitle}</Text>

                                                    <View className='flex flex-col gap-y-2 mt-6'>
                                                        {/* <View className='flex flex-row mt-1 items-center'>
                                                            <Location variant='Bulk' color={Colors.primary} size={16} />
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>3км</Text>
                                                        </View> */}
                                                        <View className='flex flex-row items-center'>
                                                            <Clock variant='Bulk' color={Colors.primary} size={16} />
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                                                        </View>
                                                        <View className='flex flex-row items-center'>
                                                            <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${restaurant.restaurantCategories.split(' ').join(' · ')}`}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                </ScrollView>

                            </View>
                        </View>





                        <View className='px-6 mt-3 hidden'>
                            <TouchableOpacity className=' py-6 rounded-3xl justify-center items-center flex bg-[#0b0b0b]'>
                                <Text className='text-[#FAFAFA]' style={{ fontFamily: 'medium' }}>Види ги сите</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
        </>
    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 10 : 0,
    }
});