import React, { Component } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllTab from '../AllTab';
import ActiveTab from '../ActiveTab';
import CompletedTab from '../CompletedTab';

const Tab = createBottomTabNavigator()

export class TabNavigator extends Component {
  render() {
      return (
          <Tab.Navigator
              screenOptions={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  tabBarStyle: {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      elevation: 10,
                      backgroundColor: "#fff",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      height: 80,
                  }
              }}>
              <Tab.Screen name='AllTab' component={AllTab} options={{
                  tabBarShowLabel: true,
              }} />
              <Tab.Screen name='Active' component={ActiveTab} options={{
                  tabBarShowLabel: true,
              }} />
              <Tab.Screen name='Completed' component={CompletedTab} options={{
                  tabBarShowLabel: true,
              }} />
          </Tab.Navigator>
      )
  }
}

export default TabNavigator