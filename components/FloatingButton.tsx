import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 
import AddTask from '../AddTaskScreen';

const FloatingButton = () => {
    const router = useRouter(); 
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current;

    const handlePress = () => {
        router.push('/AddTaskScreen'); // go to page indicated
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Animated.View
                    style={{
                        transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    }}
                    {...panResponder.panHandlers}>
                    <TouchableOpacity onPress={handlePress}>
                        <View style={styles.circle}>
                            <Text style={styles.plusSign}>+</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        height: 65, 
        width: 65, 
        backgroundColor: '#FFDB36',
        borderRadius: 32.5, // Half of height/width to make it a circle
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusSign: {
        fontSize: 35, 
        color: 'white', 
        fontWeight: 'ultralight',
    },
});

export default FloatingButton;
