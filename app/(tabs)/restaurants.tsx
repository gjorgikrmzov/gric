import { View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, Keyboard, Animated, Platform, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
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
    { restaurantTitle: 'Бу Хаус', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
    { restaurantTitle: 'Бонита', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
    // { restaurantTitle: 'Хепинес', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', restaurantImage: require('../../assets/images/bongjorno.png') },
    { restaurantTitle: 'Елизабет', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
    { restaurantTitle: 'Бонџорно', restaurantType: 'ПИЦА РЕСТОРАН', restaurantCategories: 'Пица Пастрмајлија Месо', },
  ];

  const tobbacoShops = [
    { shopTitle: 'Ламар', tobbacoType: 'ТОБАКО', tobbacoCategory: 'Алкохол Пијалоци Цигари', },
    { shopTitle: 'Тобако2', tobbacoType: 'ТОБАКО', tobbacoCategory: 'Алкохол Пијалоци Цигари', },
    // { shopTitle: 'Хепинес', tobbacoCategory: 'Алкохол Пијалоци Цигари', restaurantImage: require('../../assets/images/bongjorno.png') },
    { shopTitle: 'Боби Тобако', tobbacoType: 'ТОБАКО', tobbacoCategory: 'Алкохол Пијалоци Цигари', },
    { shopTitle: 'Едлвајс', tobbacoType: 'ТОБАКО', tobbacoCategory: 'Алкохол Пијалоци Цигари', },
  ];

  const [search, setSearch] = useState<string>('');
  const [close, setClose] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  // Assuming handleFocus and handleBlur functions are defined elsewhere in your component

  const onChangeInput = (text: string) => {
    setSearch(text);
    setClose(text !== '');
  };

  const [isFocused, setIsFocused] = useState(false);
  const searchBarY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;

  // Focus and blur handlers
  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.spring(searchBarY, {
        toValue: -80, // Adjust this value as needed for your design
        speed: 12, // Control speed of the animation
        bounciness: 8, // Control the bounciness of the spring animation
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 200, // Making the fade out faster
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.spring(searchBarY, {
        toValue: 0, // Return to original position
        speed: 12, // Consistent speed for the reverse animation
        bounciness: 8, // Consistent bounciness for the reverse animation
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 200, // Making the fade in faster
        useNativeDriver: true,
      }),
    ]).start();
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
    <SafeAreaView className='bg-[#fafafa] flex-1'>
      <View className='pt-4 flex-1 bg-[#fafafa]'>



        <Animated.View style={{ opacity: headerOpacity }} className='z-0 px-6 flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity className='bg-[#0b0b0b] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
            <ArrowLeft variant='Linear' size={20} color={Colors.white} />
            <Text style={{ fontFamily: 'medium' }} className='text-[#FAFAFA] ml-1'>Назад</Text>
          </TouchableOpacity>

          <Text className='text-4xl text-[#32BB78]' style={{ fontFamily: "heavy" }}>G</Text>
        </Animated.View>


        <Animated.View style={{ transform: [{ translateY: searchBarY }] }} className='px-6 flex flex-row items-center mt-6 mb-4 '>
          <View className=' bg-[#F0F1F3]/80 flex-1 items-center flex-row px-5 rounded-2xl'>
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

            <TextInput onChangeText={onChangeInput} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} className='text-[#0b0b0b] px-3 flex-1 ' style={styles.input} placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />
            <TouchableOpacity onPress={() => { setSearch(''); inputRef.current?.clear(); }} className={close ? 'flex justify-center items-center opacity-100' : ' opacity-0'}>
              <CloseSquare size={24} color={Colors.dark} variant='Bold' />
            </TouchableOpacity>

          </View>

          <TouchableOpacity onPress={() => router.push('/(modals)/filter')} className='p-4 ml-2 flex justify-center items-center rounded-2xl bg-[#0b0b0b]'>
            <Setting4 color={Colors.primary} size={24} variant='Broken' />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView keyboardShouldPersistTaps="always" // This is the key change
          showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
            onRefresh={onRefresh} className='z-10' />}>
          <View className={isFocused ? 'hidden' : 'flex flex-1 mt-6'}>

            <View className='w-full px-6  justify-between items-end flex flex-row'>
              <View className='flex flex-col ml-1'>
                <View className='flex items-center flex-row gap-x-2'>
                  <Shop size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Ресторани</Text>
                </View>
                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Сите Ресторани</Text>
              </View>

            </View>


            {/* RESTORANI SECTION */}
            <View className='w-full mt-3  '>

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


            <View className='w-full  px-6 mt-6 justify-between items-end flex flex-row'>
              <View className='flex flex-col ml-1'>
                <View className='flex items-center flex-row gap-x-2'>
                  <Shop size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Тобако</Text>
                </View>
                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Сите Тобака</Text>
              </View>

            </View>

            <View className='w-full mt-3 '>

              <ScrollView
                horizontal
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                className='flex-row flex-1 '
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={290 + 12}
              >
                <View className='flex px-6 flex-row items-center gap-x-3'>
                  {tobbacoShops.map((tobbaco, index) => (
                    <View key={index} className='flex overflow-hidden  flex-row items-center relative'>

                      {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                      <TouchableOpacity
                        onPress={() => router.push('/restaurantDetails')}
                        className='w-[290px] border border-[#0b0b0b]/40 p-5 bg-[#0b0b0b]  rounded-3xl'
                        style={{ overflow: 'hidden' }} // Add this style to hide the overflow
                      >
                        <View className='flex flex-row items-center justify-between w-full'>
                          <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{tobbaco.tobbacoType}</Text>
                          <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                          </TouchableOpacity>

                        </View>
                        <Text className='text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{tobbaco.shopTitle}</Text>

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
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${tobbaco.tobbacoCategory.split(' ').join(' · ')}`}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>


            <View className='w-full  px-6 mt-6 justify-between items-end flex flex-row'>
              <View className='flex flex-col ml-1'>
                <View className='flex items-center flex-row gap-x-2'>
                  <Shop size={19} color={Colors.primary} variant='Bulk' />
                  <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Отворено 24/7</Text>
                </View>
                <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Ресторани - Тобако</Text>
              </View>

            </View>

            <View className='w-full mt-3 '>

              <ScrollView
                horizontal
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                className='flex-row flex-1 '
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={290 + 12}
              >
                <View className='flex px-6 flex-row items-center gap-x-3'>
                  {tobbacoShops.map((tobbaco, index) => (
                    <View key={index} className='flex overflow-hidden  flex-row items-center relative'>

                      {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                      <TouchableOpacity
                        onPress={() => router.push('/restaurantDetails')}
                        className='w-[290px] border border-[#0b0b0b]/40 p-5 bg-[#0b0b0b]  rounded-3xl'
                        style={{ overflow: 'hidden' }} // Add this style to hide the overflow
                      >
                        <View className='flex flex-row items-center justify-between w-full'>
                          <Text className='text-[#FAFAFA]/60 text-xs' style={{ fontFamily: "extrabold" }}>{tobbaco.tobbacoType}</Text>
                          <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.white} size={20} />
                          </TouchableOpacity>

                        </View>
                        <Text className='text-3xl text-[#FAFAFA]' style={{ fontFamily: "extrabold" }}>{tobbaco.shopTitle}</Text>

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
                            <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{`${tobbaco.tobbacoCategory.split(' ').join(' · ')}`}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

          </View>


        </ScrollView>


        <View className={isFocused ? 'flex h-full bottom-16 px-6' : 'hidden'}>
          <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
          <ScrollView keyboardShouldPersistTaps="always" // This is the key change
            showsVerticalScrollIndicator={false} className='flex flex-col mt-3' >
            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                  <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Бу Хаус</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                  <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Елизабет</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                  <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Бонита</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='w-full flex-row  flex items-center justify-between'>
              <View className='flex items-center flex-row gap-x-4'>
                <Shop color={Colors.primary} size={25} variant='Bulk' />
                <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                  <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>Хаштаг</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className='flex absolute h-20 bottom-0 w-full justify-center' />

      </View>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  input: {
    paddingVertical: (Platform.OS === 'android') ? 15 : 20,
    fontFamily: 'medium',
  }
});