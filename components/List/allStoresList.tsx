import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/reduxStore'
import StoreCard from '../Cards/storeCard'

const StoresList = () => {

    const { stores } = useSelector((state: RootState) => state.store)
    
    return (
        <FlatList
            data={stores}
            scrollEnabled={false}
            className='px-6 pb-4'
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StoreCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 6,
                backgroundColor: '#FFFFFC',
            }}
        />
    )
}

export default StoresList