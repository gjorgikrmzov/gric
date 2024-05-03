import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';

const SplashComponent = () => {
    
    return (
        <View style={[styles.container]}>
            <Image
                source={require('../assets/images/splash.png')}
                style={styles.image}
                resizeMode="contain" 
            />
            
        </View>
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
