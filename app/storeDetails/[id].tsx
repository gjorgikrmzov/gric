import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Animated, FlatList, StyleSheet, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Add, ArrowLeft, ArrowLeft2, ArrowUp, Bag, Bookmark, Box, Clock, DirectRight, Element, Element2, Heart, Location, MessageQuestion, SearchNormal1, SearchStatus, ShoppingCart } from 'iconsax-react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchStoreItems } from '../reduxStore/storeItemSlice'
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { fetchCategories } from '../reduxStore/categorySlice'
import { Easing } from 'react-native-reanimated'

const Page = () => {

    const dispatch = useDispatch<any>()

    const { id, name, storeTypeName, isOpen } = useLocalSearchParams<{ id: string, name: string, storeTypeName: string, isOpen: string }>();
    const { accessToken } = useSelector((state: RootState) => state.accessToken)

    const [loadingItems, setLoadingItems] = useState(true)
    const isStoreOpen = isOpen === 'true' ? true : isOpen === 'false' ? false : isOpen;

    const { storeItems } = useSelector((state: RootState) => state.storeItem)
    const { categories } = useSelector((state: RootState) => state.category)
    const [filteredStoreItems, setfilteredStoreItems] = useState<any[]>([])

    const [search, setsearch] = useState('')
    const inputRef = useRef<any>()

    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [openSearch, setOpenSearch] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const opacity = useState(new Animated.Value(0))[0];
    const translateY = useState(new Animated.Value(-70))[0];

    const openSearchView = () => {
        setOpenSearch(true);
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                easing: Easing.inOut(Easing.circle),
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 10,
                duration: 300,
                easing: Easing.inOut(Easing.circle),
                useNativeDriver: true,
            })
        ]).start(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        });

    };

    const closeSearchView = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.circle),
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -70,
                duration: 300,
                easing: Easing.inOut(Easing.circle),
                useNativeDriver: true,
            })
        ]).start(() => {
            setIsFocused(false)
            setOpenSearch(false);
        });
    };

    useEffect(() => {
        setLoadingItems(true);
        if (accessToken) {
            dispatch(fetchStoreItems({ id, accessToken })).finally(() => setLoadingItems(false));
        }
    }, [accessToken, id, dispatch]);



    const getCategoryName = (categoryId: any) => {
        const categoryName = categories.find(category => category.id === categoryId);
        return categoryName ? categoryName.name : "Unknown Type";
    };



    useEffect(() => {
        if (search.trim() === '') {
            setfilteredStoreItems(storeItems);
        } else {
            const lowercasedQuery = search.toLowerCase();
            const filtered = storeItems.filter(storeItem =>
                storeItem.name.toLowerCase().includes(lowercasedQuery)
            );
            setfilteredStoreItems(filtered);
        }
    }, [search, storeItems]);


    return (
        <GestureHandlerRootView>
            <View className='flex-1 pb-6 bg-[#fffffc]'>
                <Stack.Screen options={{ headerShown: false }} />

                {openSearch && (
                    <Animated.View style={[
                        styles.header, {
                            opacity: opacity
                        }]} className='absolute w-screen h-full left-0 top-0 bg-[#FFFFFC] z-50 '>

                        <Animated.View style={[{ opacity: opacity, transform: [{ translateY }] }]} className='mx-6  bg-[#fafafa]/80 items-center flex-row px-5 rounded-2xl'>
                            {
                                isFocused ?
                                    (
                                        <TouchableOpacity onPress={closeSearchView} className=' flex justify-center items-center'>
                                            <ArrowLeft size={20} color={Colors.dark} variant='Broken' />
                                        </TouchableOpacity>

                                    ) :

                                    (
                                        <SearchNormal1 size={20} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
                            }

                            <TextInput ref={inputRef} onChangeText={(text) => setsearch(text)} style={styles.input} onFocus={() => setIsFocused(true)}
                                onBlur={closeSearchView}
                                className='text-[#0b0b0b] px-3 flex-1 ' placeholder='Пребарај продукт...' placeholderTextColor='#0b0b0b97' />
                        </Animated.View>


                        {filteredStoreItems.length === 0 ? (
                            <View className='flex-1 justify-center items-center flex '>
                                <View className='w-14 h-14 bg-[#fafafa]/80 flex justify-center items-center rounded-lg'>
                                    <SearchStatus size={26} color={Colors.primary} variant='Bulk' />
                                </View>
                                <Text className='text-center mt-2 text-[#0b0b0b]/60 text-[16px]' style={{ fontFamily: "medium" }}>Пребарај продукт</Text>
                            </View>
                        ) : (
                            <FlatList
                                keyboardShouldPersistTaps="always"
                                className='mt-4 h-full'
                                data={filteredStoreItems}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => router.push({ pathname: '/foodDetails/[id]', params: { storeId: id, id: item.id, name: item.name, description: item.description, price: item.price, isOpen, category: getCategoryName(item.categoryId) } }) as any} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: '#0b0b0b20' }}>
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
                        )}
                    </Animated.View>
                )}

                <StatusBar style='light' />
                <View  style={styles.header} className='bg-[#0b0b0b] pb-6 px-6 overflow-hidden'>
                    <View className='flex flex-row items-center justify-between'>
                        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openSearchView} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <SearchNormal1 variant='Broken' size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>

                    <Text className=' text-[#FFFFFC]/60 uppercase mt-8' style={{ fontFamily: "bold" }}>{storeTypeName}</Text>
                    <Text className='text-3xl text-[#FFFFFC]' style={{ fontFamily: "bold" }}>{name}</Text>

                    <View className='flex items-center mt-2 flex-row'>
                        <Clock variant='Broken' size={16} color={Colors.primary} />
                        <Text className='text-[#fafafa]/80 ml-1' style={{ fontFamily: "medium" }}>{isStoreOpen ? 'Отворено' : 'Затворено'}</Text>
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
                                            <TouchableOpacity onPress={() => router.push({ pathname: '/foodDetails/[id]', params: { storeId: id, id: item.id, name: item.name, description: item.description, price: item.price, isOpen, category: getCategoryName(item.categoryId) } }) as any} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1 }} className='border-[#0b0b0b]/5'>
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
                                <TouchableOpacity onPress={() => router.replace('/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                    <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                                    <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {cartItems?.length}</Text>
                                </TouchableOpacity>
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
