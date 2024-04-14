import { View, Text, Platform, StyleSheet } from 'react-native'
import React, {useRef, useState } from 'react'
import { Add, Bag, CloseSquare, Minus, More} from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Animated } from 'react-native'

const Page = () => {

    const { id, name, description, price } = useLocalSearchParams()

    
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const itemPrice = 180;

    const handleDecreaseQuantity = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
        } else {
            animation.setValue(0);
            setCartButtonAnimationPlayed(false);
            setItemQuantity(0);
        }
    };


    const totalItemPrice = itemPrice * itemQuantity;

    const [cartButtonVisible, setCartButtonVisible] = useState(false);
    const [cartButtonanimationPlayed, setCartButtonAnimationPlayed] = useState(false);

    const animation = useRef(new Animated.Value(0)).current; 

    const addToCart = () => {

        if (itemQuantity < 99) {
            setItemQuantity(itemQuantity + 1);
        }
        if (!cartButtonanimationPlayed) {
            setCartButtonVisible(true); 
            Animated.spring(animation, {
                toValue: 1, 
                speed: 16, 
                bounciness: 8,

                useNativeDriver: true, 
            }).start(() => setCartButtonAnimationPlayed(true)); 
        }
    };

    const animatedStyle = {
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1], 
        }),
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0], 
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

                    <TouchableOpacity className='flex justify-center items-center rounded-full' >
                        <More variant='Linear' size={28} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex-1 bg-[#FFFFFC]'>
                <View className='mt-6 px-6'>
                    <Text className='text-2xl text-[#0b0b0b]' style={{ fontFamily: "semibold" }}>{name}</Text>
                    <Text className='text-[#0b0b0b] text-lg' style={{ fontFamily: "semibold" }}>{price} ден</Text>
                    <Text className='text-[#0b0b0b]/60 mt-3 leading-5' style={{ fontFamily: "medium" }}>{description}</Text>
                </View>

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
                        cartButtonVisible && (
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
        </View>

    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 40 : 30,
    }
});