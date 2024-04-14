import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Add, ArrowLeft, ArrowLeft2, ArrowUp, Bag, Bookmark, Clock, DirectRight, Element, Element2, Heart, Location } from 'iconsax-react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Skeleton } from 'moti/skeleton'

const Page = () => {

    const { id, name, storeTypeId, isOpen } = useLocalSearchParams();

    const [storeTypes, setStoreTypes] = useState<any[]>([])
    const [storeItems, setstoreItems] = useState<any[]>([])

    useEffect(() => {
        const fetchStoresAndTypes = async () => {
            try {
                const typesResponse = await fetch('http://192.168.1.47:8080/store/type', {})
                if (typesResponse.ok) {
                    const types = await typesResponse.json()
                    setStoreTypes(types)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchStoresAndTypes()

    }, [])


    const getStoreTypeName = (storeTypeId: string | string[]) => {
        if (Array.isArray(storeTypeId)) {
            const storeType = storeTypes.find(type => type.id === storeTypeId[0]); // Use first element
            return storeType ? storeType.name : "Unknown Type";
        } else {
            const storeType = storeTypes.find(type => type.id === storeTypeId);
            return storeType ? storeType.name : "Unknown Type";
        }
    };

    useEffect(() => {
        const fetchStoreItems = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://192.168.1.47:8080/store/item?storeId=${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setstoreItems(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchStoreItems();
    }, []);


    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const [visible, setVisible] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);

    const animation = useRef(new Animated.Value(0)).current; // Initial value for opacity and position

    const addToCart = () => {

        if (itemQuantity < 99) {
            setItemQuantity(itemQuantity + 1);
        }
        if (!animationPlayed) {
            setVisible(true); // Make the button eligible for display
            Animated.spring(animation, {
                toValue: 1, // Final value for opacity and translateY
                speed: 16, // Control speed of the animation
                bounciness: 8,

                useNativeDriver: true, // Use native driver for better performance
            }).start(() => setAnimationPlayed(true)); // Mark animation as played
        }
    };

    const animatedStyle = {
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1], // Opacity from 0 to 1
        }),
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0], // Move from -20 to 0
            })
        }]
    };



    return (
        <View className='flex-1 pb-6 bg-[#fffffc]'>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style='light' />


            <ScrollView>
                <View className='bg-[#0b0b0b] pt-20 pb-6 px-6 overflow-hidden'>
                    <View>
                        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <ArrowLeft variant='Linear' size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <Text className=' text-[#FFFFFC]/60 uppercase mt-10' style={{ fontFamily: "bold" }}>{getStoreTypeName(storeTypeId)}</Text>
                        <Text className='text-3xl text-[#FFFFFC] mt-1' style={{ fontFamily: "bold" }}>{name}</Text>

                        <View className='flex flex-col gap-y-2 mt-3'>

                            <View className='flex flex-row items-center'>
                                <Clock variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{isOpen ? 'Отворено' : 'Затворено'}</Text>
                            </View>
                            <View className='flex flex-row items-center'>
                                <DirectRight variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "semibold" }}>3 км</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View className='flex-1 pt-8 bg-[#FFFFFC]  pb-24'>

                        <Text className='text-xl px-6 text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Мени</Text>

                        <View className='flex flex-col'>

                            {storeItems.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => router.push({ pathname: '/foodDetails/[id]', params: { id: item.id, name: item.name, description: item.description, price: item.price } } as any)} className='flex-row flex justify-between items-center py-4 px-6 border-b border-[#0b0b0b]/5'>
                                    <Skeleton.Group show={item == null}>
                                        <View className='flex-1'>
                                            <Skeleton colorMode='light' width='80%' radius='square'><Text className='text-[#0b0b0b] text-[15px] w-4/5' style={{ fontFamily: "semibold" }}>{item.name}</Text></Skeleton>
                                            <Skeleton colorMode='light' width='30%' radius='square'><Text className=' text-[#0b0b0b] mt-1' style={{ fontFamily: 'medium' }}>{item.price} ден</Text></Skeleton>
                                            <Skeleton colorMode='light' width='90%' radius='square'><Text className='text-[#0b0b0b]/60 mt-2 w-4/5' style={{ fontFamily: "medium" }}>{item.description}</Text></Skeleton>
                                        </View>

                                        <View className='flex justify-center items-center bg-[#7577804C]/10 rounded-2xl overflow-hidden w-24 h-24'>
                                            <TouchableOpacity onPress={addToCart} className='flex justify-center right-1 absolute bottom-1 items-center w-8 h-8 bg-[#FFFFFC] rounded-xl'>
                                                <Add size={20} variant='Linear' color={Colors.dark} />
                                            </TouchableOpacity>
                                        </View>
                                    </Skeleton.Group>
                                </TouchableOpacity>
                            ))}

                        </View>
                    </View>
                </ScrollView>



            </ScrollView>

            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', '#FFFFFC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className='px-6 flex absolute py-8 bottom-0 w-full justify-center'>
                {
                    visible && (
                        <Animated.View style={animatedStyle}>
                            <TouchableOpacity onPress={() => router.replace('/(tabs)/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                                <Bag variant='Bulk' size={22} color={Colors.primary} />
                                <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {itemQuantity}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
            </LinearGradient>
        </View>
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




