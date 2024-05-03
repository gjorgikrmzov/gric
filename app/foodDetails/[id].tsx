import { View, Text, Platform, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Add, Archive, ArrowDown, Bag, CloseSquare, Minus, More, ShoppingCart } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearCart } from '../reduxStore/cartSlice'
import { RootState } from '../reduxStore'

const Page = () => {

    const { storeId, id, name, description, price, isOpen, category } = useLocalSearchParams<{ storeId: string; id: string; name: string; description: string; price: string, isOpen: string, category: any }>();

    const dispatch = useDispatch();
    const isStoreOpen = isOpen === 'true' ? true : isOpen === 'false' ? false : isOpen;

    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleAddToCart = () => {
        const differentStoreItemExists = cartItems.some(cartItem => cartItem.storeId !== storeId);

        if (!isStoreOpen) {
            Alert.alert(
                "Продавницата е затворена",
                "Во моментов сме затворени. Дојдете подоцна",
                [
                    { text: "Океј", style: "cancel" },
                ]
            );
            return false
        }

        if (differentStoreItemExists) {
            Alert.alert(
                "Корпа",
                "Вашата корпа содржи продукти од различни продавници. Дали сакате да ги избришете и да ги додадете новите?",
                [
                    { text: "Не", style: "cancel" },
                    {
                        text: "Да", onPress: () => {
                            dispatch(clearCart());
                            dispatch(addItem({ storeId, id, quantity: itemQuantity, name, price }));
                            router.back()
                        }
                    }
                ]
            );
            return true
        } else {
            dispatch(addItem({ storeId, id, quantity: itemQuantity, name, price }));
            router.back()
        }

    };


    const [itemQuantity, setItemQuantity] = useState<number>(1);

    const handleDecreaseQuantity = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
        } else {
            animation.setValue(0);
            setCartButtonAnimationPlayed(false);
        }
    };


    const itemPrice = parseFloat(price);
    const totalItemPrice: number = itemQuantity * itemPrice;

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

                    <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                        <ArrowDown variant='Broken' size={20} color={Colors.white} />
                    </TouchableOpacity>

                    {cartItems.length === 0 ? (
                        null
                    ) : (
                        <TouchableOpacity onPress={() => router.push("/(tabs)/cart")} className='flex flex-row justify-center items-center rounded-lg bg-[#1BD868] px-3 py-1.5' >
                            <ShoppingCart size={18} color={Colors.dark} variant='Broken' />
                            <Text className='text-[16px] ml-2' style={{ fontFamily: "medium" }}>{cartItems.length}</Text>
                        </TouchableOpacity>
                    )}
                </View>


            </View>

            <View className='flex-1 bg-[#FFFFFC]'>
                <View className='mt-6 px-6'>
                    <View className='flex items-center flex-row'>
                        <Archive variant='Bulk' size={18} color={Colors.primary} />
                        <Text className='text-[#0b0b0b]/60 uppercase ml-1' style={{ fontFamily: "bold" }}>{category}</Text>
                    </View>
                    <Text className='text-2xl text-[#0b0b0b] mt-1' style={{ fontFamily: "semibold" }}>{name}</Text>
                    <Text className='text-[#0b0b0b]/80' style={{ fontFamily: "medium" }}>{description}</Text>
                    <Text className='text-[#0b0b0b] text-lg mt-3' style={{ fontFamily: "semibold" }}>{price} <Text style={{fontFamily: "medium"}} className='text-[#0b0b0b]/60 text-sm'>ден</Text></Text>
                </View>

                {/* <View className='w-full h-1 bg-[#757780]/10 mt-6'></View> */}

                {/* <Text className='text-[#0b0b0b]  px-6 mt-6' style={{ fontFamily: "semibold" }}>Избери количина</Text> */}

                {/* <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', '#FFFFFC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                    {
                        cartButtonVisible && (
                            iew style={animatedStyle}>
                                <TouchableOpacity onPress={handleAddToCart} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                    <Bag variant='Bulk' size={22} color={Colors.primary} />
                                    <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Додади {itemQuantity} во Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {totalItemPrice} ден</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    }
                </LinearGradient> */}

                <View className='absolute flex bottom-10 flex-row items-center px-6 gap-x-3'>
                    <View className=' bg-[#F0F1F3] p-1 flex-row items-center rounded-2xl justify-between '>
                        <TouchableOpacity onPress={handleDecreaseQuantity} className='flex justify-center items-center w-12 h-10 rounded-xl '>
                            <Minus
                                size={20}
                                color={Colors.dark}
                                variant='Linear'
                            />
                        </TouchableOpacity>

                        <Text className='text-[16px] text-[#0b0b0b]'>{itemQuantity}</Text>

                        <TouchableOpacity onPress={addToCart} className='flex justify-center items-center w-12 h-10 rounded-xl ' >
                            <Add
                                size={20}
                                color={Colors.dark}
                                variant='Linear'
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleAddToCart} className='flex-1 flex-row py-3.5 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                        <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                        <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Додади во Корпа</Text>
                    </TouchableOpacity>
                </View>



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