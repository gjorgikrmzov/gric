import { View, Text, TouchableOpacity, ScrollView, Animated, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Clock, Heart, Location, ShoppingCart } from 'iconsax-react-native'
import { Link, Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchStoreItems } from '../reduxStore/storeItemSlice'
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {

    const dispatch = useDispatch<any>();

    const { address, id, name, storeTypeName, isOpen } = useLocalSearchParams<{ address: any, id: any, name: string, storeTypeName: string, isOpen: string }>();
    const { accessToken } = useSelector((state: RootState) => state.accessToken);
    const { storeItems } = useSelector((state: RootState) => state.storeItem);
    const { categories } = useSelector((state: RootState) => state.category);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [loadingItems, setLoadingItems] = useState(true);
    const isStoreOpen = isOpen === 'true';
    const storeAddress = JSON.parse(address)
    const memoizedStoreItems = useMemo(() => storeItems.filter((item) => item.storeId === id), [storeItems, id]);

    useEffect(() => {
        if (accessToken && memoizedStoreItems.length === 0) {
            setLoadingItems(true);
            dispatch(fetchStoreItems({ id, accessToken })).finally(() => setLoadingItems(false));
        } else {
            setLoadingItems(false);
        }
    }, [accessToken, id, dispatch, memoizedStoreItems.length]);


    const getCategoryName = (categoryId: any) => {
        const category = categories.find((category) => category.id === categoryId);
        return category ? category.name : 'Unknown Type';
    };

    return (
        <GestureHandlerRootView>
            <View className='flex-1 pb-6 bg-[#fffffc]'>
                <Stack.Screen options={{ headerShown: false }} />

                <StatusBar style='light' />
                <View style={styles.header} className='bg-[#0b0b0b] pb-6 px-6 overflow-hidden'>
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <Heart variant='Broken' size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                    <Text className=' text-[#FFFFFC]/60 mt-8 uppercase ' style={{ fontFamily: "bold" }}>{storeTypeName}</Text>

                    <Text className='text-3xl  text-[#FFFFFC]' style={{ fontFamily: "bold" }}>{name}</Text>

                    {storeAddress?.street ? (

                        <View className='flex items-center mt-0.5 flex-row'>
                            <Location variant='Bulk' size={16} color={Colors.primary} />
                            <Text className='text-[#fafafa]/80 ml-1' style={{ fontFamily: "medium" }}>{storeAddress?.street} {storeAddress?.streetNumber}</Text>
                        </View>
                    ) : (
                        null
                    )
                    }
                    <View className={isStoreOpen ? 'bg-[#1BD868] mt-4 self-start flex justify-center items-center flex-row px-3 py-1.5 rounded-xl' : 'bg-[#fffffc]/20 mt-4 self-start flex justify-center items-center flex-row px-3 py-1.5 rounded-xl'}>
                        <Text className={isStoreOpen ? 'text-[#000]/80 text-xs' : "text-[#fff]/80 text-xs"} style={{ fontFamily: "semibold" }}>{isStoreOpen ? 'Отворено' : 'Затворено'}</Text>
                    </View>

                </View>

                <ScrollView>
                    <View className='pb-20 mt-5'>
                        <Text className='text-xl px-6 text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Мени</Text>
                        {loadingItems ?
                            (
                                <ActivityIndicator />

                            )
                            : (
                                <FlatList
                                    scrollEnabled={false}
                                    data={storeItems}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={
                                        ({ item }) => (
                                            <TouchableOpacity onPress={() => router.push({ pathname: '/storeItem/[id]', params: { storeId: id, id: item.id, name: item.name, description: item.description, price: item.price, isOpen, category: getCategoryName(item.categoryId) } }) as any} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1 }} className='border-[#0b0b0b]/5'>
                                                <View style={{ flex: 1 }}>
                                                    <Text className='hidden'>{getCategoryName(item.categoryId)}</Text>
                                                    <Text style={{ color: '#0b0b0b', fontSize: 16, marginTop: 2, fontFamily: "semibold" }}>{item.name}</Text>
                                                    <Text className='text-[#0b0b0b] text-md' style={{ fontFamily: "semibold", marginTop: 4 }}>{item.price} <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b]/60 text-sm'>ден</Text></Text>
                                                    <Text style={{ color: '#0b0b0b90', marginTop: 8, fontFamily: "medium" }}>{item.description}</Text>
                                                </View>

                                                <View className='flex justify-center items-center bg-[#7577804C]/10 rounded-2xl overflow-hidden w-24 h-24'></View>
                                            </TouchableOpacity>
                                        )}
                                />

                            )
                        }
                    </View>
                </ScrollView >



                <View
                    className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                    {
                        cartItems?.length !== 0 && (
                            <Animated.View>
                                <Link href={'/cart'} asChild>
                                    <TouchableOpacity className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                        <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                                        <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {cartItems?.length}</Text>
                                    </TouchableOpacity>
                                </Link>
                            </Animated.View>
                        )}
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

