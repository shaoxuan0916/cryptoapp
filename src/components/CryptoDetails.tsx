import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import millify from 'millify'
import { useParams } from 'react-router-dom'
import { CryptoCoins, useGetCoinHistoryQuery, useGetCryptoDetailsQuery } from '../services/cryptoApi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { AiOutlineNumber, AiOutlineFund, AiOutlineTrophy, AiOutlineStop, AiOutlineCheck, AiOutlineExclamationCircle, AiOutlineMoneyCollect } from 'react-icons/ai'
import { BsLightning } from 'react-icons/bs'
import LineChart from './LineChart'

interface CryptoDetailsProps {

}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ }) => {

  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('3h')
  const [coinHistory, setCoinHistory] = useState(null)
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistoryData, refetch } = useGetCoinHistoryQuery({ coinId, timePeriod })
  const cryptoDetails: CryptoCoins = data?.data?.coin

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

  // fetch coin history data into chart 
  useEffect(() => {

    setCoinHistory(coinHistoryData)

  }, [timePeriod, coinHistoryData])

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price}`,
      icon: <RiMoneyDollarCircleLine />
    },
    {
      title: 'Rank',
      value: cryptoDetails?.rank,
      icon: <AiOutlineNumber />
    },
    {
      title: '24h Volume',
      value: cryptoDetails?.['24hVolume'],
      icon: <BsLightning />
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails?.marketCap}`,
      icon: <RiMoneyDollarCircleLine />
    },
    {
      title: 'All-time-high (daily avg.)',
      value: `$ ${cryptoDetails?.allTimeHigh?.price}`,
      icon: <AiOutlineTrophy />
    }
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />
    },
    {
      title: 'Approved Supply',
      value: cryptoDetails?.supply?.confirmed ? <AiOutlineCheck /> : <AiOutlineStop />,
      icon: <AiOutlineExclamationCircle />
    },
    {
      title: 'Total Supply',
      value: `$ ${cryptoDetails?.supply?.total}`,
      icon: <AiOutlineExclamationCircle />
    },
    {
      title: 'Circulating Supply',
      value: `$ ${cryptoDetails?.supply?.circulating}`,
      icon: <AiOutlineExclamationCircle />
    },
  ]

  return (
    <div className='crypto-details'>

      <div className='crypto-details-title'>
        <h2>{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price</h2>
        <p>{cryptoDetails?.name} live price in US dollars. View value stattistics, market cap and supply.</p>
      </div>

      <select
        className="select-timeperiod"
        id=""
        placeholder='Select time period'
        onChange={e => setTimePeriod(e.target.value)}
      >
        {time.map(time => (
          <option key={time}>{time}</option>
        ))}
      </select>

      {/* Stats Chart */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={cryptoDetails?.price}
        coinName={cryptoDetails?.name}
      />

      <div className='stats-container'>

        {/* Coin Stats */}
        <div className='coin-value-statistic'>

          <h3>{cryptoDetails?.name} Value Statistics</h3>
          <p>An overview showing the stats of {cryptoDetails?.name}</p>

          {stats.map(({ title, icon, value }) => (
            <div key={title} className='stats'>

              <div>
                <span className='stats-icon'>{icon}</span>
                <span >{title}</span>
              </div>

              <span className='stats-value'>{value}</span>
            </div>
          ))}

        </div>

        {/* Other Stats */}
        <div className='coin-value-statistic'>

          <h3>Other Stats Info</h3>
          <p>Other statistics of {cryptoDetails?.name}.</p>

          {genericStats?.map(({ title, icon, value }) => (
            <div key={title} className='stats'>
              <div>
                <span className='stats-icon'>{icon}</span>
                <span >{title}</span>
              </div>

              <span className='stats-value'>{value}</span>
            </div>
          ))}

        </div>

        {/* Coin Descriptions */}

        <div className='coin-desc'>
          <h3>What is {cryptoDetails?.name}</h3>
          {parse(`${cryptoDetails?.description}`)}
        </div>

        {/* Links */}
        <div className='coin-links'>

          <h3>{cryptoDetails?.name} Links</h3>

          {cryptoDetails?.links.map(link => (
            <div key={link.name} className='coin-link'>
              <span>{link.type}</span>
              <a href={link.url} target='_blank'>{link.name}</a>
            </div>
          ))}

        </div>

      </div>






    </div>
  )
}

export default CryptoDetails