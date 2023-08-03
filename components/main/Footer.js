import { useEffect, useState, useCallback } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';

const Footer = () => {
    const [profile, setProfile] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const responseUser = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const { user } = responseUser.data;
                setProfile(user);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__colums">
                    <div className="footer__info">
                        <div className="footer__info-logo">
                            <img
                                style={{
                                    width: 'auto',
                                    height: '36px',
                                    marginTop: '8px',
                                }}
                                src="/img/ctlogofooter.svg"
                                alt=""
                            />
                        </div>
                        <div className="footer__info-description">
                            Our exchange makes it simple to research the crypto
                            market, buy bitcoin and other cryptos, and build a
                            portfolio for the future of money.
                        </div>
                        <a className="footer__info-link" href="signup">
                            {' '}
                            Sign up{' '}
                        </a>
                        <br />
                        <br />
                        <br />
                    </div>

                    <div className="footer__links">
                        <div className="footer__link-box">
                            <div className="footer__link-title">Features</div>
                            <a
                                className="footer__link-ref"
                                href={`${
                                    profile ? 'profile/wallet' : 'signup'
                                }`}
                            >
                                Wallet
                            </a>
                            <a
                                className="footer__link-ref"
                                href={`${profile ? 'profile/swap' : 'signup'}`}
                            >
                                Exchange
                            </a>
                            <a
                                className="footer__link-ref"
                                href={`${
                                    profile ? 'profile/invest' : 'signup'
                                }`}
                            >
                                Staking
                            </a>
                            <a
                                className="footer__link-ref"
                                href={`${profile ? 'profile/p2p' : 'signup'}`}
                            >
                                P2P
                            </a>
                        </div>

                        <div className="footer__link-box">
                            <div className="footer__link-title">Legal</div>
                            <a
                                className="footer__link-ref"
                                href="../profile/support"
                            >
                                Support
                            </a>
                            <a
                                className="footer__link-ref"
                                href="../cookies-policy"
                            >
                                Cookies policy
                            </a>
                            <a className="footer__link-ref" href="../terms">
                                Terms of service
                            </a>
                            <a
                                className="footer__link-ref"
                                href="../aml-kyc-policy"
                            >
                                AML & KYC policy
                            </a>
                        </div>

                        <div className="footer__link-box">
                            <div className="footer__link-title">Exchange</div>
                            <a className="footer__link-ref" href="../signin">
                                BTC to USDT
                            </a>
                            <a className="footer__link-ref" href="../signin">
                                ETH to USDT
                            </a>
                            <a className="footer__link-ref" href="../signin">
                                LTC to USDT
                            </a>
                            <a className="footer__link-ref" href="../signin">
                                BNB to USDT
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="footer__sub">
        <div className="footer__sub-text">
          Cryptocurrencies and their derivatives are innovative financial products with great
          volatility and high investment risks. Although Coin Tranche is committed to providing users with
          easy-to-use trading tools, trading itself is still a highly sophisticated field. Trading
          digital assets and their derivatives are subject to high market risk and price volatility
          and may result in partial or total loss of account funds. You must carefully consider and
          exercise clear judgment to evaluate your financial situation and the aforementioned risks
          before using Coin Tranche Services. You shall be responsible for all losses arising therefrom.
          If necessary, please consult relevant professionals to make informed decisions before
          investing. By accessing, downloading, using or clicking on "I agree" to accept any Febdex
          Services provided by Coin Tranche, you agree that you have read, understood and accepted all of
          the terms and conditions stipulated in Coin Tranche Terms of Use as well as our Privacy Policy.
        </div>
      </div> */}
        </footer>
    );
};

export default Footer;