export default Page



// const [activeCategory, setActiveCategory] = useState<Category>('Бургер');
// const activeIndex = categories.indexOf(activeCategory); 
// const highlightPosition = useRef(new Animated.Value(0)).current;
// const categoryWidth = 96; 

// useEffect(() => {
//     Animated.spring(highlightPosition, {
//         toValue: activeIndex * categoryWidth,
//         useNativeDriver: true,
//         speed: 12,
//     }).start();
// }, [activeIndex, categoryWidth]);

// const handleCategoryChange = (category: Category) => {
//     setActiveCategory(category);
// };




// const scrollY = useRef(new Animated.Value(0)).current;
// const [isVisible, setIsVisible] = useState(false);
// const opacity = useRef(new Animated.Value(0)).current; // Opacity for animation

// const toggleVisibilityThreshold = 250;

// useEffect(() => {
//     scrollY.addListener(({ value }) => {
//         if (value > toggleVisibilityThreshold && !isVisible) {
//             setIsVisible(true);
//             Animated.timing(opacity, {
//                 toValue: 1,
//                 duration: 100,
//                 easing: Easing.circle,
//                 useNativeDriver: true,
//             }).start();
//         } else if (value <= toggleVisibilityThreshold && isVisible) {
//             setIsVisible(false);
//             Animated.timing(opacity, {
//                 toValue: 0,
//                 duration: 100,
//                 easing: Easing.circle,
//                 useNativeDriver: true,
//             }).start();
//         }
//     });

//     return () => scrollY.removeAllListeners();
// }, [isVisible, opacity, scrollY]);


{/* <Animated.View className='flex-col bg-[#FFFFFC] absolute pt-16 z-[999] top-0'>

                <ScrollView removeClippedSubviews
                    horizontal
                    decelerationRate={'fast'}
                    snapToAlignment='end'
                    showsHorizontalScrollIndicator={false}

                    className='h-min bg-[#FFFFFC] mt-4'  >
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            className="w-24 py-5 justify-center items-center"
                            key={category}
                            onPress={() => handleCategoryChange(category as Category)}
                        >
                            <Text style={{ fontFamily: 'medium' }}>{category}</Text>
                        </TouchableOpacity>
                    ))}

                    <View className="w-full absolute left-0 bottom-0 h-1 bg-[#F0F1F3]">
                        <Animated.View
                            className='self-start'
                            style={{
                                width: categoryWidth,
                                height: 4,
                                backgroundColor: '#0b0b0b',
                                transform: [{ translateX: highlightPosition }],
                            }}
                        />
                    </View>
                </ScrollView>

            </Animated.View> */}



{/* <View className='flex-col'>


                    <ScrollView removeClippedSubviews
                        horizontal
                        decelerationRate={'fast'}
                        snapToAlignment='end'
                        showsHorizontalScrollIndicator={false}

                        className='h-min bg-[#FFFFFC]'  >
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                className="w-24 py-5 justify-center items-center"
                                key={category}
                                onPress={() => handleCategoryChange(category as Category)}
                            >
                                <Text style={{ fontFamily: 'medium' }}>{category}</Text>
                            </TouchableOpacity>
                        ))}

                        <View className="w-full absolute left-0 bottom-0 h-1 bg-[#F0F1F3]">
                            <Animated.View
                                className='self-start'
                                style={{
                                    width: categoryWidth,
                                    height: 4,
                                    backgroundColor: '#0b0b0b',
                                    transform: [{ translateX: highlightPosition }],
                                }}
                            />
                        </View>
                    </ScrollView>
                </View> */}




const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 44 : 64,
    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    }
});
