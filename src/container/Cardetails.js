import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Animated, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
    { id: '1', color: '#343854' },
    { id: '2', color: '#a98415' },
    { id: '3', color: '#ff6348' },
    { id: '4', color: '#1c5c4a' },
    { id: '5', color: '#ffd600' },
    { id: '6', color: '#FFDDC1' },
    { id: '7', color: '#FFABAB' },
    { id: '8', color: '#FFC3A0' },
    { id: '9', color: '#B9FBC0' },
    { id: '10', color: '#C0E0FF' },
];

const CarDetails = (props) => {
    const carDetails = props.route.params.cardetails;
    const flatListAnim = useRef(new Animated.Value(300)).current; // Start position off-screen to the right

    useEffect(() => {
        // Animate the FlatList to slide in from the right
        Animated.timing(flatListAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [flatListAnim]);

    const renderItem = ({ item }) => (
        <View style={[styles.box, { backgroundColor: item.color }]}>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.8, padding: 10 }}>
                    <Text style={styles.carName}>{carDetails.carname}</Text>
                    <Text style={styles.carDescription}>{carDetails.cardescription}</Text>
                </View>
                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center' }} onPress={() => { props.navigation.navigate('carList') }}>
                    <AntDesign name="close" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={carDetails.image}
                    resizeMode='cover'
                    style={styles.imageStyle}
                ></Image>
            </View>
            <View style={{ flex: 0.5, marginTop: '30%', }}>
                <Animated.View
                    style={[styles.flatListContainer, {
                        transform: [{ translateX: flatListAnim }],
                    }]}
                >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false} // Hide scroll indicator
                    />
                </Animated.View>
                <Animated.View style={{ flexDirection: 'row', flex: 0.15, alignItems: 'center', padding: 15, backgroundColor: '#FFFFFF', transform: [{ translateX: flatListAnim }] }}>
                    <Text style={styles.bottomText}>Get a free service</Text>
                    <AntDesign style={{ flex: 0.5, textAlign: 'right' }} name="arrowright" size={25} color="black" />
                </Animated.View>
                <Animated.View style={{ flexDirection: 'row', flex: 0.15, alignItems: 'center', padding: 15, backgroundColor: '#FFFFFF', transform: [{ translateX: flatListAnim }] }}>
                    <Text style={styles.bottomText}>Save 10% and buy now!</Text>
                    {/* <Text style={{ flex: 0.5, textAlign: 'right' }}>hi</Text> */}
                    <AntDesign style={{ flex: 0.5, textAlign: 'right' }} name="arrowright" size={25} color="black" />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'fle-start',
        backgroundColor: '#FFFFFF',
    },
    box: {
        marginTop: '30%',
        width: 70, // Width of each box
        height: 70, // Height of each box to make it square
        marginHorizontal: 5, // Spacing between boxes
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        borderRadius: 15
    },
    bottomText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        flex: 0.5,
        textAlign: 'left'
    },
    flatListContainer: {
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        marginLeft : 5
    },
    text: {
        color: 'white', // Text color
        fontSize: 16, // Text size
    },
    imageStyle: {
        width: '170%',
        height: '180%',
        marginLeft: '10%'
    },
    carName: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    greetingText: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    imageContainer: {
        flex: 0.3,
    },
    carDescription: {
        paddingVertical: 2,
        color: 'black',
        fontSize: 17,
        fontWeight: '300'
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});

export default CarDetails;