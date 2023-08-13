import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
  'X-RapidAPI-Key': '7ba651679amsh9773138efe8f531p1b591ajsn448c7e418784',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
       
      getCryptoHistory: builder.query({
        query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
      }),

      getExchanges: builder.query({
        query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges`),
      }),
    }),
});

export const {
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;



// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/exchanges',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       limit: '50',
//       offset: '0',
//       orderBy: '24hVolume',
//       orderDirection: 'desc'
//     },
//     headers: {
//       'X-RapidAPI-Key': '7ba651679amsh9773138efe8f531p1b591ajsn448c7e418784',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };