import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';

import ChartSection from './chart';
import OrderSection from './order';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { CurrencyDetail } from '@/hooks';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const { selectedCurrency } = React.useContext(CurrencyDetail);

  return (
    <React.Fragment>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Link href={'/search'}>
          <Text>{selectedCurrency?.name}</Text>
        </Link>
        <Entypo name="chevron-small-down" size={24} color="black" />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Chart" component={ChartSection} />
        <Tab.Screen name="Order" component={OrderSection} />
      </Tab.Navigator>
    </React.Fragment>
  );
};
