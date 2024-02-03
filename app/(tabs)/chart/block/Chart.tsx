import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { Text, View } from '@/components/Themed';
import { CurrencyDetail, useChartHistory } from '@/hooks';

const Chart = () => {
  const { history } = useChartHistory();
  const { setShowChartText } = React.useContext(CurrencyDetail);

  return (
    <GestureHandlerRootView>
      <View style={styles.containerChart} >
        {history.length > 0 ? (
          <CandlestickChart onTouchStart={() => setShowChartText(true)} height={230} width={Dimensions.get('window').width - 20}>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair
              onEnded={() => setShowChartText(false)}
              onCancelled={() => setShowChartText(false)}
              onFailed={() => setShowChartText(false)}
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
