import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/reduxStore'
import { PressableScale } from 'react-native-pressable-scale'

const StoreItemCard = ({ item, storeId, isOpen }: { item: any, storeId: string, isOpen:any }) => {

    const router = useRouter()
    const { categories } = useSelector((state: RootState) => state.category);

    const getCategoryName = (categoryId: any) => {
        const category = categories.find((category) => category.id === categoryId);
        return category ? category.name : 'Unknown Type';
    };

    return (
        <PressableScale onPress={() => router.push({ pathname: '/storeItem/[id]', params: { storeId: storeId, id: item.id, name: item.name, description: item.description, price: item.price, imageUrl: item.imageUrl, isOpen, category: getCategoryName(item.categoryId) } }) as any} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1 }} className='border-[#0b0b0b]/5'>
            <View style={{ flex: 1 }}>
                <Text className='hidden'>{getCategoryName(item.categoryId)}</Text>
                <Text style={{ color: '#fffffc', fontSize: 16, marginTop: 2, fontFamily: "semibold" }}>{item.name}</Text>
                <Text className='text-[#fffffc] text-md' style={{ fontFamily: "semibold", marginTop: 4 }}>{item.price} <Text style={{ fontFamily: "medium" }} className='text-[#fffffc]/60 text-sm'>ден</Text></Text>
                <Text style={{ color: '#fffffc90', marginTop: 8, fontFamily: "medium" }}>{item.description}</Text>
            </View>
            <Image source={item.imageUrl} contentFit='contain' className='flex justify-center items-center bg-[#7577804C]/10 rounded-2xl overflow-hidden w-24 h-24' />

        </PressableScale>
    )
}

export default StoreItemCard