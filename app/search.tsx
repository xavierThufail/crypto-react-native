import React from 'react';
import { StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';


import { Text, View } from '@/components/Themed';
import { CurrencyDetail } from '@/hooks';
import { Link, router } from 'expo-router';
import { CurrencyType } from '@/constants/types';

const useSearch = () => {
  const [value, setValue] = React.useState('');

  const { currencies, setSelectedCurrency } = React.useContext(CurrencyDetail);

  const filteredCurrencies = React.useMemo(() => {
    const valueLowerCase = value.toLowerCase();
    return currencies.filter((currency) =>
      currency.name?.toLowerCase().includes(valueLowerCase)
      || currency.symbol.toLowerCase().includes(valueLowerCase));
  }, [value, currencies]);

  const onCurrencySelect = (currency: CurrencyType) => () => {
    setSelectedCurrency(currency);
    router.replace('/');
  };

  return {
    value,
    setValue,
    filteredCurrencies,
    onCurrencySelect
  };
};

type HookResult = ReturnType<typeof useSearch>;

const Header = ({ value, setValue }: HookResult) => (
  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15, marginHorizontal: 15 }}>
    <View style={{ padding: 5, backgroundColor: '#f4f4f5', borderRadius: 8, flex: 1 }}>
      <TextInput value={value} onChangeText={setValue} style={{ borderWidth: 0 }} underlineColorAndroid="transparent" />
    </View>
    <Link href='/'>
      <Text style={{ fontWeight: 'bold', color: '#0a68f4' }}>Cancel</Text>
    </Link>
  </View>
);

const CurrencyOption = ({ symbol, name, url_logo }: CurrencyType) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f4f4f5', borderStyle: 'solid', paddingHorizontal: 15, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      <SvgUri 
        uri={url_logo}
        width={32}
        height={32}
        color={'black'}
      />
      <Text style={{ fontSize: 16 }}>{name}</Text>
    </View>
    <Text style={{ fontSize: 16, color: '#87898c' }}>{symbol}</Text>
  </View>
)

const CurrencyList = ({ filteredCurrencies, onCurrencySelect }: HookResult) => (
  <ScrollView>
    {filteredCurrencies.map((currency) => (
      <TouchableOpacity key={currency.symbol} onPress={onCurrencySelect(currency)}>
        <CurrencyOption {...currency} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default function SearchScreen() {
  const hook = useSearch();

  return (
    <View style={styles.container}>
      <Header {...hook} />
      <CurrencyList {...hook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
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
