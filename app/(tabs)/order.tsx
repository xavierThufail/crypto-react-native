import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

const OrderSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Under Maintenance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

OrderSection.displayName = 'OrderSection';

export default OrderSection;
