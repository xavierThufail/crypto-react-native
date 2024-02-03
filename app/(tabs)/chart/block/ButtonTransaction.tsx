import { CurrencyDetail } from '@/hooks';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const ButtonTransaction = () => {
  const hook = React.useContext(CurrencyDetail);

  const formatStringToCurrency = (value?: string) => {
    if (!value) return 'Rp 0';

    return Number(value).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  return (
      <View style={styles.containerButtonTransaction}>
        <View style={styles.containerOrder}>
          <Text style={[styles.fontStandard, styles.bold]} >{formatStringToCurrency(hook.tickerCurrency?.buy)}</Text>
          <TouchableOpacity style={[styles.flexCentered, styles.button, { backgroundColor: '#0a68f4' }]}>
            <Text style={[styles.bold, styles.whiteColor, styles.fontStandard]}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerOrder}>
          <Text style={[styles.fontStandard, styles.bold]} >{formatStringToCurrency(hook.tickerCurrency?.sell)}</Text>
          <TouchableOpacity style={[styles.flexCentered, styles.button, { backgroundColor: '#e54040' }]}>
            <Text style={[styles.bold, styles.whiteColor, styles.fontStandard]}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
  blueColor: {
    color: '#0B67F3',
  },
  whiteColor: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  weight500: {
    fontWeight: '500',
  },
  colorSecondary: {
    color: '#929396',
  },
  fontHeadline: {
    fontSize: 24,
    lineHeight: 26,
  },
  fontSmall: {
    fontSize: 12,
    lineHeight: 14,
  },
  fontStandard: {
    fontSize: 14,
    lineHeight: 16,
  },
  flexRowSpaceBetweenAlignCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: { 
    width: '100%',
    height: '100%',
  },
  divideBoderColor: {
    borderColor: '#E4E7EB',
  },
  secondaryBackgroundColor: {
    backgroundColor: '#F2F2F2',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: 4,
    marginTop: -4
  },
  red: {
    borderTopColor: '#E4403F',
    borderTopWidth: 5,
  },
  green: {
    borderBottomColor: '#25a764',
    borderBottomWidth: 5,
  },
  containerHelp: {
    backgroundColor: '#ECF4FE',
    borderRadius: 99999,
    width: 20,
    height: 20,
  },
  containerHeader: {
    padding: 10,
    width: '100%',
  },
  containerPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  containerModal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  containerLine: {
    paddingHorizontal: 15,
    position: 'relative',
    paddingVertical: 10,
  },
  horizontalLine: {
    position: 'absolute',
    // @ts-ignore
    top: 'calc(50% - 5px)',
    left: 15,
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(189, 230, 209, 1)',
  },
  verticalLine: {
    width: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(189, 230, 209, 1)',
  },
  verticalLineCenter: {
    height: 40,
  },
  verticalLineBorder: {
    height: 20,
  },
  modalContent: {
    gap: 10,
    marginBottom: 10,
  },
  buttonModal: {
    backgroundColor: '#0B67F3',
    padding: 8,
    borderRadius: 6,
  },
  textCenter: {
    textAlign: 'center'
  },
  textChart: {
    fontSize: 14,
    lineHeight: 16,
    margin: 0,
    padding: 0,
    height: 16,
  },
  containerButtonTransaction: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    gap: 20,
  },
  containerOrder: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    padding: 10,
    width: '100%',
    borderRadius: 6,
  },
});

ButtonTransaction.displayName = 'ButtonTransaction';

export default ButtonTransaction;
