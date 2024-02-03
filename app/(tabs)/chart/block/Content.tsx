import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';


import Modal from '@/components/Modal';
import { useModal, ModalHookProps, CurrencyDetail, CurrencyTypeResult } from '@/hooks';


const ModalMinimunTransaction = (props: ModalHookProps & CurrencyTypeResult) => {
  const { visible, closeModal, selectedCurrency } = props;

  return (
    <Modal
      title={`You don't have to buy 1 ${selectedCurrency?.name} at once`}
      description={`Get a fraction of 1 ${selectedCurrency?.name} starting from $1`}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: 'https://images.squarespace-cdn.com/content/v1/53bc0878e4b0f9fe5b575998/1484249047325-9PUBACMA7GY7HLEGHBKT/image-asset.png' }} style={{ width: 150, height: 150 }} />
      </View>
    </Modal>
  );
};

const QuestionIcon = () => (
  <View style={[styles.flexCentered, styles.containerHelp]}>
    <Text style={[styles.fontSmall, styles.whiteColor, styles.bold]}>?</Text>
  </View>
);

const ButtonMinimunTransaction = (props: CurrencyTypeResult & ModalHookProps) => {
  const { selectedCurrency, openModal } = props;

  return (
    <TouchableOpacity onPress={openModal} style={[styles.minimunTransaction, styles.divideBoderColor, styles.secondaryBackgroundColor]}>
      <Text style={styles.fontStandard}>{`${selectedCurrency?.name} minimum transaction `}</Text>
      <Text style={[styles.fontStandard, styles.bold]}>{`$ 1`}</Text>
      <QuestionIcon />
    </TouchableOpacity>
  );
};

const Button = ({ children }: { children: React.ReactNode }) => (
  <TouchableOpacity style={[styles.divideBoderColor, { padding: 10, borderRadius: 6, borderWidth: 1, borderStyle: 'solid', flex: 1 }]}>
    {children}
  </TouchableOpacity>
);

const Content = () => {
  const modalHook = useModal();
  const hook = React.useContext(CurrencyDetail)

  return (
    <React.Fragment>
      <View style={{ paddingBottom: 100 }}>
        <ButtonMinimunTransaction {...hook} {...modalHook} />
        <View style={{ padding: 20, display: 'flex', flexDirection: 'row', gap: 20 }}>
          <Button>
            <Text style={[{ fontSize: 14 }]}>{'Auto DCA'}</Text>
          </Button>
          <Button>
            <Text style={[{ fontSize: 14 }]}>{'Price Alert'}</Text>
          </Button>
        </View>
        <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row' }}>
          <Button>
            <View style={[styles.flexRowSpaceBetweenAlignCenter]}>
              <Text style={[{ fontSize: 14 }]}>{`${hook.selectedCurrency?.name} Balance`}</Text>
              <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Text style={[styles.bold, { fontSize: 16 }]}>{hook.selectedCurrency?.name}</Text>
                <Text style={[styles.fontStandard, styles.colorSecondary]}>{hook.selectedCurrency?.name}</Text>
              </View>
            </View>
          </Button>
        </View>
      </View>
      <ModalMinimunTransaction {...hook} {...modalHook} />
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
  containerPercentage: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
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
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    position: 'relative',
  },
  minimunTransaction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    gap: 5,
  },
  containerHelp: {
    backgroundColor: 'grey',
    borderRadius: 99999,
    width: 15,
    height: 15,
  },
});

Content.displayName = 'Content';

export default Content;
