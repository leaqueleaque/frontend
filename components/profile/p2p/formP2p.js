import {useEffect, useState} from 'react';
import {PopupVerif} from "@/components/profile/wallet/PopupVerif";
import {PopupGoogle2FA} from "@/components/profile/wallet/PopupGoogle2FA";
import axios from 'axios';
import { parseCookies } from 'nookies';
import {PopupVerifP2P} from "@/components/profile/wallet/PopupVerifP2P";

const FormP2p = () => {
  const payments = [
    'All payment methods',
    'PayPal',
    'Revolut',
    'Wise',
    'Zen',
    'Advcash',
    'Perfect Money',
    'Payeer',
    'Skrill',
    'Neteller',
    'Bank Transfer',
    'Card to Card',
    'Webmoney',
    'Cash App',
    'AirTM',
    'Alipay',
    'Zelle',
    'Western Union',
    'Money Gram',
    'Gift card',
  ];
  const currenciess = [
    { code: 'BTC', name: 'Bitcoin', imgSrc: '/img/bitcoin.svg' },
    { code: 'ETH', name: 'Ethereum', imgSrc: '/img/Ethereum.svg' },
    { code: 'USDT', name: 'Tether', imgSrc: '/img/USDT.svg' },
    { code: 'LTC', name: 'Litecoin', imgSrc: '/img/LTC.svg' },
  ];
  const fiat = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
  ]
  const [coinActive, setCoinActive] = useState(false);
  const [listActive, setListActive] = useState(false);
  const [labelActive, setLabelActive] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const [fiatActive, setFiatActive] = useState(false);
  const [fiatListActive, setFiatListActive] = useState(false);
  const [fiatLabelActive, setFiatLabelActive] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState('USD');

  const [paymentActive, setPaymentActive] = useState(false);
  const [paymentListActive, setPaymentListActive] = useState(false);
  const [paymentLabelActive, setPaymentLabelActive] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('All payment methods');

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPositive, setIsPositive] = useState(false);

  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [wrapper, setWrapper] = useState(false)

  function mobileWrapperOpen() {
    wrapper ? setWrapper(false) : setWrapper(true)
  }
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
          const { user } = response.data;
          setProfile(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCoinClick = () => {
    if (coinActive && listActive) {
      setCoinActive(false);
      setListActive(false);
    } else {
      setCoinActive(true);
      setListActive(true);
      setLabelActive(false);
    }
  };

  const handleCoinBlur = () => {
    setLabelActive(false);
  }

  const handleInputClick = () => {
    setCoinActive(false);
    setListActive(false);
    setLabelActive(true);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCoin(currency);
    setCoinActive(false);
    setListActive(false);
  };

  const handleFiatClick = () => {
    if (fiatActive && fiatListActive) {
      setFiatActive(false);
      setFiatListActive(false);
    } else {
      setFiatActive(true);
      setFiatListActive(true);
      setFiatLabelActive(false);
    }
  };

  const handleFiatBlur = () => {
    setFiatLabelActive(false);
  }

  const handleFiatInputClick = () => {
    setFiatActive(false);
    setFiatListActive(false);
    setFiatLabelActive(true);
  };

  const handleFiatSelect = (fiat) => {
    setSelectedFiat(fiat);
    setFiatActive(false);
    setFiatListActive(false);
  }

  const handlePaymentClick = () => {
    if (paymentActive && paymentListActive) {
      setPaymentActive(false);
      setPaymentListActive(false);
    } else {
      setPaymentActive(true);
      setPaymentListActive(true);
      setPaymentLabelActive(false);
    }
  };

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
    setPaymentActive(false);
    setPaymentListActive(false);
  }

  const handleCloseClick = () => {
    setIsPositive(false);
  };

  const handleCloseClickPopup = () => {
    setPopupVisible(false);
  };

  const handleEnableClick = () => {
    setPopupVisible(true);
    setIsPositive(false)
  };

  const openWallet = () => {
    if (!profile.is_verified) {
      setErrorMessage('You must complete KYC verification and have on your balance: 1000 USDT, which will guarantee safe transactions for other traders.')
      setIsPositive(true)
    } else {
      setErrorMessage('This is necessary to guarantee safe trading for Leaque platform and other traders.')
      setIsPositive(true)
    }
  }

  return (
      <>
    <div className="formP2p">
      <div className="formP2p__top-btn-box">
        <div className="formP2p__top-btn left" onClick={openWallet}>BUY</div>
        <div className="formP2p__top-btn right active" onClick={openWallet}>SELL</div>
      </div>

      <div className="formP2p__mobile-btn" onClick={mobileWrapperOpen}>
        <svg width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h16v3.674l-5.818 5.333v6.743L5.818 18V9.007L0 3.674V0Z" fill="#fff"></path>
        </svg>
      </div>

      <div className={wrapper ? 'formP2p__form active' : 'formP2p__form'}>
        <div className={wrapper ? 'formP2p__form active' : 'formP2p__form'}>
          <div className="formP2p__mobile-filter">Filter</div>
          <div className="formP2p__mobile-close">
            <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.584 6.999.876 11.708l1.414 1.414 4.708-4.709 4.709 4.71 1.414-1.415-4.708-4.709 5.291-5.292L12.29.293 6.998 5.585 1.708.293.292 1.707 5.584 7Z"
                fill="currentColor"></path>
            </svg>
          </div>

          <div className="formP2p__currency input-field s6">
            <input id="coin-one-id" type="text" className="validate" onClick={handleInputClick} onBlur={handleCoinBlur}
            placeholder={`Amount ${selectedCoin}`}/>
            <div
              className={`formP2p__coin coin-one ${coinActive ? 'active' : ''}`}
              onClick={handleCoinClick}>
              {selectedCoin}
            </div>
            <div className={`formP2p__currency-list list-coin-one ${listActive ? 'active' : ''}`}>
              <div className="formP2p__coin-items coin-items-one">
                {currenciess.map((currency, index) => (
                  <div
                    className={`formP2p__currency-item ${selectedCoin === currency.code ? 'active' : ''
                      }`}
                    key={index}
                    onClick={() => handleCurrencySelect(currency.code)}>
                    <img className="formP2p__currency-img" src={currency.imgSrc} alt="" />
                    <div className="">
                      <span className="formP2p__currency-sub">{currency.code}</span>
                      <span className="formP2p__currency-title">&nbsp;&nbsp;{currency.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="formP2p__currency input-field s6">
            <input id="coin-one-id" type="text" className="validate" onClick={handleInputClick} onBlur={handleCoinBlur}
                   placeholder={`Amount ${selectedFiat}`}/>
            <div
              className={`formP2p__coin coin-two ${fiatActive ? 'active' : ''}`}
              onClick={handleFiatClick}>
              {selectedFiat}
            </div>
            <div className={`formP2p__currency-list list-coin-two ${fiatListActive ? 'active' : ''}`}>
              <div className="formP2p__coin-items coin-items-two">
                {fiat.map((fiat, index) => (
                  <div
                    className={`formP2p__currency-item ${selectedFiat === fiat.code ? 'active' : ''
                      }`}
                    key={index}
                    onClick={() => handleFiatSelect(fiat.code)}>
                    <div className="">
                      <span className="formP2p__currency-sub">{fiat.code}</span>
                      <span className="formP2p__currency-title">&nbsp;&nbsp;{fiat.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="formP2p__currency input-field s6">
            <div
              className="formP2p__coin coin-three"
              onClick={handlePaymentClick}
            >{selectedPayment}</div>
            <div className={`formP2p__currency-list list-coin-three ${paymentListActive ? 'active' : ''}`}>
              <div className="formP2p__coin-items coin-items-three">
                {payments.map((payment, index) => (
                  <div className="formP2p__currency-item" key={index}
                    onClick={() => handlePaymentSelect(payment)}>
                    <div className="">
                      <span className="formP2p__currency-sub">{payment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="formP2p__verification">
            <div className="formP2p__title">Verified users</div>
            <div className="formP2p__des">Show ads of verified traders only</div>
            <div className="switch">
              <label>
                <input type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
          </div>

          <div className="formP2p__verification">
            <div className="formP2p__title">Active users</div>
            <div className="formP2p__des">Show ads of traders who are online only</div>
            <div className="switch">
              <label>
                <input type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
          </div>

          <button className="formP2p__btn" onClick={openWallet}>
            Search
          </button>
        </div>
      </div>
    </div>

  {isPositive && (<PopupVerifP2P
      handleCloseClick={handleCloseClick}
      errorMessage={errorMessage}
      onClick={handleEnableClick}
      isVerif={!!profile.is_verified}
      />
  )}


  {isPopupVisible && (
      <PopupGoogle2FA onclick={handleCloseClickPopup}/>
  )}
  </>
  );
};

export default FormP2p;
