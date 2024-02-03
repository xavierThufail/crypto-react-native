import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CandlestickChart, TPriceType } from 'react-native-wagmi-charts';

import { HEADER } from '@/constants/common';
import Modal from '@/components/Modal';
import { useModal, ModalHookProps, CurrencyDetail } from '@/hooks';

export type HeaderProps = {
  price: string;
  percentage: string;
  currencyName: string;
};

const ModalLabel = () => (
  <View style={styles.flexRowSpaceBetweenAlignCenter}>
    <Text style={styles.fontSmall}>{HEADER.MODAL.LABEL.SELL_PRICE}</Text>
    <Text style={[styles.fontSmall, styles.bold]}>{HEADER.MODAL.LABEL.MID_PRICE}</Text>
    <Text style={styles.fontSmall}>{HEADER.MODAL.LABEL.BUY_PRICE}</Text>
  </View>
);

const ModalLine = () => (
  <View style={[styles.flexRowSpaceBetweenAlignCenter, styles.containerLine]}>
    <View style={styles.horizontalLine} />
    <View style={[styles.verticalLine, styles.verticalLineBorder]} />
    <View style={[styles.verticalLine, styles.verticalLineCenter]} />
    <View style={[styles.verticalLine, styles.verticalLineBorder]} />
  </View>
);

const ModalHelp = (props: ModalHookProps) => {
  const { visible, closeModal } = props;

  return (
    <Modal
      title={HEADER.MODAL.CONTENT.TITLE}
      description={HEADER.MODAL.CONTENT.DESCRIPTION}
      visible={visible}
      onRequestClose={closeModal}
    >
      <ModalLabel />
      <ModalLine />
    </Modal>
  );
};

const HeaderPrice = (props: HeaderProps) => (
  <View>
    <Text style={[styles.fontSmall, styles.colorSecondary]}>{`${props.currencyName} ${HEADER.PRICE}`}</Text>
    <View style={styles.containerPrice}>
      <Text style={[styles.fontHeadline, styles.bold]}>{props.price}</Text>
    </View>
  </View>
);

const QuestionIcon = () => (
  <View style={[styles.flexCentered, styles.containerHelp]}>
    <Text style={[styles.blueColor, styles.bold]}>?</Text>
  </View>
);

const HeaderContent = (props: HeaderProps & ModalHookProps) => {
  const { openModal, ...restProps } = props;

  return (
    <TouchableOpacity onPress={openModal} style={[styles.flexRowSpaceBetweenAlignCenter, styles.containerHeader, { marginBottom: 8 }]}>
      <HeaderPrice {...restProps} />
      <QuestionIcon />
    </TouchableOpacity>
  );
};

const CandleStickText = ({ text }: { text: TPriceType }) => {
  const formatAmount = ({ value }: { value: string }) => {
    'worklet';
    return `Rp ${value}`;
  };

  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      <Text style={[styles.textChart, styles.bold, { width: 40 }]}>{`${text}`}</Text>
      <CandlestickChart.PriceText type={text} style={styles.textChart} format={formatAmount} />
    </View>
  );
};

const HeaderChartText = () => {
  return (
    <View style={[styles.containerHeader, { flexDirection: 'column' }]}>
      <CandlestickChart.DatetimeText style={styles.textChart} />
      <View style={[styles.flexRowSpaceBetweenAlignCenter]}>
        <View style={{ alignItems: 'flex-start' }}>
          <CandleStickText text="open" />
          <CandleStickText text="close" />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <CandleStickText text="high" />
          <CandleStickText text="low" />
        </View>
      </View>
    </View>
  );
};

const Loading = () => (
  <View style={[styles.containerHeader, { flexDirection: 'column' }]}>
    <Text style={[styles.fontSmall, styles.colorSecondary]}></Text>
    <View style={styles.containerPrice}>
      <Text style={[styles.fontHeadline, styles.bold]}>Please wait</Text>
    </View>
  </View>
);

const Header = () => {
  const modalHook = useModal();
  const { showChartText, tickerCurrency, getCurrencyAmount, selectedCurrency, loadingPrice } = React.useContext(CurrencyDetail);

  if (loadingPrice) {
    return <Loading />;
  };

  if (!selectedCurrency || !tickerCurrency) {
    return null;
  }

  return (
    <React.Fragment>
      {!showChartText && (
        <HeaderContent
          currencyName={selectedCurrency.name!}
          price={getCurrencyAmount()}
          percentage='10'
          {...modalHook}
        />
      )}
      {showChartText && <HeaderChartText /> }
      <ModalHelp {...modalHook} />
    </React.Fragment>
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
});

Header.displayName = 'Header';

export default Header;
