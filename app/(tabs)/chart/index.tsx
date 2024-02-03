import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { View } from '@/components/Themed';
import { CurrencyDetail, useChartHistory } from '@/hooks';
import Header from './block/Header';
import Chart from './block/Chart';
import Content from './block/Content';

const ChartSection = () => {
  const { history } = useChartHistory();
  const { disableScroll } = React.useContext(CurrencyDetail);

  return (
    <View style={styles.container}>
      <CandlestickChart.Provider data={history}>
        <ScrollView style={styles.containerScrollView} scrollEnabled={!disableScroll}>
          <Header />
          <Chart />
          <Content />
        </ScrollView>
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
    backgroundColor: 'pink'
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
