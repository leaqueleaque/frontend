import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Toy from "@/components/auth/TOOL";

const Transfer__container = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [activeCoin, setActiveCoin] = useState(null);
  const [coinListActive, setCoinListActive] = useState(false);
  const [amount, setAmount] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [showToast, setShowToast] = useState(false)
  const [toyMessage, setToyMessage] = useState('')
  const [positiveToast, setPositiveToast] = useState(false)


  useEffect(() => {
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
          const { user, balance } = response.data;
          setProfile(user);
          setBalance(balance.coins);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);а
  }, []);

  useEffect(() => {
    let timeout

    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }

    return () => clearTimeout(timeout)
  }, [showToast])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/');
        setCoinsData(response.data);

        if (response.data.length > 0) {
          setActiveCoin(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCoinClick = (coin) => {
    setActiveCoin((prevCoin) => (prevCoin === coin ? prevCoin : coin));
    setCoinListActive(!coinListActive);
  };

  const handleTransfer = async () => {
    try {
      const cookies = parseCookies();
      const accessToken = cookies.accessToken;

      if (accessToken) {
        const response = await axios.post(
          'https://leaque.com/api/transactions/transfer/',
          {
            currency: activeCoin ? activeCoin.index : '',
            email: receiverEmail,
            amount: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.data.KeyError && !response.data.Error) {
          setToyMessage(response.data.status)
          setPositiveToast(true)
          setShowToast(true)
        } else {
          setPositiveToast(false)
          setToyMessage(response.data.KeyError || response.data.Error)
          setShowToast(true)
        }
        console.log(toyMessage)
      }
    } catch (error) {
      console.error(error);
    }

    setAmount('')
    setReceiverEmail('')
  };
  const handleBalanceClick = () => {
    const balanceValue = balance && balance[activeCoin?.index.toLowerCase()];
    setAmount(balanceValue || 0);
  };
  const handleKeyPress = (event) => {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  };
  return (
      <>
      <Toy visible={showToast} message={toyMessage} positive={positiveToast} />
    <div className="transfer__container">
      <div className="transfer__box">
        <div className="transfer__info">
          <div className="transfer__title">Transfer funds</div>
          <div className="transfer__description">Internal transfers between users</div>
        </div>

        <div className="transfer__you">
          <div className="transfer__send">
            <div className="transfer__send-container">
              <div className="transfer__send-title">Select coin</div>
              <div
                className={`transfer__send-select transfer-select${
                  coinListActive ? ' active' : ''
                }`}
                onClick={() => setCoinListActive(!coinListActive)}>
                <img className="transfer-img" src={activeCoin ? activeCoin.image : ''} alt="" />
                <span className="transfer__select-name transfer-title">
                  {activeCoin ? activeCoin.index : ''}
                </span>
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 8L0.937823 0.5L13.0622 0.499999L7 8Z" fill="#FFFFFF"></path>
                </svg>
              </div>

              {coinListActive && (
                <div className="transferForm__currency-list list-coin-one active">
                  <div className="transferForm__coin-items coin-items-one active">
                    {coinsData.map((coin) => (
                      <div
                        className={`transfer__currency-item transfer__send-select transfer-select${
                          activeCoin === coin ? ' active' : ''
                        }`}
                        key={coin.id}
                        onClick={() => handleCoinClick(coin)}>
                        <img className="transferForm__currency-img" src={coin.image} alt="" />
                        <div className="transferForm__currency-content">
                          <div className="transferForm__currency-sub">
                            {coin.index}&nbsp;&nbsp;
                            <span className="transferForm__currency-title">{coin.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="transfer__send-title">You transfer</div>
          <div className="transfer__send-input">
            <input
              type="number"
              placeholder="Enter amount"
              id="amount_input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={handleKeyPress}
              min={0}
            />
          </div>
          <div className="transfer__send-available">
            Available:{' '}
            <span id="my_available_balance" onClick={handleBalanceClick}>
              {balance && balance[activeCoin?.index.toLowerCase()]} {' '}
            </span>
            <span id="my_available_crypto" onClick={handleBalanceClick}>
              {activeCoin ? activeCoin.index : 'BTC'}
            </span>
          </div>
        </div>
      </div>

      <div className="transfer__receivers">
        <div className="transfer__receivers-title">Receiver's Email</div>
        <div className="transfer__receivers-input">
          <input
            id="transfer_email"
            type="text"
            placeholder="Please enter user Email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
        </div>

      </div>

      <div className="transfer__link-container">
        <a
          style={{ textDecoration: 'none', color: 'white' }}
          className="transfer__link"
          href="#"
          onClick={handleTransfer}>
          Transfer funds
        </a>
      </div>
    </div>
      </>
  );
};

export default Transfer__container;
