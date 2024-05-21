import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CardSkeleton from '../SkeletonPlaceholder'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/reduxStore'

const SkeletonList = () => {
    const { stores } = useSelector((state: RootState) => state.store)


    return (
        <FlatList
            data={stores}
            scrollEnabled={false}
            className='px-6 pb-4'
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <CardSkeleton />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 6,
                backgroundColor: '#0b0b0b',
            }}
        />
    )
}

export default SkeletonList