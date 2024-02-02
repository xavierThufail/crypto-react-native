export type FetchAPIType = <TResponse>(url: string, config?: RequestInit) => Promise<TResponse>;

export type WalletType = {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  blockchainName: string;
  logo: string;
};

export type CurrencyType = {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: WalletType[];
};

export type FetchSupportedCurrenciesResponse = {
  code: string;
  message: string;
  payload: CurrencyType[]
};

export type CurrencyItem = {
  name: string;
  symbol: string;
  logo: string;
};