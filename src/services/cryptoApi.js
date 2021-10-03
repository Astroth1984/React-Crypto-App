import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '432c269fbdmsh7c72ae7eb72699fp1d21eejsnaaa62de14d34'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/stats',
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': '432c269fbdmsh7c72ae7eb72699fp1d21eejsnaaa62de14d34'
//     }
//   };

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        })
    })
});

export const {
    // the name of the hook, should have -use- and -Query- limiting the name of the webservice GET
    useGetCryptosQuery,
} = cryptoApi;