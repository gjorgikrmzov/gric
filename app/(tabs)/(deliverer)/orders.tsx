import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#fffffc] px-6'>
      <Text>Orders</Text>
    </SafeAreaView>
  )
}

export default Page