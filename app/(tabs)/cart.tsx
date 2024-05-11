import { View, Text, ScrollView, StyleSheet, Platform, TextInput, Keyboard, Alert, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Add, ArrowRight, ArrowRight2, Bag, CloseSquare, DocumentText, Minus, Send, Shop, ShoppingCart, Trash } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import BottomSheet from '@gorhom/bottom-sheet'
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeItem, selectCartTotal, updateItemQuantity } from '../reduxStore/cartSlice'
import { RootState } from '../reduxStore'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {


  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncreaseQuantity = (storeId: string, itemId: string, quantity: number) => {
    dispatch(updateItemQuantity({ storeId, id: itemId, quantity: quantity + 1 }));
    Haptics.selectionAsync();
  };

  const handleDecreaseQuantity = (storeId: string, itemId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity({ storeId, id: itemId, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem({ id: itemId }));
    }
    Haptics.selectionAsync();
  };



  const handleRemoveCart = () => {

    Alert.alert(
      "Избриши Корпа",
      "Дали сакате да ја избришете корпата?",
      [
        { text: "Не", style: "cancel" },
        {
          text: "Да", onPress: () => {
            dispatch(clearCart());
          }
        }
      ]
    );
  }

  const subtotal = useSelector(selectCartTotal);

  const snapPoints = useMemo(() => ['1%', '50%'], []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)

  const closeCommentModal = () => {
    snapeToIndex(0)
    Keyboard.dismiss()
  }

  return (
    <GestureHandlerRootView>

    <View className='flex-1 flex flex-col  bg-[#FFFFFC]'>
      <View style={styles.header} className='full px-6 flex flex-row justify-between items-center'>
        <View className='flex flex-row items-center'>
          <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
          <Text className='text-xl ml-1' style={{ fontFamily: "semibold" }}>Корпа</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(order)/orders')} className='px-4 bg-[#fafafa]/90 rounded-2xl py-3'>
          <Text style={{ fontFamily: "semibold" }}>Нарачки</Text>
        </TouchableOpacity> 
      </View>


      <View className={cartItems.length == 0 ? 'hidden' : 'flex-1 mt-4 border-t border-[#0b0b0b]/5'}>

        <ScrollView className='flex-1'>
          {cartItems.map((cartItem, index) => (

            <View key={index} className='py-5 border-b border-[#0b0b0b]/5 px-6'>
              <View className='flex flex-row items-center'>
                <View className=' flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden'>

                </View>

                <View className='flex flex-row items-center justify-between flex-1'>
                  <View className='flex flex-col ml-3 flex-1'>
                    <Text className='text-[#0b0b0b]' style={{ fontFamily: "semibold" }}>{cartItem.name}</Text>
                    <Text className='mt-1 text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>{cartItem.price} ден</Text>
                  </View>

                  <View className=' bg-[#fafafa]/90 px-1 py-1 flex-row items-center rounded-xl justify-between w-24'>
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(cartItem.storeId, cartItem.id, cartItem.quantity)} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg '>
                      {cartItem.quantity == 1 ?
                        (<Trash
                          size={20}
                          color={Colors.dark}
                          variant='Linear'
                        />)
                        :
                        (<Minus
                          size={20}
                          color={Colors.dark}
                          variant='Linear'
                        />)}
                    </TouchableOpacity>

                    <Text className='text-[#0b0b0b]'>{cartItem.quantity}</Text>

                    <TouchableOpacity onPress={() => handleIncreaseQuantity(cartItem.storeId, cartItem.id, cartItem.quantity)} className='bg-[#FFFFFC]/20 flex justify-center items-center w-7 h-7  rounded-lg ' >
                      <Add
                        size={20}
                        color={Colors.dark}
                        variant='Linear'
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          ))}
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


          <TouchableOpacity onPress={handleRemoveCart} className='w-full flex-row flex items-center justify-between'>
            <View className='py-6 border-b flex flex-row items-center justify-between border-[#0b0b0b]/5  w-full'>
              <View className=' flex flex-row'>
                <Trash color={Colors.dark} size={20} variant='Broken' />
                <Text className='text-[#0b0b0b] ml-3 ' style={{ fontFamily: 'medium' }}>Избриши корпа</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => snapeToIndex(1)} className='w-full flex-row flex items-center justify-between'>
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
            <Text style={{ fontFamily: "semibold" }} className='text-[16px]'>{subtotal} ден</Text>
          </View>

        </View>

        <View className='px-6 mb-4 flex'>
          <TouchableOpacity onPress={() => router.push({ pathname: '/(order)/checkout', params: { subtotal } })} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
            <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC]'>Кон наплата</Text>
            <ArrowRight variant='Linear' size={24} className='ml-2' color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>


      <View className={cartItems.length == 0 ? 'flex-1 justify-center items-center' : 'hidden'}>
        <View className='flex justify-center items-center w-28 h-28 rounded-3xl bg-[#fafafa]/90'>
          <ShoppingCart size={56} variant='Bulk' color={Colors.primary} />
        </View>

        <Text className='text-[#0b0b0b] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Вашата корпа {'\n'} е празна</Text>
      </View>

      <View className='px-6'>
        <TouchableOpacity onPress={() => router.push('/stores')} className={cartItems.length == 0 ? 'mb-4 w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl' : 'hidden'}>
          <Shop variant='Bulk' size={24} color={Colors.primary} />
          <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Пребарај Ресторани</Text>
        </TouchableOpacity>
      </View>



      <BottomSheet index={0} enablePanDownToClose ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: Colors.white }}
        handleIndicatorStyle={{ backgroundColor: Colors.dark }}
        snapPoints={snapPoints}>
        <View className='flex-1 px-6 py-4'>
          <View className='flex justify-between flex-row items-center'>
            <Text className='text-[16px]' style={{ fontFamily: "medium" }}>Остави коментар</Text>

            <View className='flex flex-row items-center'>
              <TouchableOpacity onPress={closeCommentModal} className='px-3 flex-row rounded-xl py-2 flex items-center bg-[#0b0b0b]'>
                <Text className='text-white mr-1' style={{ fontFamily: "medium" }}>Зачувај</Text>
                <Send size={22} color={Colors.white} variant='Bulk' />
              </TouchableOpacity>

              <TouchableOpacity onPress={closeCommentModal} className='ml-1'>
                <CloseSquare size={24} color={Colors.dark} variant='Linear' />
              </TouchableOpacity>
            </View>
          </View>

          <TextInput style={{ fontFamily: "medium" }} placeholder='Кометар..' placeholderTextColor='#757780'
            className='py-5 bg-[#fafafa]/80 mt-6 px-5 rounded-2xl' />
        </View>
      </BottomSheet>

    </View>
          </GestureHandlerRootView>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 38 : 54,
  }
});