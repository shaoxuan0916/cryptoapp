import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { CryptoStats } from '../services/cryptoApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrency from './Cryptocurrency'
import News from './News'

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = ({ }) => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats: CryptoStats = data?.data?.stats;


    return (
        <div>
            {
                isFetching

                    ?

                    <div>Loading...</div>

                    :

                    <div className='home'>
                        <h2>Global Crypto Stats</h2>

                        <div className='home-grid'>

                            <div className='home-statistic'>
                                <h5>Total Crytocurrencies</h5>
                                <p>{globalStats?.total}</p>
                                {/* <p>{globalStats?.total}</p> */}
                            </div>

                            <div className='home-statistic'>
                                <h5>Total Exchages</h5>
                                <p>{millify(globalStats?.totalExchanges)}</p>
                                {/* <p>{globalStats?.totalExchanges}</p> */}
                            </div>

                            <div className='home-statistic'>
                                <h5>Total Market Cap</h5>
                                <p>{`$${millify(+globalStats?.totalMarketCap)}`}</p>
                                {/* <p>{globalStats?.totalMarketCap}</p> */}
                            </div>

                            <div className='home-statistic'>
                                <h5>Total 24h Volume</h5>
                                <p>{`$${millify(+globalStats?.total24hVolume)}`}</p>
                                {/* <p>{globalStats?.total24hVolume}</p> */}
                            </div>

                            <div className='home-statistic'>
                                <h5>Total Markets</h5>
                                <p>{millify(globalStats?.totalMarkets)}</p>
                                {/* <p>{globalStats?.totalMarkets}</p> */}
                            </div>

                            <div className='home-statistic'>
                                <h5>Total Coins</h5>
                                <p>{globalStats?.totalCoins}</p>
                            </div>

                        </div>

                        <div className='home-heading-container'>
                            <h2>Top 10 Cryptocurrenceis in the world</h2>
                            <p><Link to='/cryptocurrency'>Show More</Link></p>
                        </div>

                        <Cryptocurrency simplified />

                        <div className='home-heading-container'>
                            <h2>Latest Crypto News</h2>
                            <p><Link to='/news'>Show More</Link></p>
                        </div>

                        <News simplified/>
                    </div>
            }
        </div>


    )
}

export default HomePage