export type FetchAPIType = <TResponse>(url: string, config?: RequestInit) => Promise<TResponse>;

export type CurrencyType = {
  id: string;
  symbol: string;
  base_currency: string;
  traded_currency: string;
  traded_currency_unit: string;
  description: string;
  ticker_id: string;
  volume_precision: number;
  price_precision: number;
  price_round: number;
  pricescale: number;
  trade_min_base_currency: number;
  trade_min_traded_currency: number;
  has_memo: boolean;
  memo_name: boolean;
  trade_fee_percent: 0.2;
  trade_fee_percent_taker: 0.2;
  trade_fee_percent_maker: 0.1;
  url_logo: string;
  url_logo_png: string;
  is_maintenance: number;
  is_market_suspended: number;
  coingecko_id: string;
  cmc_id: number;
  name?: string;
};

export type TickerType = {
  high: string;
  low: string;
  vol_btc: string;
  vol_idr: string;
  last: string;
  buy: string;
  sell: string;
  server_time: number;
  median: number;
};

export type FetchSupportedCurrenciesResponse = CurrencyType[];
export type FetchTickerCurrencyResponse = {
  ticker: TickerType;
};

export type CurrencyItem = {
  name: string;
  symbol: string;
  logo: string;
};