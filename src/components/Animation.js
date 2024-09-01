import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const AnimatedCard = ({
    item,
    animValues,
    index,
    handlePress
}) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => handlePress(index)}>
            <Animated.View
                style={[
                    styles.card,
                    {
                        opacity: animValues.opacityAnim,
                        height: animValues.heightAnim,
                        backgroundColor: animValues.backgroundColorAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['rgba(227, 232, 241, 0)', '#e3e8f1'], // Transparent to original color
                        }),
                    },
                ]}
            >
                <Animated.View style={styles.textContainer}>
                    <Animated.Text
                        style={[
                            styles.carName,
                            {
                                fontSize: animValues.textSizeAnim.interpolate({
                                    inputRange: [1, 1],
                                    outputRange: [20, 30], // Adjust these values as needed
                                }),
                            },
                        ]}
                    >
                        {item.carname}
                    </Animated.Text>
                    <Text style={styles.carDescription}>{item.cardescription}</Text>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.imageContainer,
                        {
                            transform: [{ translateY: animValues.imageTranslateY }],
                        },
                    ]}
                >
                    <Animated.Image
                        source={item.image}
                        style={[
                            styles.image,
                            {
                                transform: [
                                    {
                                        scale: animValues.scaleAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 2],
                                        }),
                                    },
                                    {
                                        translateX: animValues.scaleAnim.interpolate({
                                            inputRange: [0, 5],
                                            outputRange: [0, -screenWidth / 2],
                                        }),
                                    },
                                    {
                                        translateY: animValues.scaleAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -10], // Move image up by 50 units (increase negative value for more upward movement)
                                        }),
                                    },
                                ],
                                zIndex: animValues.scaleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            },
                        ]}
                        resizeMode='contain'
                    />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 2,
        borderRadius: 10,
        padding: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        position: 'relative',
    },
    carName: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    carDescription: {
        paddingVertical: 5,
        color: 'black',
        fontSize: 14,
        fontWeight: '300',
    },
    textContainer: {
        padding: 10,
        flex: 1.5,
    },
    imageContainer: {
        flex: 0.8,
        justifyContent: 'center',
    },
    image: {
        width: '180%',
        height: '190%',
    },
});

export default AnimatedCard;
