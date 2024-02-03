import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Add, ArrowLeft, Bag, DirectboxNotif, Minus, Shop, Trash } from 'iconsax-react-native'
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
    <View className='flex-1 pt-16 flex flex-col  bg-[#F0F1F3]'>

      <View className='flex px-6 w-full flex-row items-center justify-between'>
        <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
          <ArrowLeft variant='Linear' size={20} color={Colors.white} />
          <Text style={{ fontFamily: 'medium' }} className='text-[#fafafa] ml-1'>Назад</Text>
        </TouchableOpacity>

        <Text className='text-4xl text-[#6BA368]' style={{ fontFamily: "heavy" }}>G</Text>
      </View>




      <View className={cartEmpty ? 'flex-1 mt-4' : 'hidden'}>
        <ScrollView className='flex-1'>


          <View className='py-5 border-b border-[#0b0b0b]/5 px-6'>
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
                          variant='Broken'
                        />) :
                        (<Trash
                          size={20}
                          color={Colors.white}
                          variant='Broken'
                        />)}
                    </TouchableOpacity>

                    <Text className='text-lg text-[#fafafa]'>{itemQuantity}</Text>

                    <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#fafafa]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                      <Add
                        size={20}
                        color={Colors.white}
                        variant='Broken'
                      />
                    </TouchableOpacity>
                  </View>

                  <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: "extrabold" }}>{itemPrice} ден</Text>
                </View>
              </View>
            </View>

          </View>


        </ScrollView>
      </View>


      <View
        className={cartEmpty ? 'rounded-tl-2xl rounded-tr-2xl h-2/5 border border-[#fafafa] bg-[#fafafa] p-4 pt-2' : 'hidden rounded-tl-2xl rounded-tr-2xl h-2/5 border border-[#fafafa] bg-[#fafafa] p-4 pt-2'}
      >
        <View className='w-7 h-1 bg-[#0b0b0b] rounded-md self-center'></View>
        <View className='w-full flex-1 p-4 '>
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

        <View className='px-6'>
          <TouchableOpacity onPress={() => router.push('/(order)/orderPlaced')} className='w-full flex-row py-5 bg-[#6BA368] flex justify-center items-center rounded-2xl'>
            <DirectboxNotif variant='Bulk' size={24} color={Colors.white} />
            <Text style={{ fontFamily: "medium" }} className='text-[#fafafa] ml-2'>Нарачај</Text>
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