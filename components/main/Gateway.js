import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Chart} from "@/components/main/Chart";
import {ChartMin} from "@/components/main/ChartMin";

const Gateway = () => {
  const [coins, setCoins] = useState([]);
  const [mainCoins, setMainCoins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/');
        setCoins(response.data)
        const selectedCoins = response.data.filter(coin => {
          const targetCoins = ['Bitcoin', 'Ethereum', 'Tether', 'BNB', 'Litecoin', 'USD Coin', 'Solana'];
          return targetCoins.includes(coin.name);
        });
        setMainCoins(selectedCoins)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();


  }, []);

  return (
    <section className="gateway">
      <div className="gateway__container">
        <div className="gateway__title">World class trading platform</div>
        <div className="gateway__description">
          We rank top among first tier exchanges with the highest number of listed crypto
        </div>

        <div className="gateway__table">
          <div className="gateway__table-items">
            {mainCoins.map(({ id, name, index, price, increase, image, url = '/profile/swap' }) => (
              <div className="gateway__table-item" key={id}>
                <div className="gateway__table-number">{id}</div>
                <div className="gateway__table-name">
                  <img src={image} alt="" style={{width: '48px', height: '48px'}} />
                  <div>
                    {name}
                    <span>{index}</span>
                  </div>
                </div>
                <div className="gateway__table-price">${parseFloat(price).toFixed(2)} </div>
                <div className={increase < 0 ? "gateway__table-change gateway__table-change-minus" : "gateway__table-change gateway__table-change-plus"}>
                  {increase}%
                </div>
                <div className="gateway__table-chart">
                  <ChartMin positive={increase < 0 ? false : true}/>
                </div>
                <div className="gateway__table-trade">
                  <a className="gateway__table-trade-link" href={url}>
                    Trade
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gateway;
