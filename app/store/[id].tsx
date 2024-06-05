import { View, Text, ScrollView, Animated, FlatList, StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Heart, Location, ShoppingCart } from 'iconsax-react-native'
import { Link, router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchStoreItems } from '../reduxStore/storeItemSlice'
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StoreItemCard from '../../components/Cards/storeItemCard'
import { Image } from 'expo-image'
import { PressableScale } from 'react-native-pressable-scale'

const Page = () => {


    const dispatch = useDispatch<any>();

    const { address, id, name, storeType, isOpen, imageUrl } = useLocalSearchParams<{ address: any, id: any, name: string, storeType: string, isOpen: string, imageUrl: string }>();
    const { accessToken } = useSelector((state: RootState) => state.accessToken);
    const { storeItems } = useSelector((state: RootState) => state.storeItem);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [loadingItems, setLoadingItems] = useState(true);
    const isStoreOpen = isOpen === 'true';
    const storeAddress = JSON.parse(address)
    const memoizedStoreItems = useMemo(() => storeItems.filter((item) => item.storeId === id), [storeItems, id]);
    const [isScrolled, setisScrolled] = useState(false)
    const scrollTreshold = 80

    const scrollY = useRef(new Animated.Value(0)).current;
    const textOpacity = scrollY.interpolate({
        inputRange: [0, scrollTreshold],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        if (scrollPosition > scrollTreshold && !isScrolled) {
            setisScrolled(true);
        } else if (scrollPosition <= scrollTreshold && isScrolled) {
            setisScrolled(false);
        }
        scrollY.setValue(scrollPosition);
    };

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, scrollTreshold],
        outputRange: ['rgba(000, 000, 000, 0)', '#0b0b0b'],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        if (accessToken && memoizedStoreItems.length === 0) {
            setLoadingItems(true);
            dispatch(fetchStoreItems({ id, accessToken })).finally(() => setLoadingItems(false));
        } else {
            setLoadingItems(false);
        }
    }, [accessToken, id, dispatch, memoizedStoreItems.length]);


    return (
        <GestureHandlerRootView>
            <View className='flex-1  bg-[#0b0b0b]'>

                <StatusBar style='light' />
                <Animated.View style={[styles.header, {backgroundColor: headerBackgroundColor}]} className= 'flex z-[999] pb-4  absolute top-0' >
                    <View className='w-full px-6 flex-row items-center justify-between'>
                        <PressableScale onPress={() => router.back()} className={isScrolled ? 'w-14 h-14 flex justify-center items-center border border-[#fafafa]/5 bg-[#0b0b0b]/90 rounded-full' : 'w-14 h-14 flex justify-center items-center bg-[#0b0b0b]/90 rounded-full'} >
                            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
                        </PressableScale>

                        <Animated.Text className='text-[16px] text-white'  style={{ fontFamily: 'medium', opacity: textOpacity }}>{name}</Animated.Text>

                        <PressableScale className={isScrolled ? 'w-14 h-14 flex justify-center items-center border border-[#fafafa]/5 bg-[#0b0b0b]/90 rounded-full' : 'w-14 h-14 flex justify-center items-center bg-[#0b0b0b]/90 rounded-full'} >
                            <Heart variant='Broken' size={20} color={Colors.white} />
                        </PressableScale>
                    </View>

                    {/* <Animated.View style={{ opacity: textOpacity }} className=''>
                        <ScrollView removeClippedSubviews
                            horizontal
                            decelerationRate={'fast'}
                            snapToAlignment='end'
                            showsHorizontalScrollIndicator={false}

                            className='h-min bg-[#FFFFFC] mt-4 '  >
                            {categories.map((category, index) => (
                                <PressableScale
                                    className="py-4 flex px-3 justify-center items-center"
                                    key={index}
                                    // onPress={() => handleCategoryChange(category as Category)}
                                >
                                    <Text style={{ fontFamily: 'medium' }}>{category.name}</Text>
                                </PressableScale>
                            ))}

                            <View className="w-full absolute left-0 bottom-0 h-1 bg-[#F0F1F3]">
                                <Animated.View
                                    className='self-start'
                                    style={{
                                        // width: categoryWidth,
                                        height: 4,
                                        backgroundColor: '#0b0b0b',
                                        
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </Animated.View> */}
                </Animated.View>

                <ScrollView onScroll={handleScroll} bounces={false} showsVerticalScrollIndicator={false}>
                    <View className='bg-[#0b0b0b] pb-6 z-50 w-full h-72 px-6 '>
                        <View className='w-screen absolute h-72 z-30 left-0 top-0 bg-[#0b0b0b]/80'></View>
                        <Image source={imageUrl} className=' absolute left-0 z-20 h-72 top-0 w-screen' />

                        <View className='z-[50] flex-1 justify-end flex fixed'>


                            <Text className=' text-[#FFFFFC]/60 mt-8 uppercase ' style={{ fontFamily: "bold" }}>{storeType}</Text>

                            <Text className=' text-3xl  text-[#FFFFFC]' style={{ fontFamily: "bold" }}>{name}</Text>

                            {storeAddress?.street ? (

                                <View className=' flex items-center mt-0.5 flex-row'>
                                    <Location variant='Bulk' size={16} color={Colors.primary} />
                                    <Text className='text-[#fafafa]/80 ml-1' style={{ fontFamily: "medium" }}>{storeAddress?.street} {storeAddress?.streetNumber}</Text>
                                </View>
                            ) : (
                                null
                            )
                            }
                            <View className={isStoreOpen ? ' bg-[#1BD868] mt-4 self-start flex justify-center items-center flex-row px-3 py-1.5 rounded-xl' : ' bg-[#121212]/90 mt-4 self-start flex justify-center items-center flex-row px-3 py-1.5 rounded-xl'}>
                                <Text className={isStoreOpen ? ' text-[#000]/80 text-xs' : " text-[#fff]/80 text-xs"} style={{ fontFamily: "semibold" }}>{isStoreOpen ? 'Отворено' : 'Затворено'}</Text>
                            </View>

                        </View>
                    </View>

                    <View className='pb-20 mt-5'>
                        <Text className='text-xl px-6 text-[#fffffc]' style={{ fontFamily: "bold" }}>Мени</Text>
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
                                            <StoreItemCard storeId={id} item={item} isOpen={isStoreOpen} />
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
                                    <PressableScale className='w-full flex-row py-6 border-2 bg-[#121212] border-[#1BD868] flex justify-center items-center rounded-3xl'>
                                        <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                                        <Text style={{ fontFamily: "medium" }} className=' text-[#fffffc] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {cartItems?.length}</Text>
                                    </PressableScale>
                                </Link>
                            </Animated.View>
                        )}
                </View>
            </View>
        </GestureHandlerRootView >
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


{/* <Animated.View className='flex-col bg-[#FFFFFC] absolute pt-16  top-0'>

               

            </Animated.View> */}



{/* <View className='flex-col'>


                    <ScrollView removeClippedSubviews
                        horizontal
                        decelerationRate={'fast'}
                        snapToAlignment='end'
                        showsHorizontalScrollIndicator={false}

                        className='h-min bg-[#FFFFFC]'  >
                        {categories.map((category, index) => (
                            <PressableScale
                                className="w-24 py-5 justify-center items-center"
                                key={category}
                                onPress={() => handleCategoryChange(category as Category)}
                            >
                                <Text style={{ fontFamily: 'medium' }}>{category}</Text>
                            </PressableScale>
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
