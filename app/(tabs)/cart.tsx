import { View, Text, ScrollView, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Add, ArrowLeft, ArrowRight, Bag, Bag2, DirectboxNotif, Minus, Shop, Trash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import BottomSheet from '@gorhom/bottom-sheet'
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  const snapPoints = useMemo(() => ['40%'], []);
  const [cartEmpty, setcartEmpty] = useState<boolean>(true)

  const [deleteButton, setdeleteButton] = useState<boolean>(false)

  const deliveryCost = 80

  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const itemPrice = 180;

  const handleIncreaseQuantity = () => {
    if (itemQuantity < 99) {
      setItemQuantity(itemQuantity + 1);
    }
    Haptics.selectionAsync()
  };

  const handleDecreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
    Haptics.selectionAsync()
  };

  const totalItemPrice = itemPrice * itemQuantity + deliveryCost;

  useEffect(() => {
    if (itemQuantity === 1) {
      setdeleteButton(false);
    } else {
      setdeleteButton(true);
    }
  }, [itemQuantity]);

  return (
    <View className='flex-1 flex flex-col  bg-[#fafafa]'>


      <View style={styles.header} className='full px-6 flex flex-row justify-between items-center'>
        <View className='flex flex-row items-center'>
          <Bag variant='Bulk' size={22} color={Colors.primary} />
          <Text className='text-xl ml-1' style={{ fontFamily: "semibold" }}>Корпа</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(order)/orders')} className='px-4 bg-[#F0F1F3] rounded-2xl py-3'>
          <Text style={{ fontFamily: "semibold" }}>Нарачки</Text>
        </TouchableOpacity>
      </View>


      <View className={cartEmpty ? 'flex-1 mt-4 border-t border-[#0b0b0b]/5' : 'hidden'}>
        <ScrollView className='flex-1 mb-4 '>
          <TouchableOpacity onPress={() => router.push("/foodDetails")} className='py-5 border-b border-[#0b0b0b]/5 px-6'>
            <View className='flex flex-row items-center'>
              <View className=' flex justify-center items-center w-20 h-20 bg-[#0b0b0b]/10 rounded-xl overflow-hidden'>

              </View>
              <View className='flex flex-col ml-2 flex-1'>
                <Text className='text-[16px] text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Бонапарта</Text>
                <Text className=' text-[#0b0b0b]/60 mt-0.5' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>

                <View className='w-full justify-between items-end flex-row'>

                  <View className=' bg-[#0b0b0b] px-1 py-1 flex-row items-center rounded-xl justify-between w-24 mt-2'>
                    <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-7 h-7  rounded-lg '>
                      {deleteButton ?
                        (<Minus
                          size={20}
                          color={Colors.white}
                          variant='Linear'
                        />) :
                        (<Trash
                          size={20}
                          color={Colors.white}
                          variant='Linear'
                        />)}
                    </TouchableOpacity>

                    <Text className='text-lg text-[#fafafa]'>{itemQuantity}</Text>

                    <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                      <Add
                        size={20}
                        color={Colors.white}
                        variant='Linear'
                      />
                    </TouchableOpacity>
                  </View>

                  <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: "extrabold" }}>{itemPrice} ден</Text>
                </View>
              </View>
            </View>

          </TouchableOpacity>

          <TouchableOpacity  onPress={() => router.push("/foodDetails")} className='py-5 border-b border-[#0b0b0b]/5 px-6'>
            <View className='flex flex-row items-center'>
              <View className=' flex justify-center items-center w-20 h-20 bg-[#0b0b0b]/10 rounded-xl overflow-hidden'>

              </View>
              <View className='flex flex-col ml-2 flex-1'>
                <Text className='text-[16px] text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Бонапарта</Text>
                <Text className=' text-[#0b0b0b]/60 mt-0.5' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>

                <View className='w-full justify-between items-end flex-row'>

                  <View className=' bg-[#0b0b0b] px-1 py-1 flex-row items-center rounded-xl justify-between w-24 mt-2'>
                    <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-7 h-7  rounded-lg '>
                      {deleteButton ?
                        (<Minus
                          size={20}
                          color={Colors.white}
                          variant='Linear'
                        />) :
                        (<Trash
                          size={20}
                          color={Colors.white}
                          variant='Linear'
                        />)}
                    </TouchableOpacity>

                    <Text className='text-lg text-[#fafafa]'>{itemQuantity}</Text>

                    <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                      <Add
                        size={20}
                        color={Colors.white}
                        variant='Linear'
                      />
                    </TouchableOpacity>
                  </View>

                  <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: "extrabold" }}>{itemPrice} ден</Text>
                </View>
              </View>
            </View>

          </TouchableOpacity>


        </ScrollView>

        <View className='px-6'>
          <TouchableOpacity onPress={() => router.push('/(order)/checkout')} className='mb-4 w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
            <Text style={{ fontFamily: "medium" }} className='text-[#fafafa]'>Кон наплата</Text>
            <ArrowRight variant='Linear' size={24} className='ml-2' color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>




      <View className={cartEmpty ? 'hidden' : 'flex-1 justify-center items-center'}>
        <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#0b0b0b]/5'>
          <Bag size={56} variant='Bulk' color={Colors.primary} />
        </View>

        <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Вашата корпа {'\n'} е празна</Text>
      </View>

      <View className='px-6'>
        <TouchableOpacity onPress={() => router.push('/restaurants')} className={cartEmpty ? 'hidden' : 'mb-4 w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'}>
          <Shop variant='Bulk' size={24} color={Colors.primary} />
          <Text style={{ fontFamily: "medium" }} className='text-[#fafafa] ml-2'>Пребарај Ресторани</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 38 : 54,
  }
});