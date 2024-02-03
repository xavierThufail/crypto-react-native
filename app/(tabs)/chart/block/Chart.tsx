import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { Text, View } from '@/components/Themed';
import { CurrencyDetail } from '@/hooks';

const Chart = () => {
  const { setShowChartText, historyChart, setDisableScroll } = React.useContext(CurrencyDetail);

  const handleStartDrag = () => {
    setShowChartText(true);
    setDisableScroll(true);
  };

  const handleStopDrag = () => {
    setShowChartText(false);
    setDisableScroll(false);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.containerChart} >
        {historyChart.length > 0 ? (
          <CandlestickChart onTouchStart={handleStartDrag} height={230} width={Dimensions.get('window').width - 20}>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair
              onEnded={handleStopDrag}
              onCancelled={handleStopDrag}
              onFailed={handleStopDrag}
            />
          </CandlestickChart>
        ) : (
          <View style={{ height: 230, width: Dimensions.get('window').width - 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Chart History</Text>
          </View>
        )}
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
});

Chart.displayName = 'Chart';

export default Chart;
