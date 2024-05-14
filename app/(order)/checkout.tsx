import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { ArrowLeft, Box, Card, ExportSquare, Location, LocationAdd, Receipt1 } from 'iconsax-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import BottomSheet from '@gorhom/bottom-sheet/'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../reduxStore'

const Page = () => {

    const { subtotal } = useLocalSearchParams()
    const { addresses } = useSelector((state: RootState) => state.addresses)
    const selectedAddressId = useSelector((state: RootState) => state.addresses.selectedAddressId)

    const selectedAddres = addresses.find(address => address.id === selectedAddressId)

    const deliveryCost = 100
    const subtotalNumber = Number(subtotal) || 0;
    const total: number = subtotalNumber + deliveryCost;

    const snapPoints = useMemo(() => ['40%'], []);
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



    return (

        <GestureHandlerRootView>
            <SafeAreaView className='h-full flex flex-col justify-start bg-[#FFFFFC]'>
                <View className='px-6 py-4 flex flex-row gap-x-3 items-center justify-between'>
                    <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                        <ArrowLeft variant='Broken' size={20} color={Colors.dark} />
                    </TouchableOpacity>
                    <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Наплата</Text>

                    <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
                </View>

                <View className='flex-1 mb-4'>
                    <ScrollView className='flex-1 mb-4'>

                        <View className='w-full mt-3'>
                            <View className=' px-6 '>
                                <Text className=' text-[#0B0B0B]/60' style={{ fontFamily: 'medium' }}>Ваши адреси</Text>
                                <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Адреса на достава</Text>
                            </View>

                            <View className='w-full mt-3'>
                                {selectedAddres ? (
                                    <TouchableOpacity className='border-b border-[#0b0b0b]/5 px-6 w-full py-4  flex flex-row items-center justify-between' >
                                        <View className='flex-col items-start'>
                                            <View className='flex flex-row items-center'>
                                                <Location size={22} variant='Bold' color={Colors.dark} />
                                                <View className='ml-1'>
                                                    <Text className='text-xs text-[#0b0b0b]/80 uppercase' style={{ fontFamily: "semibold" }}>{selectedAddres.name}</Text>
                                                    <Text className='' style={{ color: 'black', fontSize: 16, fontFamily: 'medium' }}>{selectedAddres.street} {selectedAddres.streetNumber}</Text>
                                                </View>
                                            </View>

                                            <View className='flex flex-row mt-2 items-center space-x-1'>
                                                {selectedAddres.flat &&
                                                    <View className='p-1 px-2 border border-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                                                        <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Кат - {selectedAddres.flat}</Text>
                                                    </View>
                                                }

                                                {selectedAddres.apartment &&
                                                    <View className='p-1 px-2 border border-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                                                        <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Стан - {selectedAddres.apartment}</Text>
                                                    </View>
                                                }
                                            </View>

                                        </View>

                                        <TouchableOpacity onPress={() => router.push('/(modals)/manageAddresses')} className='p-3' >
                                            <ExportSquare variant='Linear' size={20} color={Colors.dark} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                ) : (
                                    <View>
                                        <TouchableOpacity onPress={() => router.push('/manageAddresses')} className='border-b border-[#0b0b0b]/5 px-6 w-full py-6  flex flex-row items-center justify-start' >
                                            <LocationAdd variant='Bold' className='' size={22} color={Colors.dark} />
                                            <Text style={{ fontFamily: "medium" }} className='ml-2 text-[16px] text-[#0b0b0b]'>Додај адреса</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                        </View>



                        <View className='w-full px-6 mt-6'>
                            <View>
                                <Text className=' text-[#0B0B0B]/60' style={{ fontFamily: 'medium' }}>Избери</Text>
                                <Text className='text-lg text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Начин на плаќање</Text>
                                {/* <View className='flex mt-2 flex-row items-center'>
                                    <Money size={22} variant='Bold' color={Colors.dark} />
                                    <Text className='ml-2 text-[16px] text-[#0B0B0B]' style={{ fontFamily: 'medium' }}>Плаќањето се врши при достава!</Text>
                                </View> */}

                            </View>
                            <View className='flex flex-row gap-x-2 mt-3'>

                                <TouchableOpacity onPress={handleSelectCardPayment} className={cardPayment ? ' flex flex-col justify-between border-2 border-[#0b0b0b] flex-1 p-3.5 rounded-2xl' : ' border-2 border-[#0b0b0b]/5 flex flex-col justify-between flex-1 p-3.5 rounded-2xl'}>
                                    <View className='flex-1 justify-between items-center flex-row'>
                                        <Card size={24} color={Colors.dark} variant={cardPayment ? 'Bold' : 'Linear'} />
                                    </View>
                                    <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>Со Картичка</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleSelectOnDeliveryPayment} className={ondeliveryPayment ? ' flex flex-col justify-between border-2 border-[#0b0b0b] flex-1 p-3.5 rounded-2xl' : 'border-2 border-[#0b0b0b]/5 flex flex-col justify-between flex-1 p-3.5 rounded-2xl'}>
                                    <View className='flex-1 justify-between items-center flex-row'>
                                        <Box size={24} color={Colors.dark} variant={ondeliveryPayment ? 'Bold' : 'Linear'} />
                                    </View>
                                    <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>При достава</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <BottomSheet
                    index={0}
                    backgroundStyle={{ backgroundColor: '#FFFFFC' }}
                    handleIndicatorStyle={{ backgroundColor: Colors.dark }}
                    snapPoints={snapPoints}>

                    <View className='w-full h-full py-6  justify-between flex flex-col'>
                        <View className='px-6'>
                            <View className='w-full flex-row items-center  justify-between flex'>
                                <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Износ без достава</Text>
                                <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>{subtotal} ден</Text>
                            </View>

                            <View className='w-full flex-row items-center  mt-5 justify-between flex'>
                                <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Достава</Text>
                                <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>{deliveryCost} ден</Text>
                            </View>

                            <View className=' border-b-0 border border-dashed border-[#0b0b0b]/10  mt-5'></View>


                            <View className='w-full flex-row items-center  mt-5 justify-between flex'>
                                <Text className='text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>Вкупно</Text>
                                <Text className=' text-[#0b0b0b]' style={{ fontFamily: "bold" }}>{total} ден</Text>
                            </View>

                        </View>

                        <View className='px-6 mb-4'>
                            <TouchableOpacity onPress={() => router.push('/(order)/orderPlaced')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC]'>Нарачај</Text>
                                <Receipt1 variant='Bulk' className='ml-2' size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Page