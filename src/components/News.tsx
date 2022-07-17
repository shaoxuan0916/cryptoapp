import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CryptoNews, useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { CryptoCoins, useGetCryptosQuery } from '../services/cryptoApi'

interface NewsProps {
  simplified?: boolean
}

const noImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News: React.FC<NewsProps> = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('cryptocurrency')

  const { data: cryptosList, isFetching: isCryptosFetching } = useGetCryptosQuery(100)
  const { data: cryptoNews, isFetching: isNewsFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 18
  })


  return (
    <>
      {
        (isNewsFetching || !cryptoNews?.value)

          ?

          <div>Loading...</div>

          :


          <div>
            {
              !simplified && (
                <label htmlFor="crypto-select" >
                  <select
                    id='crypto-select'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setNewsCategory(e.target.value)
                    }}
                  >
                    <option>-- Select a Crypto --</option>

                    {cryptosList.data.coins.map((crypto: CryptoCoins) => (
                      <option key={crypto.name} value={crypto.name}>{crypto.name}</option>
                    ))}

                  </select>
                </label>
              )
            }

            <div className='news-container'>
              {cryptoNews?.value.map((news: CryptoNews) => (


                <a key={news.name} href={news.url} target='_blank' rel='noreferrer'>
                  <div className="news-card-item">

                    <div className='news-card-item-title'>
                      <h3>{news.name.length > 80 ? `${news.description.substring(0, 80)}...` : news.name}</h3>
                      <img src={news?.image?.thumbnail?.contentUrl || noImage} />
                    </div>

                    <p>{news.description.length > 150 ? `${news.description.substring(0, 150)}...` : news.description}</p>

                    <div className='news-card-bottom'>
                      <div className='news-provider'>
                        <img className='provider-avatar' src={news?.provider[0]?.image?.thumbnail?.contentUrl || noImage} />
                        <p>{news.provider[0].name}</p>
                      </div>

                      <p>{moment(news.datePublished).startOf('h').fromNow()}</p>
                    </div>
                  </div>
                </a>

              ))}



            </div>
          </div>

      }
    </>
  )
}

export default News