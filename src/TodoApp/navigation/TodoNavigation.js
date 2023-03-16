import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActiveTab from '../ActiveTab';
import CompletedTab from '../CompletedTab';
import TabNavigator from '../TodoBottomTabs/TabNavigator';

const TodoStack = createNativeStackNavigator()

export class TodoNavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <TodoStack.Navigator
                    initialRouteName='AllTab'
                    screenOptions={{
                        headerShown: false
                    }}>

                    <TodoStack.Screen name='AllTab' component={TabNavigator} />
                    <TodoStack.Screen name='Active' component={ActiveTab} />
                    <TodoStack.Screen name='Completed' component={CompletedTab} />
                </TodoStack.Navigator>
            </NavigationContainer>
        )
    }
}

export default TodoNavigation