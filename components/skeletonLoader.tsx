import React from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import Colors from '../constants/Colors';

const SkeletonLoader = () => (
  <View style={{ padding: 20 }}>
    <ContentLoader
      speed={2}
      width={300}
      height={160}
      viewBox="0 0 300 160"
      backgroundColor={Colors.white}
      foregroundColor={Colors.dark}
    >
      <Rect x="0" y="0" rx="10" ry="10" width="300" height="120" />
      <Rect x="0" y="130" rx="5" ry="5" width="200" height="20" />
    </ContentLoader>
  </View>
);

export default SkeletonLoader;
