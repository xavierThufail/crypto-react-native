import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { View } from '@/components/Themed';
import { CurrencyDetail } from '@/hooks';
import Header from './block/Header';
import Chart from './block/Chart';
import Content from './block/Content';
import ButtonTransaction from './block/ButtonTransaction';

const ChartSection = () => {
  const { disableScroll, historyChart } = React.useContext(CurrencyDetail);

  return (
    <View style={styles.container}>
      <CandlestickChart.Provider data={historyChart}>
        <ScrollView style={styles.containerScrollView} scrollEnabled={!disableScroll}>
          <Header />
          <Chart />
          <Content />
        </ScrollView>
        <ButtonTransaction />
      </CandlestickChart.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScrollView: {
    flex: 1,
    padding: 0,
    margin: 0,
    position: 'relative',
    paddingBottom: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

ChartSection.displayName = 'ChartSection';

export default ChartSection;
