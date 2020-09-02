import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';



function App() {
  const [ coins, setCoins ] = useState([]);
  const [ search, setSearch ] = useState('');
  const handleChange = e => {
    setSearch(e.target.value)
  }
  // fillter coins and display whatever user type in
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      // axiois.get으로 받아온 데이터를 setCoins에 넣는다.
      setCoins(res.data); // res: response 임의지정한 키워드.
      console.log(res.data)
    })
    .catch(error => console.log(error))
  }, []);

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input 
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return(
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        )
      })}
    </div>
  );
}

export default App;
