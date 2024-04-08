import { View, Text, ScrollView, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Add, ArrowLeft, ArrowRight, ArrowRight2, Bag, Bag2, DirectboxNotif, DocumentText, FingerCricle, Minus, Note, RecordCircle, Shop, Trash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import BottomSheet from '@gorhom/bottom-sheet'
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

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
    <View className='flex-1 flex flex-col  bg-[#FFFFFC]'>


      <View style={styles.header} className='full px-6 flex flex-row justify-between items-center'>
        <View className='flex flex-row items-center'>
          <Bag variant='Bulk' size={22} color={Colors.primary} />
          <Text className='text-xl ml-1' style={{ fontFamily: "semibold" }}>Корпа</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(order)/orders')} className='px-4 bg-[#fafafa]/90 rounded-2xl py-3'>
          <Text style={{ fontFamily: "semibold" }}>Нарачки</Text>
        </TouchableOpacity>
      </View>


      <View className={cartEmpty ? 'flex-1 mt-4 border-t border-[#0b0b0b]/5' : 'hidden'}>
        <ScrollView className='flex-1'>
          <TouchableOpacity onPress={() => router.push("/foodDetails")} className='py-5 border-b border-[#0b0b0b]/5 px-6'>
            <View className='flex flex-row items-center'>
              <View className=' flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden'>

              </View>

              <View className='flex flex-row items-center justify-between flex-1'>
                <View className='flex flex-col ml-3 flex-1'>
                  <Text className='text-[16px] text-[#0b0b0b]' style={{ fontFamily: "semibold" }}>Бонапарта</Text>
                  <Text className='text-md mt-1 text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>{itemPrice} ден</Text>
                </View>

                <View className=' bg-[#fafafa]/90 px-1 py-1 flex-row items-center rounded-xl justify-between w-24'>
                  <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg '>
                    {deleteButton ?
                      (<Minus
                        size={20}
                        color={Colors.dark}
                        variant='Linear'
                      />) :
                      (<Trash
                        size={20}
                        color={Colors.dark}
                        variant='Linear'
                      />)}
                  </TouchableOpacity>

                  <Text className='text-[#0b0b0b]'>{itemQuantity}</Text>

                  <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                    <Add
                      size={20}
                      color={Colors.dark}
                      variant='Linear'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => router.push("/foodDetails")} className='py-5  px-6'>
            <View className='flex flex-row items-center'>
              <View className=' flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden'>

              </View>

              <View className='flex flex-row items-center justify-between flex-1'>
                <View className='flex flex-col ml-3 flex-1'>
                  <Text className='text-[16px] text-[#0b0b0b]' style={{ fontFamily: "semibold" }}>Бонапарта</Text>
                  <Text className='text-md mt-1 text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>{itemPrice} ден</Text>
                </View>

                <View className=' bg-[#fafafa]/90 px-1 py-1 flex-row items-center rounded-xl justify-between w-24'>
                  <TouchableOpacity onPress={handleDecreaseQuantity} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg '>
                    {deleteButton ?
                      (<Minus
                        size={20}
                        color={Colors.dark}
                        variant='Linear'
                      />) :
                      (<Trash
                        size={20}
                        color={Colors.dark}
                        variant='Linear'
                      />)}
                  </TouchableOpacity>

                  <Text className='text-[#0b0b0b]'>{itemQuantity}</Text>

                  <TouchableOpacity onPress={handleIncreaseQuantity} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                    <Add
                      size={20}
                      color={Colors.dark}
                      variant='Linear'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableOpacity>
        </ScrollView>


        <View className='w-full h-1 bg-[#757780]/10'></View>
        <View className='px-6'>
          {/* <View className='w-full flex-row flex items-center justify-between'>
            <View className='py-6  border-b flex flex-row items-center  justify-between border-[#0b0b0b]/5  w-full'>
              <View className=' flex flex-row'>
                <RecordCircle color={Colors.dark} size={20} variant='Broken' />
                <Text className='text-[#0b0b0b] ml-3 ' style={{ fontFamily: 'medium' }}>Побарај прибор</Text>
              </View>
              <BouncyCheckbox
              size={20}
                disableText
                fillColor={Colors.dark}
                unfillColor={Colors.white}
                iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                onPress={(isChecked: boolean) => { }}
              />
            </View>
          </View> */}

          <TouchableOpacity className='w-full flex-row flex items-center justify-between'>
            <View className='py-6 border-b flex flex-row items-center justify-between border-[#0b0b0b]/5  w-full'>
              <View className=' flex flex-row'>
                <DocumentText color={Colors.dark} size={20} variant='Broken' />
                <Text className='text-[#0b0b0b] ml-3 ' style={{ fontFamily: 'medium' }}>Остави коментар</Text>
              </View>
              <ArrowRight2 color={Colors.dark} size={20} />
            </View>
          </TouchableOpacity>

          <View className='flex flex-row my-6 justify-between items-center'>
            <Text style={{ fontFamily: "semibold" }} className='text-[16px]'>Без достава</Text>
            <Text style={{ fontFamily: "semibold" }} className='text-[16px]'>{itemPrice} ден</Text>
          </View>

        </View>

        <View className='px-6 mb-4 flex'>
          <TouchableOpacity onPress={() => router.push('/(order)/checkout')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
            <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC]'>Кон наплата</Text>
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
          <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Пребарај Ресторани</Text>
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