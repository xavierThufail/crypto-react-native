import React from "react";

import { streamIndodaxUrl, urlHistoryChart, urlSupportedCurrencies, urlTickerCurrency } from "@/constants/endpoints";
import { CurrencyType, FetchSupportedCurrenciesResponse, FetchTickerCurrencyResponse, TickerType } from "@/constants/types";
import { fetchAPI } from "@/utils";

const defaultValue = {
  currencies: [],
  historyChart: [],
  selectedCurrency: null,
  setSelectedCurrency: () => {},
  disableScroll: false,
  setDisableScroll: () => {},
  showChartText: false,
  setShowChartText: () => {},
  tickerCurrency: null,
  setTickerCurrency: () => {},
  getCurrencyAmount: () => '',
  triggerRefetch: () => {},
  loadingCurrencies: false,
  loadingHistoryChart: false,
  loadingPrice: false,
};

export const CurrencyDetail = React.createContext<ReturnType<typeof useCurrency>>(defaultValue);
export type CurrencyTypeResult = ReturnType<typeof useCurrency>;

const useGetSuportedCurrency = () => {
  const [currencies, setCurrencies] = React.useState<CurrencyType[]>([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState<CurrencyType | null>(null);
  const [loadingCurrencies, setLoadingCurrencies] = React.useState(false);

  React.useEffect(() => {
    setLoadingCurrencies(true);
    fetchAPI<FetchSupportedCurrenciesResponse>(urlSupportedCurrencies)
      .then((response) => {
        const newCurrencies = response.slice(0, 50).map((item) =>
          ({ ...item, name: item.coingecko_id
            ? item.coingecko_id[0].toUpperCase() + item.coingecko_id.slice(1)
            : item.traded_currency_unit }));

        setCurrencies(newCurrencies);
        setSelectedCurrency(newCurrencies[0]);
      })
      .catch((error) => console.warn(error))
      .finally(() => setLoadingCurrencies(false));
  }, []);

  return {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    loadingCurrencies,
  };
};

type GetSupportedCurrencyResult = ReturnType<typeof useGetSuportedCurrency>;

const useChartHistory = ({ selectedCurrency }: GetSupportedCurrencyResult) => {
  const [historyChart, setHistoryChart] = React.useState<CandleStickChart[]>([]);
  const [loadingHistoryChart, setLoadingHistoryChart] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);

  React.useEffect(() => {
    if (!selectedCurrency) return;

    if (!refetch && historyChart.length > 0) return;

    setLoadingHistoryChart(true);

    fetchAPI<number>('https://pintu-proxy.vercel.app/time')
      .then((response) => {
        return response;
      })
      .then(timestamp => {
        const today = Math.floor(timestamp / 1000);
        const startDate = today - 86400;

        const url = urlHistoryChart + `?symbol=${selectedCurrency.symbol}&tf=30&from=${startDate}&to=${today}`;

        return fetchAPI<ResponseHistoryChart>(url);
      })
      .then((response) => {
        setHistoryChart(response.map(item => ({
          timestamp: item.Time * 1000,
          close: item.Close,
          open: item.Open,
          high: item.High,
          low: item.Low,
        })));
      })
      .catch((error) => console.warn(error))
      .finally(() => setLoadingHistoryChart(false));
  }, [selectedCurrency, refetch]);

  const triggerRefetch = () => {
    setRefetch(true);
  };

  return {
    historyChart,
    triggerRefetch,
    loadingHistoryChart,
  };
};

type GetHistoryChartResult = ReturnType<typeof useChartHistory>;

const useGetPriceCurrency = ({ selectedCurrency, historyChart, triggerRefetch }: GetSupportedCurrencyResult & GetHistoryChartResult) => {
  const [tickerCurrency, setTickerCurrency] = React.useState<TickerType | null>(null);
  const [loadingPrice, setLoadingPrice] = React.useState(false);
  const [channel, setChannel] = React.useState('');

  const ws = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    if (!selectedCurrency) return;

    const newChannel = `chart:tick-${selectedCurrency.symbol.toLowerCase()}`;

    if (ws.current && channel !== newChannel) {
      ws.current.send(JSON.stringify({
        method: 2,
        params: {
          channel
        },
        id: 3
      }));
      ws.current.close();
    };

    if (!ws.current) {
      ws.current = new WebSocket(streamIndodaxUrl);
    }

    ws.current.onopen = (e) => {
      ws.current?.send(JSON.stringify({
        params: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo'
        },
        id: 1
      }));
      ws.current?.send(JSON.stringify({
        method: 1,
        params: {
          channel: newChannel
        },
        id: 2
      }));
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const ticks = data?.result?.data?.data;

      if (tickerCurrency && ticks && ticks.length > 0) {
        const median = ticks[ticks.length - 1][2];
        const server_time = ticks[ticks.length - 1][0] * 1000;

        setTickerCurrency({ ...tickerCurrency, median, server_time });
      }
    }

    const wsCurrent = ws.current;

    setChannel(newChannel);

    setLoadingPrice(true);

    fetchAPI<FetchTickerCurrencyResponse>(urlTickerCurrency + `/${selectedCurrency.symbol.toLowerCase()}`)
      .then((response) => {
        const { ticker } = response;

        ticker.median = (Number(ticker.buy) + Number(ticker.sell)) / 2;
        ticker.server_time = ticker.server_time * 1000;

        setTickerCurrency(ticker);
      })
      .catch((error) => console.warn(error))
      .finally(() => setLoadingPrice(false));

    return () => {
      wsCurrent.close();
    };

  }, [selectedCurrency]);

  const getCurrencyAmount = () => {
    if (!tickerCurrency) return '';

    return tickerCurrency.median.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  if (historyChart.length > 0 && tickerCurrency) {
    const lastHistory = historyChart[historyChart.length - 1];
    const difference = tickerCurrency.server_time - lastHistory.timestamp;

    if (difference >= 1800000) {
      triggerRefetch();
    }
  }

  return {
    tickerCurrency,
    getCurrencyAmount,
    loadingPrice,
  };
};

export const useCurrency = () => {
  const [disableScroll, setDisableScroll] = React.useState(false);
  const [showChartText, setShowChartText] = React.useState(false);

  const supportedCurrencyHook = useGetSuportedCurrency();
  const chartHistoryHook = useChartHistory(supportedCurrencyHook);
  const priceCurrencyHook = useGetPriceCurrency({ ...supportedCurrencyHook, ...chartHistoryHook });

  return {
    ...supportedCurrencyHook,
    ...chartHistoryHook,
    ...priceCurrencyHook,
    disableScroll,
    showChartText,
    setShowChartText,
    setDisableScroll,
  };
};

export const useModal = () => {
  const [visible, setVisible] = React.useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return {
    visible,
    openModal,
    closeModal,
  };
};

export type ModalHookProps = ReturnType<typeof useModal>;

const binanceSocket = new WebSocket(streamIndodaxUrl);

type CandleStick = {
  Time: number;
  Close: number;
  Open: number;
  High: number;
  Low: number;
  Volume: string;
};

type ResponseHistoryChart = CandleStick[];

type CandleStickChart = {
  timestamp: number;
  close: number;
  open: number;
  high: number;
  low: number;
};
