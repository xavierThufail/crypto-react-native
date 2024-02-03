import React from 'react';
import { Text, View, TouchableOpacity, Modal as RNModal, StyleSheet } from 'react-native';

export type ModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ModalButton = ({ onRequestClose }: ModalProps) => (
  <TouchableOpacity onPress={onRequestClose} style={[styles.flexCentered, styles.buttonModal]}>
    <Text style={[styles.fontStandard, styles.bold, styles.whiteColor]}>{'OK, I understand'}</Text>
  </TouchableOpacity>
);

const ModalContent = ({ title, description }: ModalProps) => (
  <View style={[styles.flexCentered, styles.modalContent]}>
    {title && <Text style={[{ fontSize: 16 }, styles.bold]}>{title}</Text>}
    {description && <Text style={[styles.fontStandard, styles.textCenter]}>{description}</Text>}
  </View>
);

const ModalContainer = (props: ModalProps) => (
  <View style={[styles.flexCentered, styles.fullScreen]}>
    <View style={styles.containerModal}>
      {props.children}
      <ModalContent {...props} />
      <ModalButton {...props} />
    </View>
  </View>
);

const BackgroundTransparent = () => (
  <View style={styles.backgroundTransparent}/>
);

const Modal = (props: ModalProps) => {
  const { visible } = props;

  return (
    <React.Fragment>
      <RNModal
        transparent
        visible={visible}
        animationType='slide'
      >
        <ModalContainer {...props} />
      </RNModal>
      {visible && <BackgroundTransparent />}
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
    fontSize: 10,
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
  containerModal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  modalContent: {
    gap: 15,
    marginBottom: 15,
  },
  buttonModal: {
    backgroundColor: '#0B67F3',
    padding: 8,
    borderRadius: 6,
  },
  textCenter: {
    textAlign: 'center'
  },
  backgroundTransparent: { 
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
});

Modal.displayName = 'Modal';

export default Modal;
