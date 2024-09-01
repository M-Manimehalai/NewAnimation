import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, FlatList, Easing, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AnimatedCard from '../components/Animation';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const data = [
    {
        id: '1',
        carname: 'Jetta',
        cardescription: 'The compact sedan',
        image: require('../utilities/Images/jetta.png')
    },
    {
        id: '2',
        carname: 'Jetta GLI',
        cardescription: 'The performance sedan',
        image: require('../utilities/Images/JettaGLI.png')
    },
    {
        id: '3',
        carname: 'Passat',
        cardescription: 'The midsize sedan',
        image: require('../utilities/Images/passat(1).png')
    },
    {
        id: '4',
        carname: 'Arteon',
        cardescription: 'The premium sport sedan',
        image: require('../utilities/Images/Arteon.png')
    },
    {
        id: '5',
        carname: 'Tiguan',
        cardescription: 'The stylish SUV',
        image: require('../utilities/Images/Tiguan.png')
    },
    {
        id: '6',
        carname: 'Atlas Cross Sport',
        cardescription: 'The bold SUV',
        image: require('../utilities/Images/AtlasCrossSport.png')
    },
    {
        id: '7',
        carname: 'Jetta',
        cardescription: 'The compact sedan',
        image: require('../utilities/Images/jetta.png')
    },
    {
        id: '8',
        carname: 'Jetta GLI',
        cardescription: 'The performance sedan',
        image: require('../utilities/Images/JettaGLI.png')
    },
    {
        id: '9',
        carname: 'Passat',
        cardescription: 'The midsize sedan',
        image: require('../utilities/Images/passat(1).png')
    },
    {
        id: '10',
        carname: 'Arteon',
        cardescription: 'The premium sport sedan',
        image: require('../utilities/Images/Arteon.png')
    },
    {
        id: '11',
        carname: 'Tiguan',
        cardescription: 'The stylish SUV',
        image: require('../utilities/Images/Tiguan.png')
    },
    {
        id: '12',
        carname: 'Atlas Cross Sport',
        cardescription: 'The bold SUV',
        image: require('../utilities/Images/AtlasCrossSport.png')
    },
];

const CarList = () => {
    const navigation = useNavigation();
    const flatListRef = React.createRef();

    const animValues = data.map(() => ({
        scaleAnim: new Animated.Value(0),
        opacityAnim: new Animated.Value(1),
        heightAnim: new Animated.Value(120),
        textTranslateY: new Animated.Value(0),
        imageTranslateY: new Animated.Value(0),
        backgroundColorAnim: new Animated.Value(1), // New Animated.Value for background color
        textSizeAnim: new Animated.Value(1), // New Animated.Value for text size
    }));

    const handlePress = (index) => {
        Animated.parallel([
            ...animValues.map((anim, i) =>
                Animated.timing(anim.opacityAnim, {
                    toValue: i === index ? 1 : 0,
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                })
            ),
            Animated.timing(animValues[index].scaleAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(animValues[index].heightAnim, {
                toValue: 480, // Updated height for animation
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(animValues[index].textTranslateY, {
                toValue: -30,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(animValues[index].imageTranslateY, {
                toValue: 30,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(animValues[index].backgroundColorAnim, { // Animate background color to transparent
                toValue: 0, // 0 for transparent
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
            Animated.timing(animValues[index].textSizeAnim, { // Animate text size
                toValue: 1.5, // Increase text size by 50%
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }),
        ]).start(() => {
            flatListRef.current.scrollToIndex({
                index: index,
                animated: true,
                viewPosition: 0, // Scroll the selected item to the center of the view
            });
            navigation.navigate('carDetails', { cardetails: data[index] });
        });

        // Animate other cards to move up and out of view
        animValues.forEach((anim, i) => {
            if (i !== index) {
                Animated.parallel([
                    Animated.timing(anim.heightAnim, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.timing(anim.textTranslateY, {
                        toValue: -30,
                        duration: 100,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.timing(anim.imageTranslateY, {
                        toValue: 30,
                        duration: 200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.timing(anim.backgroundColorAnim, {
                        toValue: 1, // Reset background color to opaque
                        duration: 200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.timing(anim.textSizeAnim, { // Reset text size for other cards
                        toValue: 1,
                        duration: 200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                ]).start();
            }
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            animValues.forEach((anim) => {
                anim.opacityAnim.setValue(1);
                anim.scaleAnim.setValue(0);
                anim.heightAnim.setValue(120);
                anim.textTranslateY.setValue(0);
                anim.imageTranslateY.setValue(0);
                anim.backgroundColorAnim.setValue(1); // Reset background color
                anim.textSizeAnim.setValue(1); // Reset text size
            });
        }, [])
    );

    const renderItem = ({ item, index }) => (
        <AnimatedCard
            item={item}
            animValues={animValues[index]}
            index={index}
            handlePress={handlePress}
        />
    );

    return (
        <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%', padding: 5 }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 10
    },
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

export default CarList;
