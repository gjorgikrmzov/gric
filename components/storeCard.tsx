import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Heart } from 'iconsax-react-native'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../app/reduxStore'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

const StoreCard = ({ item }: { item: any }) => {

    const router = useRouter();
    const { storeTypes } = useSelector((state: RootState) => state.storeType);

    const getStoreTypeName = (storeTypeId: string) => {
        const storeType = storeTypes?.find((type) => type.id === storeTypeId);
        return storeType ? storeType.name : 'Unknown Type';
    };

    const handleRouteStoreDetails = (store: any) => {
        const storeTypeName = getStoreTypeName(store.storeTypeId);
        router.push({
            pathname: '/store/[id]',
            params: {
                id: store.id,
                name: store.name,
                isOpen: store.isOpen,
                storeTypeName,
                address: JSON.stringify(store.address),
                imageUrl: store.imageUrl
            },
        } as any);
    };

    return (
        <TouchableOpacity className='mt-3 pb-1' onPress={() => handleRouteStoreDetails(item)}>
            <View className='flex overflow-hidden relative'>
                <Image source={item.imageUrl}
                    className='absolute h-full z-[999] left-0 rounded-2xl top-0  w-full ' />
                <View className='w-full h-40 p-5 bg-[#fafafa] relative overflow-hidden'>
                    <View className='flex flex-row items-center justify-end w-full'>
                        <TouchableOpacity className='flex flex-row items-center'>
                            <Heart color={Colors.dark} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className='ml-1 mt-2'>
                <View className='flex flex-row w-full justify-between items-start'>

                    <View className='flex '>
                        <Text className='text-lg  -mb-1' style={{ fontFamily: 'semibold' }}>{item.name}</Text>
                        <Text className='text-[#0b0b0b]/60 text-sm ' style={{ fontFamily: 'medium' }}>{getStoreTypeName(item.storeTypeId)}</Text>
                    </View>

                    <View className={item.isOpen ? 'px-2.5 py-1.5 bg-[#0b0b0b] flex items-center justify-center rounded-xl' : 'px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-xl'}>
                        <Text style={{ fontFamily: 'medium' }} className={item.isOpen ? 'text-white text-xs' : "text-xs text-black"}>{item.isOpen ? 'Отворено' : 'Затворено'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default StoreCard