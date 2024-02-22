import { View, Text, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Add, ArrowDown, ArrowDown2, Bag, CloseSquare, DirectInbox, DirectboxSend, Menu, Minus, More, Send, Share, Trash, } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet/'
import restaurants from '../data/resataurants'
import { Animated } from 'react-native'

const Page = () => {

    const [menuToggled, setmenuToggled] = useState(false);

    const toggleMenu = () => {
        setmenuToggled(true)
        snapeToIndex(0)
    }

    const hideMenu = () => {

        setmenuToggled(false)
    }

    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const itemPrice = 180;


    const handleDecreaseQuantity = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
        } else {
            animation.setValue(0);
            setAnimationPlayed(false);
            setItemQuantity(0);
        }
    };


    const totalItemPrice = itemPrice * itemQuantity;

    const snapPoints = useMemo(() => ['30%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)


    const [visible, setVisible] = useState(false);
    // State to ensure animation only plays once
    const [animationPlayed, setAnimationPlayed] = useState(false);

    // Ref for the animated value
    const animation = useRef(new Animated.Value(0)).current; // Initial value for opacity and position

    // Function to trigger the animation
    const addToCart = () => {

        if (itemQuantity < 99) {
            setItemQuantity(itemQuantity + 1);
        }
        // Check if animation has already been played
        if (!animationPlayed) {
            setVisible(true); // Make the button eligible for display
            // Start the animation
            Animated.spring(animation, {
                toValue: 1, // Final value for opacity and translateY
                speed: 16, // Control speed of the animation
                bounciness: 8,

                // Animation duration
                useNativeDriver: true, // Use native driver for better performance
            }).start(() => setAnimationPlayed(true)); // Mark animation as played
        }
    };

    // Calculated styles based on animation value
    const animatedStyle = {
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1], // Opacity from 0 to 1
        }),
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0], // Move from -20 to 0
            })
        }]
    };



    return (

        <View style={styles.header} className='h-full bg-[#0b0b0b]'>

            <View className='bg-[#0b0b0b] px-6 h-44 '>
                <View className='flex flex-row justify-between items-center w-full'>

                    <TouchableOpacity onPress={() => router.back()} className='flex justify-center items-center rounded-full' >
                        <CloseSquare variant='Linear' size={28} color={Colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleMenu} className='flex justify-center items-center rounded-full' >
                        <More variant='Linear' size={28} color={Colors.white} />
                    </TouchableOpacity>
                </View>


            </View>


            <View className='flex-1 bg-[#FFFFFC]'>

                <View className='mt-6 px-6'>
                    <Text className='text-2xl text-[#0b0b0b]' style={{ fontFamily: "semibold" }}>Бонапарта</Text>
                    <Text className='text-[#0b0b0b] text-lg' style={{ fontFamily: "semibold" }}>180 ден</Text>
                    <Text className='text-[#0b0b0b]/60 mt-3 leading-5' style={{ fontFamily: "medium" }}>Француско лебче · Кашкавал · Печеница · Домати · Павлака</Text>
                </View>

                {/* <View className='p-4 w-full flex justify-start items-start bg-[#FFFFFC]'>
                    <View className='p-4 px-10 w-full rounded-2xl border border-[#757780]/10 flex flex-row justify-between items-center'>
                        <View className=' flex flex-col justify-cente items-center'>
                        <Text className='text-sm' style={{ fontFamily: 'semibold' }}>30 мин</Text>
                            <Text style={{ fontFamily: "medium" }} className='text-xs mt-1 text-[#0b0b0b]/80'>Време на достава</Text>
                        </View>

                        <View className='h-full bg-[#757780]/10 w-[1px]'></View>

                        <View className=' flex flex-col justify-cente items-center'>
                            <Text className='text-sm' style={{ fontFamily: 'semibold' }}>30 мин</Text>
                            <Text style={{ fontFamily: "medium" }} className='text-xs mt-1 text-[#0b0b0b]/80'>Време на достава</Text>
                        </View>
                    </View>
                </View> */}

                <View className='w-full h-1 bg-[#757780]/10 mt-6'></View>

                <Text className='text-[#0b0b0b]  px-6 mt-6' style={{ fontFamily: "semibold" }}>Избери количина</Text>
                <View className=' bg-[#F0F1F3] p-1 flex-row items-center rounded-xl justify-between w-24 mt-3 mx-6'>
                    <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#FFFFFC]/20 flex justify-center items-center w-8 h-8  rounded-lg '>
                        <Minus
                            size={20}
                            color={Colors.dark}
                            variant='Linear'
                        />

                    </TouchableOpacity>

                    <Text className='text-[16px] text-[#0b0b0b]'>{itemQuantity}</Text>

                    <TouchableOpacity onPress={addToCart} className='bg-[#FFFFFC]/20 flex justify-center items-center w-8 h-8  rounded-lg ' >
                        <Add
                            size={20}
                            color={Colors.dark}
                            variant='Linear'
                        />
                    </TouchableOpacity>
                </View>




                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', '#FFFFFC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                    {
                        visible && (
                            <Animated.View style={animatedStyle}>
                                <TouchableOpacity onPress={() => router.back()} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                    <Bag variant='Bulk' size={22} color={Colors.primary} />
                                    <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Додади {itemQuantity} во Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {totalItemPrice} ден</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    }
                </LinearGradient>


            </View>

            <View className={menuToggled ? 'absolute h-screen w-screen ' : 'hidden'}>
                <TouchableOpacity onPress={hideMenu} className='flex-1 bg-[#0b0b0b]/50 h-full'></TouchableOpacity>
                <BottomSheet
                    ref={bottomSheetRef}
                    enablePanDownToClose={true}
                    backgroundStyle={{ backgroundColor: '#FFFFFC' }}
                    handleIndicatorStyle={{ backgroundColor: Colors.dark }}
                    index={menuToggled ? 0 : -1}
                    snapPoints={snapPoints}
                    onClose={() => {
                        2
                        setmenuToggled(false);
                    }}
                >
                    <View className='px-6'>
                        <TouchableOpacity className='py-4'>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>

        </View>

    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 40 : 30,
    }
});