import React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { Text, View } from '@/components/Themed';
import { CurrencyDetail } from '@/hooks';

const Chart = () => {
  const { setShowChartText, historyChart, setDisableScroll, loadingHistoryChart } = React.useContext(CurrencyDetail);

  const handleStartDrag = () => {
    setShowChartText(true);
    setDisableScroll(true);
  };

  const handleStopDrag = () => {
    setShowChartText(false);
    setDisableScroll(false);
  };

  if (loadingHistoryChart) {
    return (
      <View style={styles.containerChart} >
        <View style={styles.containerContent}>
          <ActivityIndicator />
        </View>
      </View>
    );
  };

  if (historyChart.length === 0) {
    return (
      <View style={styles.containerChart} >
        <View style={styles.containerContent}>
          <Text>No Chart History</Text>
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.containerChart} >
        <CandlestickChart onTouchStart={handleStartDrag} height={230} width={Dimensions.get('window').width - 20}>
          <CandlestickChart.Candles />
          <CandlestickChart.Crosshair
            onEnded={handleStopDrag}
            onCancelled={handleStopDrag}
            onFailed={handleStopDrag}
          />
        </CandlestickChart>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  containerChart: {
    marginHorizontal: 10
  },
  toolTip: {
    backgroundColor: 'transparent'
  },
  containerContent: {
    height: 230,
    width: Dimensions.get('window').width - 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Chart.displayName = 'Chart';

export default Chart;
