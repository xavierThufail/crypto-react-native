import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ChartSection from './chart';
import OrderSection from './order';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

const CurrencyDetail = React.createContext('');

export default function TabLayout() {
  return (
    <React.Fragment>
      <View style={{ height: StatusBar.currentHeight }}>
        <SafeAreaView>
          <StatusBar translucent />
        </SafeAreaView>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link href={'/search'}>
          <Text>Bitcoin</Text>
        </Link>
      </View>
      <CurrencyDetail.Provider value={'Bitcoin'}>
        <Tab.Navigator>
          <Tab.Screen name="Chart" component={ChartSection} />
          <Tab.Screen name="ORDER NIH" component={OrderSection} />
        </Tab.Navigator>
      </CurrencyDetail.Provider>
    </React.Fragment>
      /* <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chart NIH',
            tabBarIcon: undefined,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: 'Order',
            tabBarIcon: undefined,
          }}
        />
      </Tabs> */
  );
};
