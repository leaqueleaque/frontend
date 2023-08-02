import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { PopupVerif } from '@/components/profile/wallet/PopupVerif';
import P2p_error_modal from '@/components/profile/wallet/p2p_error_modal';
import { PopupVerifP2P } from '@/components/profile/wallet/PopupVerifP2P';

const P2p_trade = () => {
    const [traders, setTraders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPositive, setIsPositive] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const accessToken = cookies.accessToken;

                if (accessToken) {
                    const response = await axios.get(
                        process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
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

    const handleEnableClick = () => {
        setIsPositive(true); // При клике на кнопку "Enable" делаем попап видимым
    };
    const handleCloseClick = () => {
        setIsPositive(false); // При клике на кнопку "Close" скрываем попап
    };
    const openp2p = () => {
        if (!profile.is_verified) {
            setErrorMessage(
                'You must complete KYC verification and have on your balance: 1000 USDT, which will guarantee safe transactions for other traders.'
            );
            setIsPositive(true);
        } else {
            setErrorMessage(
                'This is necessary to guarantee safe trading for Coin Tranche platform and other traders.'
            );

            setIsPositive(true);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/p2p/'
                );
                setTraders(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p2p__trade-list">
            {isPositive && (
                <PopupVerifP2P
                    handleCloseClick={handleCloseClick}
                    isVerif={!!profile.is_verified}
                    errorMessage={errorMessage}
                />
            )}

            <div className="p2p__item-box p2p__item-title">
                <div className="p2p__list-title p2p__trader">Trader</div>
                <div className="p2p__list-title">Payment method</div>
                <div className="p2p__list-title">Price</div>
                <div className="p2p__list-title">Limits</div>
                <div className="p2p__list-title"></div>
            </div>

            {traders.map(
                ({
                    id,
                    payment,
                    price,
                    limits,
                    currency,
                    username,
                    subinfo,
                    status,
                    avatar,
                    is_verified,
                }) => (
                    <div className="p2p__item-box">
                        <div className="p2p__user">
                            <img
                                className="p2p__user-img"
                                src={avatar}
                                alt=""
                            />
                            <div className="p2p__user-name-box">
                                <div className="p2p__user-name">
                                    {username}
                                    <img
                                        src={
                                            is_verified === 'verified'
                                                ? '/img/verif_p2p.png'
                                                : ''
                                        }
                                        style={{
                                            height: '16px',
                                            position: 'absolute',
                                            marginTop: '-3px',
                                            marginLeft: '6px',
                                        }}
                                    />
                                </div>
                                <div className="p2p__user-orders">
                                    {subinfo}
                                </div>
                                <div className="p2p__user-status">{status}</div>
                            </div>
                        </div>
                        <div className="p2p__list-title p2p__limits">
                            {' '}
                            <span>Payment method</span> {payment}
                        </div>
                        <div className="p2p__list-title p2p__price">
                            <span>Price</span>
                            {parseFloat(price).toFixed(2)} {currency}
                        </div>
                        <div className="p2p__list-title p2p__limits">
                            <span>Limits</span>
                            {limits}
                        </div>
                        <div className="p2p__list-title" onClick={openp2p}>
                            <a className="p2p__btn" href="#">
                                Sell BTC
                            </a>
                        </div>
                    </div>
                )
            )}
            <ul className="pagination">
                {/*<div*/}
                {/*  onClick={openp2p}*/}
                {/*  style={{*/}
                {/*    padding: '14px',*/}
                {/*    width: '200px',*/}
                {/*    textAlign: 'center',*/}
                {/*    borderRadius: '10px',*/}
                {/*    cursor: 'pointer',*/}
                {/*    background: '#333e66',*/}
                {/*  }}>*/}
                {/*  <p style={{ display: 'inline-block', color: '#d9d9d9' }}>Load 15 more traders</p>*/}
                {/*</div>*/}
            </ul>
        </div>
    );
};

export default P2p_trade;
