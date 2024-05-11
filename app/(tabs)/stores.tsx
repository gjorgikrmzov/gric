import { Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard, Animated, Platform, StyleSheet, Dimensions, Touchable, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router'
import { ArrowLeft, Bag, CloseSquare, Heart, MessageQuestion, SearchNormal1, Shop, ShoppingCart } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { Easing } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { fetchStores } from '../reduxStore/storeSlice';
import { fetchStoresTypes } from '../reduxStore/storeTypeSlice';

const Page = () => {

  const dispatch = useDispatch<any>()

  const { stores } = useSelector((state: RootState) => state.store)
  const { storeTypes } = useSelector((state: RootState) => state.storeType)
  const { accessToken } = useSelector((state: RootState) => state.accessToken)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchStores(accessToken))
      dispatch(fetchStoresTypes(accessToken))
    }
  }, [accessToken, dispatch])

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
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 0,
        easing: Easing.circle,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: 0,
        bounciness: 10,
        speed: 10,
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


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchStores(accessToken))
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleRouteStoreDetails = (store: any) => {
    const storeTypeName = getStoreTypeName(store.storeTypeId);
    router.push({
      pathname: '/storeDetails/[id]',
      params: {
        id: store.id,
        name: store.name,
        storeTypeName,
        isOpen: store.isOpen
      }
    });
  };

  return (
    <GestureHandlerRootView >

      <View style={styles.header} className='bg-[#fffffc] flex-1'>
        <Animated.View className='px-6 flex flex-row items-center mt-4 mb-4 '>
          <View className=' bg-[#fafafa]/90 flex-1 items-center flex-row px-5 rounded-2xl'>
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

        <Animated.View style={{ transform: [{ translateY: searchBarResult }] }} className={isFocused ? 'flex h-full mt-4 px-6' : 'hidden'}>
          {/* <Text className={search == '' ? 'text-[#0b0b0b]/60' : 'hidden'} style={{ fontFamily: "semibold" }}>Препорачани</Text> */}
          <ScrollView keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false} className='flex flex-1 flex-col mt-3' >
            {filteredStores.map((store, index) => (
              index < 5 && (
                <TouchableOpacity onPress={() => handleRouteStoreDetails(store)} key={index} className='w-full flex-row  flex items-center justify-between'>
                  <View className='flex items-center flex-row gap-x-4'>
                    <Shop color='#757780' size={25} variant='Broken' />
                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                      <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>{store.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            ))}

            {filteredStores.length === 0 ? (
              <View className='flex-1 mt-6 justify-center items-center flex '>
                <View className='w-14 h-14 bg-[#fafafa]/80 flex justify-center items-center rounded-lg'>
                  <MessageQuestion size={26} color={Colors.primary} variant='Bulk' />
                </View>
                <Text className='text-center mt-2 text-[#0b0b0b]/60 text-[16px]' style={{ fontFamily: "medium" }}>Нема пронајдено {'\n'} резултати</Text>
              </View>
            ) : null}
          </ScrollView>
        </Animated.View>

        <ScrollView keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
            onRefresh={onRefresh} />} className='h-full bg-[#FFFFFC]'>
          <View className='h-full  mb-4'>

            <View className='w-full  '>
              <FlatList
                data={stores}
                scrollEnabled={false}
                className='px-6'
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity className='mt-3 pb-1' onPress={() => handleRouteStoreDetails(item)}>
                    <View className='flex overflow-hidden relative'>
                      <View className='w-full h-40 p-5 bg-[#fafafa] rounded-2xl overflow-hidden'>
                        <View className='flex flex-row items-center justify-end w-full'>
                          <TouchableOpacity className='flex flex-row items-center'>
                            <Heart color={Colors.dark} size={20} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View className='ml-1 mt-2'>
                      <View className='flex flex-row w-full justify-between items-center'>
                        <Text className='text-lg ' style={{ fontFamily: "semibold" }}>{item.name}</Text>
                        <View className='px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-full'>
                          <Text style={{ fontFamily: "semibold" }} className='text-xs'>25-30 мин</Text>
                        </View>
                      </View>
                      <View className='flex flex-row items-center'>
                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{getStoreTypeName(item.storeTypeId)} · </Text>
                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{item.isOpen ? 'Отворено' : 'Затворено'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 6,
                  backgroundColor: '#FFFFFC',
                }}
              />
            </View>
          </View>
        </ScrollView>

        <View
          className='px-6 flex absolute py-4 bottom-0 w-full justify-center'>
          {
            cartItems.length !== 0 && (
              <Animated.View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                  <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                  <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {numberOfCartItems}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
        </View>
      </View>
    </GestureHandlerRootView>
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