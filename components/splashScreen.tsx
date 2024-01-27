import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';

const SplashComponent = () => {
    const [appLoaded, setAppLoaded] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Simulate app loading time (you may replace this with actual loading logic)
        setTimeout(() => {
            // Set appLoaded to true to trigger fade-out animation
            setAppLoaded(true);
        }, 2000); // Adjust the duration to simulate loading time
    }, []);

    useEffect(() => {
        // Fade-out animation when the app is loaded
        if (appLoaded) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 900, // Adjust the duration as needed
                useNativeDriver: true,
            }).start();
        }
    }, [appLoaded, fadeAnim]);
    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('../assets/images/splash.png')}
                style={styles.image}
                resizeMode="contain" 
                onLoad={() => setAppLoaded(true)}// Adjust the resizeMode as needed
            />
            
            {/* Add any other content for your splash screen */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Change to your preferred background color
    },
    image: {
        width: '100%', // Adjust the width as needed
        height: '100%', // Adjust the height as needed
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000', // Change to your preferred text color
    },
});



export default SplashComponent;
