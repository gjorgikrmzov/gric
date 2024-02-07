import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft2, Box, Card, Check, DirectboxNotif, ExportSquare, Location, Receipt1, TickSquare } from 'iconsax-react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import BottomSheet from '@gorhom/bottom-sheet/'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const checkout = () => {

    const [cartEmpty, setcartEmpty] = useState<boolean>(true)
    const [deleteButton, setdeleteButton] = useState<boolean>(false)
    const snapPoints = useMemo(() => ['20%', '40%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [cardPayment, setcardPayment] = useState(false)
    const [ondeliveryPayment, setondeliveryPayment] = useState(true)


    const handleSelectCardPayment = () => {
        setcardPayment(true)
        setondeliveryPayment(false)
    }

    const handleSelectOnDeliveryPayment = () => {
        setondeliveryPayment(true)
        setcardPayment(false)
    }

    const deliveryCost = 80

    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const itemPrice = 180;

    const totalItemPrice = itemPrice * itemQuantity + deliveryCost;

    useEffect(() => {
        if (itemQuantity === 1) {
            setdeleteButton(false);
        } else {
            setdeleteButton(true);
        }
    }, [itemQuantity]);


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


    const maxLength = 25;
    const trimmedAdress = savedAddress.length > maxLength ? `${savedAddress.substring(0, maxLength)}...` : savedAddress;

    return (
        <SafeAreaView className='h-screen flex flex-col justify-start bg-[#fafafa]/80'>
            <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/80 rounded-xl' >
                    <ArrowLeft2 variant='Linear' size={22} color={Colors.dark} />
                </TouchableOpacity>
                <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Наплата</Text>

                <Text className='text-4xl text-[#32BB78]' style={{ fontFamily: "heavy" }}>G</Text>
            </View>

            <View className='h-1/2 mb-4'>
                <ScrollView className='flex-1 mb-4'>

                    <View className='w-full mt-3'>
                        <View className=' px-6 '>
                            <Text className=' text-[#0B0B0B]/60' style={{ fontFamily: 'medium' }}>Ваши адреси</Text>
                            <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Адреса на достава</Text>
                        </View>

                        <View className='w-full mt-3'>
                            <TouchableOpacity className='border-b border-[#0b0b0b]/10 px-6 w-full py-7 bg-[#F0F1F3] flex flex-row items-center justify-between' >
                                <View className='flex-row items-center'>
                                    <Location size={22} variant='Bulk' color={Colors.primary} />
                                    {savedAddress ? (
                                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }} className='ml-2 text-[#0e0e0e]'>{trimmedAdress}</Text>
                                    ) : (
                                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }} className='ml-2 text-[#0e0e0e]'>Внесете адреса на достава</Text>
                                    )}
                                </View>

                                <TouchableOpacity onPress={() => router.push('/manageAdresses')} className='p-3' >
                                    <ExportSquare variant='Linear' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View className='w-full px-6 mt-6'>
                        <View>
                            <Text className=' text-[#0B0B0B]/60' style={{ fontFamily: 'medium' }}>Избери</Text>
                            <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Начин на плаќање</Text>
                        </View>
                        <View className='flex flex-row gap-x-2 mt-3'>

                            <TouchableOpacity onPress={handleSelectCardPayment} className={cardPayment ? 'bg-[#F0F1F3] flex flex-col justify-between border-2 border-[#32BB78] flex-1 p-4 rounded-2xl' : 'bg-[#F0F1F3] flex flex-col justify-between flex-1 p-4 rounded-2xl'}>
                                <Card size={24} color={cardPayment ? Colors.primary : Colors.dark} variant={cardPayment ? 'Bold' : 'Linear'} />
                                <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>Со Картичка</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSelectOnDeliveryPayment} className={ondeliveryPayment ? 'bg-[#F0F1F3] flex flex-col justify-between border-2 border-[#32BB78] flex-1 p-4 rounded-2xl' : 'bg-[#F0F1F3] flex flex-col justify-between flex-1 p-4 rounded-2xl'}>
                                <Box size={24} color={ondeliveryPayment ? Colors.primary : Colors.dark} variant={ondeliveryPayment ? 'Bold' : 'Linear'} />
                                <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>При достава</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='px-6 w-full flex flex-col justify-start items-start mt-6'>
                        <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Додатни информации</Text>
                        <TextInput
                            multiline
                            numberOfLines={8}
                            placeholder="Остави порака"
                            placeholderTextColor='#0b0b0b84'
                            className='w-full p-4 rounded-xl mt-3 h-40 bg-[#F0F1F3]'
                            style={{ fontFamily: 'medium' }}
                        />
                    </View>

                </ScrollView>
            </View>

            <BottomSheet ref={bottomSheetRef}
                index={1}
                backgroundStyle={{ backgroundColor: '#F0F1F3' }}
                handleIndicatorStyle={{ backgroundColor: Colors.dark }}
                snapPoints={snapPoints}>

                <View className='w-full h-full py-6 justify-between flex flex-col'>
                    <View className='px-6'>
                        <View className='w-full flex-row items-center  justify-between flex'>
                            <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Износ без достава</Text>
                            <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>180 ден</Text>
                        </View>

                        <View className='w-full flex-row items-center  mt-5 justify-between flex'>
                            <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Достава</Text>
                            <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>80 ден</Text>
                        </View>

                        <View className=' border border-dashed border-[#0b0b0b]/20 mt-5'></View>


                        <View className='w-full flex-row items-center  mt-5 justify-between flex'>
                            <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Вкупно</Text>
                            <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>{totalItemPrice} ден</Text>
                        </View>

                    </View>

                    <View className='px-6 mb-4'>
                        <TouchableOpacity onPress={() => router.push('/(order)/orderPlaced')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                            <Text style={{ fontFamily: "medium" }} className='text-[#fafafa]'>Нарачај</Text>
                            <Receipt1 variant='Bulk' className='ml-2' size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

            </BottomSheet>
        </SafeAreaView>


    )
}

export default checkout