import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Entypo } from '@expo/vector-icons';

import ChartSection from './chart';
import OrderSection from './order';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { CurrencyDetail } from '@/hooks';

const Tab = createMaterialTopTabNavigator();

const TabCurrency = ({ name }: { name: string }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <Link href={'/search'}>
      <Text>{name}</Text>
    </Link>
    <Entypo name="chevron-small-down" size={24} color="black" />
  </View>
);

const Loading = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);

export default function TabLayout() {
  const { selectedCurrency, loadingCurrencies } = React.useContext(CurrencyDetail);

  return (
    <React.Fragment>
      {!loadingCurrencies && selectedCurrency && (<TabCurrency name={selectedCurrency.name!} />)}
      {loadingCurrencies && <Loading />}
      <Tab.Navigator screenOptions={{ swipeEnabled: false }}>
        <Tab.Screen name="Chart" component={ChartSection} />
        <Tab.Screen name="Order" component={OrderSection} />
      </Tab.Navigator>
    </React.Fragment>
  );
};
