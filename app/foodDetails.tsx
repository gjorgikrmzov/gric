import { View, Text, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Add, ArrowDown2, Bag, DirectInbox, DirectboxSend, Minus, Send, Share, } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'



const Page = () => {

    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const itemPrice = 180;

    const handleIncreaseQuantity = () => {
        if (itemQuantity < 99) {
            setItemQuantity(itemQuantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
        }
    };

    const totalItemPrice = itemPrice * itemQuantity;

    const handleRouteBack = () => {
        const stringItemQuantity = itemQuantity.toString();
        router.push({ pathname: `/restaurantDetails`, params: { quantity: stringItemQuantity } });
    };
    return (

        <View style={styles.header} className='h-full bg-[#0b0b0b]'>

            <View className='bg-[#0b0b0b] px-6 h-44 '>
                <View className='flex flex-row justify-between items-center w-full'>

                    <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#fafafa]/10 rounded-xl' >
                        <ArrowDown2 variant='Linear' size={22} color={Colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity className='w-10 h-10 flex justify-center items-center bg-[#fafafa]/10 rounded-xl' >
                        <DirectboxSend variant='Linear' size={22} color={Colors.white} />
                    </TouchableOpacity>
                </View>


            </View>


            <View className='flex-1 bg-[#fafafa]'>

                <View className='mt-6 px-6'>
                    <Text className='text-2xl text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Бонапарта</Text>
                    <Text className='text-[#6BA368] text-2xl' style={{ fontFamily: "extrabold" }}>180 ден</Text>
                    <Text className='text-[#0b0b0b]/80 mt-3 leading-5' style={{ fontFamily: "medium" }}>Француско лебче · Кашкавал · Печеница · Домати · Павлака</Text>
                </View>

                <View className='w-full h-1 bg-[#0b0b0b]/10 mt-6'></View>

                <Text className='text-[#0b0b0b]  px-6 mt-6' style={{ fontFamily: "semibold" }}>Избери количина</Text>
                <View className=' bg-[#0b0b0b] p-1.5 flex-row items-center rounded-xl justify-between w-28 mt-3 mx-6'>
                    <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-8 h-8  rounded-lg '>
                        <Minus
                            size={26}
                            color={Colors.white}
                            variant='Broken'
                        />
                    </TouchableOpacity>

                    <Text className='text-xl text-[#fafafa]'>{itemQuantity}</Text>

                    <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-8 h-8  rounded-lg ' >
                        <Add
                            size={26}
                            color={Colors.white}
                            variant='Broken'
                        />
                    </TouchableOpacity>
                </View>


                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', '#fafafa']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                    <TouchableOpacity onPress={handleRouteBack} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                        <Bag variant='Bulk' size={24} color={Colors.primary} />
                        <Text style={{ fontFamily: "medium" }} className='text-[#fafafa] text-[16px] ml-2'>Додади {itemQuantity} во Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {totalItemPrice} ден</Text>
                    </TouchableOpacity>
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