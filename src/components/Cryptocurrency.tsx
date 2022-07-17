import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { CryptoCoins, useGetCryptosQuery } from '../services/cryptoApi'

interface CryptocurrencyProps {
  simplified ?: boolean
}

const Cryptocurrency: React.FC<CryptocurrencyProps> = ({ simplified }) => {

  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState<Array<CryptoCoins>>([])
  const [searchInput, setSearchInput] = useState('')


  useEffect(() => {

    setCryptos(cryptosList?.data?.coins ?? [])

    const filteredData = cryptosList?.data?.coins.filter((coin: CryptoCoins) => coin?.name.toLowerCase().includes(searchInput.toLowerCase()))

    setCryptos(filteredData)

  }, [cryptosList, searchInput])

  return (

    <>

      {
        isFetching

          ?

          <div>Loading...</div>

          :


          <div>

            {
              !simplified

              &&

              <div className='search-crypto'>
                <input
                  placeholder='Search Cryptocurrency . . .'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            }


            <div className='crypto-card-container'>

              {cryptos?.map((crypto) => (

                <Link to={`/crypto/${crypto.uuid}`} key={crypto.uuid}>
                  <div className='crypto-card-item' >
                    <div className='crypto-card-item-title'>
                      <h3>{crypto.rank}. {crypto.name}</h3>
                      <img src={crypto.iconUrl} />
                    </div>

                    <p>Price: { crypto.price}</p>
                    <p>Market Cap: {millify(parseInt(crypto.marketCap), { precision: 2 })}</p>
                    <p>Daily Change: {crypto.change}</p>

                  </div>
                </Link>

              ))}
            </div>
          </div>
      }

    </>
  )
}

export default Cryptocurrency