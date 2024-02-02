import React from "react";

import { urlSupportedCurrencies } from "@/constants/endpoints";
import { CurrencyItem, FetchSupportedCurrenciesResponse } from "@/constants/types";
import { fetchAPI } from "@/utils";

const defaultValue = {
  currencies: [],
  selectedCurrency: null,
  setSelectedCurrency: () => {},
};

export const CurrencyDetail = React.createContext<ReturnType<typeof useCurrency>>(defaultValue);

export const useCurrency = () => {
  const [currencies, setCurrencies] = React.useState<CurrencyItem[]>([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState<CurrencyItem | null>(null);

  React.useEffect(() => {
    fetchAPI<FetchSupportedCurrenciesResponse>(urlSupportedCurrencies)
      .then((response) => {
        const newCurrencies: CurrencyItem[] = response.payload.slice(1).map(
          (currency) => ({ name: currency.name, symbol: `${currency.currencySymbol}IDRT`, logo: currency.logo}));

        setCurrencies(newCurrencies);
        setSelectedCurrency(newCurrencies[0]);
      }).catch((error) => console.error(error));
  }, []);

  return {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
  };
};
