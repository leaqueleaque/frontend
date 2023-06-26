import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const TableUser = () => {
  const [coinsData, setCoinsData] = useState({ coins: {}, equivalents: {} });
  const [searchValue, setSearchValue] = useState('');
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [imagesCoins, setImagesCoins] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      let ims = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/');
      const imgCoins = ims.data;
      setImagesCoins(imgCoins);
    };

    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;
        if (accessToken) {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const coinsData = response.data.balance;
          setCoinsData(coinsData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchImages();

    const intervalId = setInterval(() => {
      fetchData();
      fetchImages();
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);

  const cryptoDataArray = Object.keys(coinsData.coins).map((coinKey) => ({
    index: coinKey,
    own_price: coinsData.coins[coinKey],
    equivalent: coinsData.equivalents[`${coinKey}_equivalent`],
  }));

  const coinsWithoutUSD = cryptoDataArray.filter(coin => coin.index !== 'usd');

  const getImage = (idx) => {
    let coins = imagesCoins.filter(el => el.index.toLowerCase() === idx.toLowerCase())[0]
    let img = 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png'
    if (coins) {
      img = coins.image
    }
    return img
  }


  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
      <>
        <section className="userNavigation">
          <div className="userCard__container">
            <div className="userNavigation__box">
              <div className="userNavigation__search-box">
                <div className="userNavigation__search">
                  {/*{imagesCoins[0].id}*/}
                  <input
                      className="userNavigation__input"
                      type="text"
                      placeholder="Search"
                      id="search_currency"
                      value={searchValue}
                      onChange={handleSearchChange}
                  />
                </div>
                <div className="userNavigation__checkbox">
                  <label className="userNavigation__features-label" for="userNavigation-remember">
                    Hide zero balances
                    <input
                        className="userNavigation__features-checkbox"
                        type="checkbox"
                        id="userNavigation-remember"
                        checked={hideZeroBalances}
                        onChange={() => setHideZeroBalances(!hideZeroBalances)}
                    />
                    <span className="userNavigation__features-checkmark"></span>
                  </label>
                </div>
              </div>

              <div className="userNavigation__tabBtn-box">
                <a href="deposit">
                  <div className="userNavigation__tabBtn">Deposit</div>
                </a>
                <a href="withdraw">
                  <div className="userNavigation__tabBtn">Withdraw</div>
                </a>
                <a href="transfer">
                  <div className="userNavigation__tabBtn">Transfer</div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="tableUser">
          <div className="userCard__container">
            <div className="tableUser__box">
              <div className="tableUser__wrapper">
                <div className="tableUser__names">
                  <div className="tableUser__name tableUser__name-coin">Coin</div>
                  <div className="tableUser__name tableUser__name-balance">Balance</div>
                  <div className="tableUser__name tableUser__name-equivalent">Equivalent</div>
                </div>

                <div className="tableUser__items">
                  {coinsWithoutUSD
                      .filter((data) => !hideZeroBalances || parseFloat(data.own_price) !== 0)
                      .filter(
                          (data) =>
                              data.index.toLowerCase().includes(searchValue.toLowerCase()) ||
                              data.name.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .map((data) => (

                          <div className="tableUser__item" key={data.id}>
                            <div className="tableUser__item-coin">
                              <div className="tableUser__item-icon">
                                <img src={getImage(data.index)} alt={data.index} />
                                {/*image is {data.index} {imagesCoins[imagesCoins.indexOf()]}*/}
                                {/*image is {getImage(data.index)}*/}
                              </div>
                              {data.index.toUpperCase()}
                              <span>&nbsp;&nbsp;{data.name}</span>
                            </div>
                            <div className="tableUser__item-balance balance_amount_hide">
                              <span className="search_my_balance">{data.own_price}</span> {data.index.toUpperCase()}
                            </div>
                            <div
                                className="tableUser__item-balance click_hide_amount"
                                style={{ display: 'none' }}>
                              ********* {data.index.toUpperCase()}
                            </div>
                            <div className="tableUser__item-equivalent balance_usd_hide">{parseFloat(data.equivalent)} USD</div>

                          </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default TableUser;
