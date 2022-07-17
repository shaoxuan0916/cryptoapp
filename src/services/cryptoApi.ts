import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CryptoStats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
}

export interface CryptoCoins {
    uuid: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconUrl: string;
    price: string;
    btcPrice: string;
    listedAt: number;
    change: string;
    rank: number;
    twoFourHVolume: string
    marketCap: string
    links: Array<{ name: string; type: string; url: string; }>;
    "24hVolume": string;
    allTimeHigh: { price: string };
    numberOfMarkets: string;
    numberOfExchanges: string;
    supply: { total: string; circulating: string; confirmed: boolean }
  }

const cryptoApiHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com' }),
    endpoints: (builder) => ({

        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),

        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),

        getCoinHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/?timePeriod=${timePeriod}`)
        })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;