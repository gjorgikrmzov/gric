import { View, Text, SafeAreaView, TextInput, TouchableOpacityBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowSquareRight, CloseSquare, SearchNormal1, Shop } from 'iconsax-react-native'
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
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



  return (
    <SafeAreaView className='bg-[#131313]'>
      <View className='px-6 py-4 h-full bg-[#131313]'>
        <StatusBar style='light' />
        <Animated.View entering={FadeInDown.delay(200).duration(10).springify()} className='flex w-full flex-row items-center justify-between'>
          <TouchableOpacity activeOpacity={0.7}  className='bg-[#f7f7f7] px-3 py-2.5 flex rounded-xl flex-row items-center ' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className='text-black ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400).duration(0).springify().stiffness(20).damping(1)} className='flex mt-10 relative items-center flex-row'>
          <TextInput style={{ fontFamily: 'medium' }} value={search} onChangeText={onChangeInput} placeholder='Пребарај Ресторани' className=' py-5 text-white w-full px-4 pr-14 border border-white/10 rounded-2xl focus:border-white/60 transition-all' placeholderTextColor='#cbcbcb' />
          <CloseSquare onPress={() => setsearch('')} size={30} color={Colors.white} variant='Broken' className={close ? 'right-4 absolute' : 'hidden'} />
        </Animated.View >

        {searchResult ? (<Animated.View entering={FadeIn.delay(500).duration(10).springify()} className='flex-1 mt-4'>
          <ScrollView className='flex flex-col border border-white/30 rounded-2xl'>
            <TouchableOpacity className='w-full border-b border-white/30 flex-row py-4 px-4 flex items-center justify-between'>
              <View className='flex items-center flex-row'>
                <Shop color={Colors.primary} size={30} variant='Broken' />
                <View className='ml-3'>
                  <Text className='text-white' style={{ fontFamily: 'medium' }}>Ресторан Елизабет</Text>
                  <Text className='text-white/60' style={{ fontFamily: 'heavy' }}>ПИЦЕРИЈА</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>) :

          (
            <Animated.View entering={FadeIn.delay(400).duration(10).springify()} className='absolute left-0 top-0 h-full z-[-1] w-screen justify-center items-center'>
              <View>
                <View className='justify-center items-center'>
                  <View className='flex justify-center items-center w-28 h-28 rounded-2xl bg-white/5'>
                    <SearchNormal1 size={56} variant='Broken' color={Colors.primary} />
                  </View>

                  <Text className='text-[#f7f7f7] text-xl mt-4 text-center' style={{ fontFamily: 'medium' }}>Пребарај Ресторани</Text>
                </View>
              </View>
            </Animated.View>
          )}


      </View>
    </SafeAreaView>
  )
}

export default Page