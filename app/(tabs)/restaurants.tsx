import { View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, Keyboard, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft, ArrowLeft2, ArrowRight, Bookmark, Clock, CloseSquare, DiscountShape, Filter, Heart, Location, SearchNormal1, Setting4, Shop } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { RefreshControl } from 'react-native-gesture-handler'

const Page = () => {

  const restaurants = [
    { restaurantTitle: 'Бу Хаус', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо',  },
    { restaurantTitle: 'Бонита', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо',  },
    // { restaurantTitle: 'Хепинес', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', restaurantImage: require('../../assets/images/bongjorno.png') },
    { restaurantTitle: 'Елизабет', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо',  },
    { restaurantTitle: 'Бонџорно', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо',  },
  ];

  const [search, setsearch] = useState('')
  const [close, setclose] = useState(false)
  const [searchResult, setSearchResult] = useState(false)

  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setsearch(value);
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss()
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Perform any additional refreshing logic if needed.

    // Simulate a delay (you can replace this with your actual refreshing logic)
    setTimeout(() => {
      setRefreshing(false);
    }, 600); // Adjust the delay as needed
  };

  const [likeStatus, setLikeStatus] = useState<boolean[]>(Array(restaurants.length).fill(true));

  const handleLikeRestaurant = (index: number) => {
    const updatedLikeStatus = [...likeStatus];
    updatedLikeStatus[index] = !updatedLikeStatus[index];
    setLikeStatus(updatedLikeStatus);
  };



  return (
    <SafeAreaView className='bg-[#fafafa] h-full'>
      <View className='pt-4 flex-1 bg-[#fafafa]'>

        

        <View className={isFocused ? 'px-6 hidden flex-row gap-x-3 items-center justify-between' : 'px-6 flex flex-row gap-x-3 items-center justify-between '}>
          <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.white} />
            <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#6BA368]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
          onRefresh={onRefresh} className='z-10' />}>
          <View className={isFocused ? 'px-6  flex flex-row items-center top-0  pb-9 ' : ' px-6 flex flex-row items-center mt-8'}>
            <View className=' bg-[#F0F1F3] flex-1 items-center flex-row px-5 rounded-2xl'>
              {
                isFocused ?
                  (
                    <TouchableOpacity onPress={handleBlur} className=' flex justify-center items-center'>
                      <ArrowLeft size={22} color={Colors.dark} variant='Broken' />
                    </TouchableOpacity>

                  ) :

                  (
                    <SearchNormal1 size={22} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
              }

              <TextInput  onChange={onChangeInput} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} className='text-[#0b0b0b] px-3 flex-1 ' style={styles.input} placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />
              <TouchableOpacity onPress={() => { setsearch(''); inputRef.current?.clear(); }} className={close ? 'flex justify-center items-center opacity-100' : ' opacity-0'}>
                <CloseSquare size={24} color={Colors.dark} variant='Bold' />
              </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => router.push('/(modals)/filter')} className='p-4 ml-2 flex justify-center items-center rounded-2xl bg-[#0b0b0b]'>
              <Setting4 color={Colors.primary} size={24} variant='Broken' />
            </TouchableOpacity>
          </View>

          <View className={isFocused ? 'hidden' : 'flex flex-1 mt-6'}>

            <View className='w-full px-6 justify-between items-end flex flex-row'>
              <View className='flex flex-col ml-1'>
                <View className='flex items-center flex-row gap-x-2'>
                  <Shop size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Ресторани</Text>
                </View>
                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Ресторани</Text>
              </View>

            </View>



            {/* RESTORANI SECTION */}
            <View className='w-full mt-3 '>

              <ScrollView
                horizontal
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                className='flex-row flex-1'
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={290 + 12}
              >
                <View className='flex px-6 flex-row items-center gap-x-3'>
                  {restaurants.map((restaurant, index) => (
                    <View key={index} className='flex overflow-hidden  flex-row items-center relative'>

                      {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                      <TouchableOpacity
                      onPress={() => router.push('/restaurantDetails')}
                        className='w-[290px] border border-[#0b0b0b]/40 p-5 bg-[#0b0b0b]  rounded-3xl'
                        style={{ overflow: 'hidden' }} // Add this style to hide the overflow
                      >
                        <View className='flex flex-row items-center justify-between w-full'>
                          <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantType}</Text>
                          <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                          </TouchableOpacity>

                        </View>
                        <Text className='text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantTitle}</Text>

                        <View className='flex flex-col gap-y-2 mt-6'>
                          {/* <View className='flex flex-row mt-1 items-center'>
                                                            <Location variant='Bulk' color={Colors.primary} size={16} />
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>3км</Text>
                                                        </View> */}
                          <View className='flex flex-row items-center'>
                            <Clock variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                          </View>
                          <View className='flex flex-row items-center'>
                            <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${restaurant.restaurantCategories.split(' ').join(' · ')}`}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>


            <View className='w-full px-6 mt-6 justify-between items-end flex flex-row'>
              <View className='flex flex-col ml-1'>
                <View className='flex items-center flex-row gap-x-2'>
                  <Shop size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Во Близина</Text>
                </View>
                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Ресторани</Text>
              </View>

            </View>

            <View className='w-full mt-3 '>

              <ScrollView
                horizontal
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                className='flex-row flex-1'
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={290 + 12}
              >
                <View className='flex px-6 flex-row items-center gap-x-3'>
                  {restaurants.map((restaurant, index) => (
                    <View key={index} className='flex overflow-hidden  flex-row items-center relative'>

                      {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                      <TouchableOpacity
                        onPress={() => router.push('/restaurantDetails')}
                        className='w-[290px] border border-[#0b0b0b]/40 p-5 bg-[#0b0b0b]  rounded-3xl'
                        style={{ overflow: 'hidden' }} // Add this style to hide the overflow
                      >
                        <View className='flex flex-row items-center justify-between w-full'>
                          <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantType}</Text>
                          <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                          </TouchableOpacity>

                        </View>
                        <Text className='text-dark text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{restaurant.restaurantTitle}</Text>

                        <View className='flex flex-col gap-y-2 mt-6'>
                          {/* <View className='flex flex-row mt-1 items-center'>
                                                            <Location variant='Bulk' color={Colors.primary} size={16} />
                                                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>3км</Text>
                                                        </View> */}
                          <View className='flex flex-row items-center'>
                            <Clock variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                          </View>
                          <View className='flex flex-row items-center'>
                            <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${restaurant.restaurantCategories.split(' ').join(' · ')}`}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* PROMOCII */}

            {/*<View className='px-6 w-full mt-6 justify-between items-end flex flex-row'>
              <View className='flex flex-col'>
                <View className='flex items-center flex-row gap-x-2'>
                  <DiscountShape size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-lg text-[#e0e0e0] ' style={{ fontFamily: 'semibold' }}>Промоции</Text>
                </View>
                <Text className='text-xs text-[#e0e0e0]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Неделни промоции</Text>
              </View>

            </View>

             <View className='w-full mt-3 '>

              <ScrollView horizontal contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} className=' flex-row flex-1' snapToInterval={324} decelerationRate={'fast'}
                snapToAlignment='end'
                showsHorizontalScrollIndicator={false} >
                <View className='flex flex-row items-center gap-x-3 px-6'>
                  <TouchableOpacity className='w-[290px] p-5 bg-[#e0e0e0]/5 border border-[#ff4b19]/30  rounded-3xl  overflow-hidden'>
                    <Text className='text-[#ff4b19] text-xs' style={{ fontFamily: "extrabold" }}>ПРОМОЦИЈА</Text>
                    <Text className='text-white text-2xl mt-1' style={{ fontFamily: "extrabold" }}>Хаштаг</Text>
                    <View className='flex flex-col mt-4'>
                      <Text className='text-[#e0e0e0]/60 line-through text-lg ' style={{ fontFamily: 'extrabold' }}>200 ден</Text>
                      <Text className='text-[#ff4b19] text-lg  mt-[-6px]' style={{ fontFamily: 'extrabold' }}>160 ден</Text>
                    </View>
                    <Image source={require('../assets/images/burger.svg')} className='absolute right-[-10%] bottom-[-40%] w-28 z-0 -rotate-12  h-28 mb-6' />
                  </TouchableOpacity>

                  <TouchableOpacity className='w-[290px] p-5 bg-[#e0e0e0]/5 border border-[#ff4b19]/30  rounded-3xl  overflow-hidden'>
                    <Text className='text-[#ff4b19] text-xs' style={{ fontFamily: "extrabold" }}>ПРОМОЦИЈА</Text>
                    <Text className='text-white text-2xl mt-1' style={{ fontFamily: "extrabold" }}>Бонџорно</Text>
                    <View className='flex flex-col mt-4'>
                      <Text className='text-[#e0e0e0]/60 line-through text-lg ' style={{ fontFamily: 'extrabold' }}>240 ден</Text>
                      <Text className='text-[#ff4b19] text-lg  mt-[-6px]' style={{ fontFamily: 'extrabold' }}>200 ден</Text>
                    </View>
                    <Image source={require('../assets/images/pizza.svg')} className='absolute right-[-10%] bottom-[-40%] w-28 z-0 -rotate-12  h-28 mb-6' />
                  </TouchableOpacity>
                </View>


              </ScrollView>

              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={['#fafafa', 'transparent']}
                className='w-8 h-full absolute right-0 bottom-0'
              />
            </View>
 */}

          </View>

          <View className={isFocused ? 'flex flex-1' : 'hidden'}>
            <TouchableOpacity>
              <Text>test</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  input: {
      paddingVertical: (Platform.OS === 'android') ? 14 : 20,
      fontFamily: 'medium',
  }
});