import { View, Text, Pressable, Easing, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const PressAnimation = ({ children }: { children: React.ReactNode }) => {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handleButtonPress = () => {
    Animated.timing(animatedScale, {
      toValue: 0.95,
      easing: Easing.circle,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedScale, {
        toValue: 1,
        easing: Easing.circle,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View
    className='flex-1'
    style={{
      transform: [{ scaleX: animatedScale }, { scaleY: animatedScale }],
    }}
  >
    <TouchableOpacity onPress={handleButtonPress}>
      {children}
    </TouchableOpacity>
  </Animated.View>
  );
};

export default PressAnimation;
