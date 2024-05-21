import { Animated, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const CardSkeleton = () => {

    const pulseValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseValue, {
                    toValue: 0.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        );

        pulseAnimation.start();

        return () => {
            pulseAnimation.stop();
        };
    }, [pulseValue]);

    return (
        <Animated.View style={{opacity: pulseValue}} className='mt-3 pb-1'>
            <View className='flex overflow-hidden relative'>

                <View className='w-full h-40 p-5 bg-[#F7F7F7] rounded-2xl relative overflow-hidden'>
                    <View className='flex flex-row items-center justify-end w-full'>

                    </View>
                </View>
            </View>

            <View className='ml-1 mt-2'>
                <View className='flex flex-row w-full justify-between items-start'>
                    <View className='flex '>
                        <View className=' bg-[#F7F7F7] h-4 rounded-xl  w-24 mb-1'></View>
                        <View className='bg-[#F7F7F7] h-4 rounded-xl w-36'></View>
                    </View>

                    <View className='py-3 w-20 bg-[#F7F7F7] flex items-center justify-center rounded-xl' >
                    </View>
                </View>
            </View>
        </Animated.View >
    )
}

export default CardSkeleton