import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Add, ArrowLeft, ArrowLeft2, ArrowUp, Bag, Bookmark, Clock, Element, Element2, Heart, Location } from 'iconsax-react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import { Easing, FadeInUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import restaurants from '../../data/resataurants'

interface Food {
    id: number;
    name: string;
    price: number;
    desc: string;
}

// Define an interface for the restaurant
interface Restaurant {
    id: number;
    name: string;
    type: string;
    desc: string;
    food?: Food[]; // Make food optional to match your data structure
}


const categories = ['Бургер', 'Пица', 'Тако', 'Сендвич', 'Салата'];


type Category = 'Бургер' | 'Пица' | 'Тако' | 'Сендвич' | 'Салата';

type FoodItem = {
    foodName: string;
    foodDesc: string;
    price: number;
};

// Sample data for each category
const CATEGORY_DATA: Record<Category, FoodItem[]> = {
    'Бургер': [
        { foodName: 'Classic Burger', foodDesc: 'Beef, Lettuce, Tomato', price: 150 },
        // More items...
    ],
    'Пица': [
        { foodName: 'Margherita', foodDesc: 'Tomato, Mozzarella, Basil', price: 200 },
        // More items...
    ],
    // Define data for other categories similarly
    'Тако': [],
    'Сендвич': [],
    'Салата': [],
};

const Page = () => {



    const { id } = useLocalSearchParams();
    // Adjust the useState initialization to allow for Restaurant type or null
    const restaurant = restaurants.find(r => r.id.toString() === id);

    // Render the restaurant details or a loading message
    if (!restaurant) {
        return <View><Text>Loading or restaurant not found...</Text></View>;
    }


    const [activeCategory, setActiveCategory] = useState<Category>('Бургер');
    const activeIndex = categories.indexOf(activeCategory); // Calculate active index based on the active category
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const categoryWidth = 96; // Adjust this based on your layout

    useEffect(() => {
        Animated.spring(highlightPosition, {
            toValue: activeIndex * categoryWidth,
            useNativeDriver: true,
            speed: 12,
        }).start();
    }, [activeIndex, categoryWidth]);

    const handleCategoryChange = (category: Category) => {
        setActiveCategory(category);
        // No need to manually set activeIndex since it's derived from activeCategory
    };


    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const [visible, setVisible] = useState(false);
    // State to ensure animation only plays once
    const [animationPlayed, setAnimationPlayed] = useState(false);

    // Ref for the animated value
    const animation = useRef(new Animated.Value(0)).current; // Initial value for opacity and position

    // Function to trigger the animation
    const addToCart = () => {

        if (itemQuantity < 99) {
            setItemQuantity(itemQuantity + 1);
        }
        // Check if animation has already been played
        if (!animationPlayed) {
            setVisible(true); // Make the button eligible for display
            // Start the animation
            Animated.spring(animation, {
                toValue: 1, // Final value for opacity and translateY
                speed: 16, // Control speed of the animation
                bounciness: 8,

                // Animation duration
                useNativeDriver: true, // Use native driver for better performance
            }).start(() => setAnimationPlayed(true)); // Mark animation as played
        }
    };

    // Calculated styles based on animation value
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


    const scrollY = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current; // Opacity for animation

    // Threshold for toggling visibility
    const toggleVisibilityThreshold = 250;

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            if (value > toggleVisibilityThreshold && !isVisible) {
                setIsVisible(true);
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.circle,
                    useNativeDriver: true,
                }).start();
            } else if (value <= toggleVisibilityThreshold && isVisible) {
                setIsVisible(false);
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.circle,
                    useNativeDriver: true,
                }).start();
            }
        });

        return () => scrollY.removeAllListeners();
    }, [isVisible, opacity, scrollY]);

    return (
        <View className='flex-1 pb-6 bg-[#fafafa]'>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style='light' />

            <Animated.View style={{opacity}} className='flex-col bg-[#FFFFFC] absolute pt-16 z-[999] top-0'>
                <View className='flex flex-row items-center w-full px-6'>
                    <TouchableOpacity onPress={() => router.back()} className='flex justify-center items-center' >
                        <ArrowLeft variant='Linear' size={24} color={Colors.dark} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "semibold" }} className='text-lg ml-4'>{restaurant.name}</Text>
                </View>

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
            </Animated.View>


            <ScrollView  onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>

                <View className='bg-[#0b0b0b] BORDER pt-20 pb-6 px-6 overflow-hidden'>
                    <View>

                        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
                            <ArrowLeft variant='Linear' size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <Text className=' text-[#FFFFFC]/60 uppercase mt-10' style={{ fontFamily: "bold" }}>{restaurant.type}</Text>
                        <Text className='text-3xl text-[#FFFFFC] mt-1' style={{ fontFamily: "bold" }}>{restaurant.name}</Text>

                        <View className='flex flex-col gap-y-2 mt-3'>

                            <View className='flex flex-row items-center'>
                                <Clock variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>Отворено</Text>
                            </View>
                            <View className='flex flex-row items-center'>
                                <Bookmark variant='Bulk' color={Colors.primary} size={16} />
                                <Text className='text-[#FAFAFA]/60 ml-2 text-xs' style={{ fontFamily: "bold" }}>{restaurant.desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View className='flex-col'>


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
                </View>



                <ScrollView>
                    <View className='flex-1 pt-8 bg-[#FFFFFC]  pb-24'>

                        <Text className='text-xl px-6 text-[#0b0b0b]' style={{ fontFamily: "bold" }}>Бургер</Text>

                        <View className='flex flex-col'>

                            {restaurant.food?.map((food: Food, index: number) => (

                                <TouchableOpacity key={index} onPress={() => router.push('/foodDetails')} className='flex-row flex justify-between items-center py-6 px-6 border-b border-[#0b0b0b]/20'>
                                    <View className='w-3/4'>
                                        <Text className='text-lg' style={{ fontFamily: "medium" }}>{food.name}</Text>
                                        <Text className='text-md text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>{food.price} ден</Text>
                                        <Text className='text-[#0b0b0b]/60 mt-2' style={{ fontFamily: "medium" }}>{food.desc}</Text>
                                    </View>

                                    <View className='flex justify-center items-center bg-[#7577804C]/10 rounded-2xl overflow-hidden w-20 h-20'>
                                        <TouchableOpacity onPress={addToCart} className='flex justify-center right-1 absolute bottom-1 items-center w-8 h-8 bg-[#FFFFFC] rounded-xl'>
                                            <Add size={20} variant='Linear' color={Colors.dark} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>

                            ))}

                        </View>
                    </View>
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

            </ScrollView>
        </View>
    )
}

export default Page


