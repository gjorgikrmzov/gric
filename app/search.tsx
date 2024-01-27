import { View, Text, SafeAreaView, TextInput, TouchableOpacityBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, CloseSquare, SearchNormal1, Shop } from 'iconsax-react-native'
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const Page = () => {

  const [searchResult, setSearchResult] = useState(false)
  const [search, setsearch] = useState('')
  const [close, setclose] = useState(false)

  const onChangeInput = (value: string) => {
    setsearch(value)
  };

  useEffect(() => {
    setSearchResult(search.trim() !== '');
  }, [search]);


  useEffect(() => {
    if (search === '') {
      setclose(false)
    } else {
      setclose(true)
    }
  })


  useEffect(() => {
    const delay = 600;

    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, delay);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
  }, []);


  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SafeAreaView className='bg-[#0b0b0b]'>
      <View className='px-6 py-4 h-full bg-[#0b0b0b]'>
        <StatusBar style='light' />

        <View className='flex w-full flex-row items-center justify-between'>
          <TouchableOpacity className='bg-[#e0e0e0] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className='text-black ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>


          <View className='flex relative px-4 mt-8 justify-between items-center flex-row text-[#e0e0e0] text-[16px] bg-[#e0e0e0]/5 rounded-2xl focus:border-white/60'>
            <View className='flex flex-row w-[85%] items-center gap-x-3'>
              {
                isFocused ?
                  (
                    <TouchableOpacity onPress={() => router.back()} className=' flex justify-center items-center'>
                      <ArrowLeft size={22} color={Colors.white} variant='Broken' />
                    </TouchableOpacity>

                  ) :

                  (
                    <SearchNormal1 size={22} color={Colors.white} className='flex justify-center items-center' variant='Broken' />)
              }
              <TextInput onFocus={handleFocus}
                onBlur={handleBlur} ref={inputRef} style={{ fontFamily: 'medium' }} value={search} onChangeText={onChangeInput} placeholder='Пребарај' className='text-[#e0e0e0] text-[16px] w-full py-5 ' placeholderTextColor={Colors.white} />
            </View>

            <TouchableOpacity onPress={() => setsearch('')} className={close ? 'flex justify-center  items-center opacity-100' : ' opacity-0'}>
              <CloseSquare size={24} color={Colors.white} variant='Bulk' />
            </TouchableOpacity>
          </View>

        <View className='top-10'>
          <Text className='text-white/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
          <ScrollView className='flex flex-col mt-3' >
            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-white/10  w-full'>
                  <Text className='text-[#e0e0e0] text-[16px] ' style={{ fontFamily: 'medium' }}>Бу Хаус</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-white/10  w-full'>
                  <Text className='text-[#e0e0e0] text-[16px] ' style={{ fontFamily: 'medium' }}>Елизабет</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-white/10  w-full'>
                  <Text className='text-[#e0e0e0] text-[16px] ' style={{ fontFamily: 'medium' }}>Бонита</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-white/10  w-full'>
                  <Text className='text-[#e0e0e0] text-[16px] ' style={{ fontFamily: 'medium' }}>Хаштаг</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* <View className='absolute left-0 top-0 h-full z-[-1] w-screen justify-center items-center'>
              <View>
                <View className='justify-center items-center'>
                  <View className='flex justify-center items-center w-28 h-28 rounded-2xl bg-white/5'>
                    <SearchNormal1 size={56} variant='Broken' color={Colors.primary} />
                  </View>

                  <Text className='text-[#f7f7f7] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Пребарај Ресторани {'\n'} или Храна</Text>
                </View>
              </View>
            </View>
     */}


      </View>
    </SafeAreaView >
  )
}

export default Page