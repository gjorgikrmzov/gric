import { Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard, Animated, Platform, StyleSheet, Dimensions, Touchable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router'
import { ArrowLeft, Bag, CloseSquare, Heart, SearchNormal1, Shop } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { RefreshControl } from 'react-native-gesture-handler'
import { Easing } from 'react-native-reanimated';
import restaurants from '../../data/resataurants'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { fetchStores } from '../reduxStore/storeSlice';
import { fetchStoresTypes } from '../reduxStore/storeTypeSlice';
import { LinearGradient } from 'expo-linear-gradient';

const Page = () => {

  const dispatch = useDispatch<any>()

  const { stores } = useSelector((state: RootState) => state.store)
  const { storeTypes } = useSelector((state: RootState) => state.storeType)

  useEffect(() => {
    dispatch(fetchStores())
    dispatch(fetchStoresTypes())
  }, [])

  const [search, setSearch] = useState<string>('');

  const [filteredStores, setFilteredStores] = useState(stores);
  const inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const searchBarResult = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const numberOfCartItems = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredStores(stores);
    } else {
      const lowercasedQuery = search.toLowerCase();
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredStores(filtered);
    }
  }, [search, stores]);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find(type => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };


  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: -40,
        speed: 16,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(searchBarResult, {
        toValue: 0,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ]).start();
  };


  const [likeStatus, setLikeStatus] = useState<boolean[]>(Array(restaurants.length).fill(true));

  const handleLikeRestaurant = (index: number) => {
    const updatedLikeStatus = [...likeStatus];
    updatedLikeStatus[index] = !updatedLikeStatus[index];
    setLikeStatus(updatedLikeStatus);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);


    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };


  return (

    <View style={styles.header} className='bg-[#fffffc] flex-1'>
      <Animated.View className='px-6 flex flex-row items-center mt-4 mb-4 '>
        <View className=' bg-[#fafafa]/90 flex-1 items-center flex-row px-5 rounded-xl'>
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

          <TextInput onChangeText={handleSearchChange}
            ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} className='text-[#0b0b0b] px-3 flex-1 ' style={styles.input} placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />

        </View>
      </Animated.View>



      <Animated.View style={{ transform: [{ translateY: searchBarResult }] }} className={isFocused ? 'flex h-full top-14 px-6' : 'hidden'}>
        <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
        <ScrollView keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false} className='flex flex-1 flex-col mt-3' >
          {filteredStores.map((store, index) => (
            index < 5 && (
              <TouchableOpacity onPress={() => router.push({ pathname: '/storeDetails/[id]', params: { id: store.id, name: store.name, storeTypeId: store.storeTypeId, isOpen: store.isOpen } } as any)} key={index} className='w-full flex-row  flex items-center justify-between'>
                <View className='flex items-center flex-row gap-x-4'>
                  <Shop color={Colors.dark} size={25} variant='Broken' />
                  <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                    <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>{store.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          ))}
        </ScrollView>
      </Animated.View>



      {/* <View className='w-full px-6  justify-between items-end flex flex-row'>
            <View className='flex flex-col ml-1'>
              <View className='flex items-center flex-row gap-x-2'>
                <Shop size={19} color={Colors.primary} variant='Bulk' />
                <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'extrabold' }}>Ресторани</Text>
              </View>
              <Text className='text-xs text-[#0b0b0b]/60 ml-0.5' style={{ fontFamily: 'semibold' }}>Сите Ресторани</Text>
            </View>
          </View> */}

      <ScrollView keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
          onRefresh={onRefresh} />} className='h-full bg-[#FFFFFC]'>
        <View className='h-full  mb-6'>

          <View className='w-full  '>
            <ScrollView>
              <View className='flex px-6 gap-y-4'>
                {stores.map((store, index) => (
                  <TouchableOpacity key={index} onPress={() => router.push({ pathname: '/storeDetails/[id]', params: { id: store.id, name: store.name, storeTypeId: store.storeTypeId, isOpen: store.isOpen } } as any)}>
                    <View className='flex overflow-hidden  relative'>
                      {/* <Image source={restaurant.restaurantImage} className='w-full h-full rounded-3xl left-0 top-0 absolute z-[-1]' /> */}
                      <View className='w-full h-40 p-5 bg-[#fafafa] rounded-2xl' style={{ overflow: 'hidden' }}
                      >
                        <View className='flex flex-row items-center justify-end w-full'>
                          <TouchableOpacity onPress={() => handleLikeRestaurant(index)} className='flex flex-row items-center'>
                            <Heart variant={likeStatus[index] ? 'Linear' : 'Bold'} color={Colors.dark} size={20} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View className='ml-1 mt-2'>
                      <View className='flex flex-row w-full justify-between items-center'>
                        <Text className='text-lg ' style={{ fontFamily: "semibold" }}>{store.name}</Text>
                        <View className='px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-full'>
                          <Text style={{ fontFamily: "semibold" }} className='text-xs'>25-30 мин</Text>
                        </View>
                      </View>
                      <View className='flex flex-row items-center'>
                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{getStoreTypeName(store.storeTypeId)} · </Text>
                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }} >{store.isOpen ? 'Отворено' : 'Затворено'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', '#FFFFFC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
        {
          cartItems.length !== 0 && (
            <Animated.View>
              <TouchableOpacity onPress={() => router.replace('/(tabs)/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                <Bag variant='Bulk' size={22} color={Colors.primary} />
                <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {numberOfCartItems}</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
      </LinearGradient>
    </View>

  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 44 : 38,
  },
  input: {
    paddingVertical: (Platform.OS === 'android') ? 16 : 22,
    fontFamily: 'medium',
  }

});