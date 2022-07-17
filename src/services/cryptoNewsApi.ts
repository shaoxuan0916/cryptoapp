import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CryptoNews {
    name: string;
    description: string;
    url: string;
    image?: { thumbnail?: { contentUrl?: string } }
    provider: Array<{ name: string, image?: { thumbnail?: { contentUrl?: string } } }>
    datePublished: string;
}

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
}

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-news-search1.p.rapidapi.com' }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi