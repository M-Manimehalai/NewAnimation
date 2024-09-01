import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CarList from '../container/Container'
import CarDetails from '../container/Cardetails'

const stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}  >
                <stack.Screen name='carList' component={CarList}></stack.Screen>
                <stack.Screen name='carDetails' component={CarDetails} ></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;