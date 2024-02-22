import { Animated as RNAnimated, View, Text, TouchableOpacity, ScrollView, RefreshControl, Dimensions, AppState, StyleSheet, Platform, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User, Location, Shop, DocumentText, ArrowDown, ArrowDown2, DiscountShape, InfoCircle, Information, Clock, HambergerMenu, SidebarTop, Heart, Category, Bookmark, Element, ArrowRight2, ArrowRight, ArrowLeft, CloseSquare, ArrowCircleRight, RecordCircle, Timer } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import Animated, { Easing, FadeIn, FadeInDown, FadeInUp, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import restaurants from '../../data/resataurants'

const Page = () => {

    const [orderExists, setorderExists] = useState(true)
    
    const categories = [
        { categoryImage: require('../../assets/images/burger.png'), categoryTitle: 'Бургер' },
        { categoryImage: require('../../assets/images/piza.png'), categoryTitle: 'Пица' },
        { categoryImage: require('../../assets/images/taco.png'), categoryTitle: 'Тако' },
        { categoryImage: require('../../assets/images/pasta.png'), categoryTitle: 'Паста' },
        { categoryImage: require('../../assets/images/salad.png'), categoryTitle: 'Салата' },
        { categoryImage: require('../../assets/images/donut.png'), categoryTitle: 'Десерт' },
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


    const [savedAddress, setSavedAddress] = useState<string>('');

    useEffect(() => {
        const loadAddress = async () => {
            try {
                const storedAddress = await AsyncStorage.getItem('savedAddress');
                if (storedAddress) {
                    setSavedAddress(storedAddress);
                    console.log('Address loaded from AsyncStorage');
                }
            } catch (error) {
                console.error('Failed to fetch the address from AsyncStorage', error);
            }
        };

        loadAddress();
    }, []);



    const maxLength = 20;
    const trimmedAdress = savedAddress.length > maxLength ? `${savedAddress.substring(0, maxLength)}...` : savedAddress;

    const [search, setSearch] = useState<string>('');
    const [close, setClose] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    // Assuming handleFocus and handleBlur functions are defined elsewhere in your component

    const onChangeInput = (text: string) => {
        setSearch(text);
        setClose(text !== '');
    };




    const [isAnimating, setIsAnimating] = useState(false); // New state to track if an animation is in progress
    const [isFocused, setIsFocused] = useState(false);
    const overlayOpacity = useSharedValue(1); // Start with full opacity
    const searchResult = useSharedValue(0);
    const inputY = useSharedValue(10); // Adjust starting position if necessary

    // Animated styles
    const onFocus = () => {
        setIsFocused(true);
        inputY.value = withSpring(-70, {
            duration: 1500,
            stiffness: 20,
        });
        overlayOpacity.value = withSpring(0, {
            duration: 200,
        });
        searchResult.value = withSpring(1);
    };

    const onBlur = () => {
        Keyboard.dismiss();
        setIsFocused(false);
        inputY.value = withSpring(10, {
            duration: 1500,
            stiffness: 20,
        });
        overlayOpacity.value = withSpring(1);
        searchResult.value = withSpring(0);
    };

    const animatedInputStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: inputY.value }],
    }));

    const animatedOverlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    const animatedResultStyle = useAnimatedStyle(() => ({
        opacity: searchResult.value,
    }));



    const spinValue = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            // Animate from current value to the next (increased by 1 every time)
            spinValue.setValue(0); // Reset the value without causing a visual reset
            RNAnimated.timing(spinValue, {
                toValue: 1,
                duration: 1300,
                easing: Easing.circle,
                useNativeDriver: true,
            }).start(() => {
                spinValue.setValue(1); // Immediately set to end value to avoid visual reset
                animate(); // Loop the animation by calling it recursively
            });
        };
        animate();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'], // Adjust this to '360deg' if you want a full rotation
    });


    return (
        <>

            <View className='w-screen  h-screen absolute z-0 left-0 top-0 bg-[#FFFFFC]'>
            </View>

            <Animated.View className='h-full' entering={FadeIn.springify().duration(400)}>
                <StatusBar style='dark' />
                <SafeAreaView style={styles.header} className='bg-[#FFFFFC] h-full'>

                    <View className='bg-[#FFFFFC] z-0 border-b  border-[#757780]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row '>
                        <TouchableOpacity onPress={() => router.push('/(modals)/manageAddresses')}>
                            <View className='flex items-center flex-row'>
                                <Location size={16} color={Colors.primary} variant='Bulk' />
                                <Text className='text-[#0b0b0b]/60 ml-1' style={{ fontFamily: "medium" }}>Достави на</Text>
                                <ArrowDown2 className='ml-0.5' size={14} color={Colors.dark} variant='Linear' />
                            </View>
                            {savedAddress ?
                                (
                                    <Text className='text-[#0b0b0b] mt-1 ' style={{ fontFamily: 'medium' }}>{trimmedAdress}</Text>

                                ) :

                                (
                                    <Text className='text-[#0b0b0b] mt-1 ' style={{ fontFamily: 'medium' }}>Внесете адреса</Text>
                                )
                            }
                        </TouchableOpacity>

                        <View className='flex flex-row items-center gap-x-2'>
                            <TouchableOpacity onPress={() => router.push('/(user)/notifications')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                                <View className='rounded-full absolute z-10 right-3.5 top-3 flex justify-center items-center'>
                                    <RecordCircle variant='Bulk' size={16} color={Colors.primary} />
                                </View>
                                <Notification1 color={Colors.dark} size={20} variant='Broken' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(user)/profile')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                                <User color={Colors.dark} size={20} variant='Broken' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView keyboardShouldPersistTaps="always" removeClippedSubviews showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
                        onRefresh={onRefresh} className='z-10 flex-1' />}>

                        {/* SEARCH BAR */}
                        <Animated.View style={animatedOverlayStyle} className='mt-4  px-6'>

                            <View className='z-0 w-full items-start flex-col flex justify-between'>
                                <View className='flex flex-col mt-2'>
                                    <Animated.Text entering={FadeInDown.springify().duration(300).delay(200)} className='text-4xl text-[#98CE00]' style={{ fontFamily: 'heavy' }} >GRIC</Animated.Text>
                                    <Animated.Text entering={FadeInDown.springify().duration(300).delay(200)} className='mt-[-3px] text-[#0b0b0b]/80' style={{ fontFamily: 'heavy' }} >DELIVERY</Animated.Text>
                                </View>
                            </View>


                        </Animated.View>

                        <Animated.View style={animatedInputStyle}>
                            <View className='mx-6 bg-[#fafafa]/80 mt-2 z-[999] items-center flex-row px-5 rounded-2xl'>
                                {
                                    isFocused ?
                                        (
                                            <TouchableOpacity onPress={onBlur} className=' flex justify-center items-center'>
                                                <ArrowLeft size={20} color={Colors.dark} variant='Broken' />
                                            </TouchableOpacity>

                                        ) :

                                        (
                                            <SearchNormal1 size={20} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
                                }

                                <TextInput style={styles.input} ref={inputRef} onChangeText={onChangeInput} onFocus={onFocus}
                                    onBlur={onBlur} className='text-[#0b0b0b] px-3 flex-1 ' placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />
                                <TouchableOpacity onPress={() => { setSearch(''); inputRef.current?.clear(); setClose(false) }} className={close ? 'flex justify-center items-center opacity-100' : ' opacity-0'}>
                                    <CloseSquare size={24} color={Colors.dark} variant='Bold' />
                                </TouchableOpacity>

                            </View>

                            <KeyboardAvoidingView>
                                {search === '' ? (
                                    <Animated.View style={animatedResultStyle} className={isFocused ? 'flex h-full mt-8 px-6' : 'hidden h-full mt-8 px-6'}>
                                        <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
                                        <ScrollView keyboardShouldPersistTaps="always" // This is the key change
                                            showsVerticalScrollIndicator={false} className='flex flex-col mt-3' >
                                            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Бу Хаус</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Елизабет</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Бонита</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Хаштаг</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </Animated.View>
                                )
                                    :
                                    (<Animated.View style={animatedResultStyle} className='flex h-full mt-8 px-6'>
                                        <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
                                        <ScrollView keyboardShouldPersistTaps="always" // This is the key change
                                            showsVerticalScrollIndicator={false} className='flex flex-col mt-3' >
                                            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Бу Хаус</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>


                                        </ScrollView>
                                    </Animated.View>)}
                            </KeyboardAvoidingView>
                        </Animated.View>


                        <Animated.View style={animatedOverlayStyle} className='w-full mt-8 px-6 justify-between items-end flex flex-row'>
                            <View className='flex flex-col ml-1'>
                                <View className='flex items-center flex-row gap-x-2'>
                                    <Element size={19} color={Colors.primary} variant='Bulk' />
                                    <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'bold' }}>Категории</Text>
                                </View>
                                <Text className='text-xs text-[#0b0b0b]/60 ' style={{ fontFamily: 'semibold' }}>Популарни Категории</Text>
                            </View>

                        </Animated.View>

                        <Animated.View style={animatedOverlayStyle} className='w-full'>
                            <ScrollView removeClippedSubviews horizontal contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} className='flex-row flex-1' snapToInterval={324} decelerationRate={'fast'}
                                snapToAlignment='end'
                                showsHorizontalScrollIndicator={false} >
                                <Animated.View entering={FadeIn.springify().duration(300).delay(100)} className='flex flex-row items-center px-6 gap-x-2'>
                                    {categories.map((category, index) => (
                                        <TouchableOpacity key={index} className='flex justify-center'>
                                            <Image style={{ tintColor: '#0b0b0b' }} className='w-9 h-9 z-10 top-4 self-center' contentFit='contain' source={category.categoryImage} />
                                            <View className='bg-[#fafafa]/80  w-20 py-3 rounded-2xl flex justify-center items-center'>
                                                <Text className='text-[#0b0b0b]/80 mt-4 text-xs' style={{ fontFamily: 'semibold' }}>{category.categoryTitle}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </Animated.View>
                            </ScrollView>

                        </Animated.View>


                        {/* RESTAURANTS SECTION */}
                        <Animated.View style={animatedOverlayStyle} className='mt-6'>
                            <View className='w-full px-6 justify-between items-center flex flex-row'>
                                <View className='flex flex-col ml-1'>
                                    <View className='flex items-center flex-row gap-x-2'>
                                        <Shop size={19} color={Colors.primary} variant='Bulk' />
                                        <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'bold' }}>Ресторани</Text>
                                    </View>
                                    <Text className='text-xs text-[#0b0b0b]/60 ' style={{ fontFamily: 'semibold' }}>Популарни Ресторани</Text>
                                </View>

                                <TouchableOpacity onPress={() => router.push('/(tabs)/restaurants')} >
                                    <ArrowCircleRight size={25} color={Colors.dark} variant='Linear' />
                                </TouchableOpacity>
                            </View>

                            <View className='w-full mt-4 '>

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
                                                        <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{restaurant.type}</Text>
                                                        <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                                                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                                                        </TouchableOpacity>

                                                    </View>
                                                    <Text className='text-primary text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{restaurant.name}</Text>

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
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{restaurant.desc}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                </ScrollView>

                            </View>

                        </Animated.View>


                    </ScrollView>
                </SafeAreaView>

                <View className={orderExists ? 'px-6 flex w-full justify-center items-center absolute bottom-4' : 'hidden'}>
                    <TouchableOpacity onPress={() => router.push('/(order)/trackOrder')} className='w-full p-4 rounded-2xl flex items-center justify-between flex-row bg-[#FFFFFC] shadow-md'>
                        <View className='flex flex-row items-center  space-x-3'>
                            <View className=' flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden'></View>
                            <View className='flex flex-col'>
                                <Text className=' text-[#0b0b0b]/80 uppercase' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                <Text className=' mt-1 text-[#0b0b0b]' style={{ fontFamily: "medium" }}>x1 Бонапарата</Text>
                            </View>
                        </View>

                        <RNAnimated.View style={{ transform: [{ rotate: spin }] }}>
                            <Timer variant='Bulk' color={Colors.primary} size={36} />
                        </RNAnimated.View>
                    </TouchableOpacity>
                </View>


            </Animated.View >

        </>
    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 10 : 0,
    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    }
});