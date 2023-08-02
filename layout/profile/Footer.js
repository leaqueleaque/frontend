const Footer = () => {
    return (
        <div className="bottom section-padding">
            <div className="container">
                <div className="row">
                    <div
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                        style={{ textAlign: 'center' }}
                    >
                        <div className="bottom-logo">
                            <a className="navbar-logo-vn" href="/">
                                <img
                                    src="/img/ctlogo.svg"
                                    style={{
                                        width: 'auto',
                                        height: '40px',
                                        marginTop: '-8px',
                                    }}
                                />
                                <p>
                                    Coin Tranche is the safest platform
                                    <br />
                                    for building a crypto portfolio
                                </p>
                            </a>

                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
                        <div className="bottom-widget">
                            <h4 className="widget-title">Features</h4>
                            <ul>
                                <li>
                                    <a href="/profile/wallet">Wallet</a>
                                </li>
                                <li>
                                    <a href="/profile/swap">Exchange</a>
                                </li>
                                <li>
                                    <a href="/profile/invest">Staking</a>
                                </li>
                                <li>
                                    <a href="/profile/p2p">P2P</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
                        <div className="bottom-widget">
                            <h4 className="widget-title">Legal</h4>
                            <ul>
                                <li>
                                    <a href="/profile/support">Support</a>
                                </li>
                                <li>
                                    <a href="/cookies-policy">Cookies policy</a>
                                </li>
                                <li>
                                    <a href="/terms">Terms of service</a>
                                </li>
                                <li>
                                    <a href="/aml-kyc-policy">
                                        AML &amp; KYC policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
                        <div className="bottom-widget">
                            <h4 className="widget-title">Exchange</h4>
                            <ul>
                                <li>
                                    <a href="../profile/swap">BTC to USDT</a>
                                </li>
                                <li>
                                    <a href="../profile/swap">ETH to USDT</a>
                                </li>
                                <li>
                                    <a href="../profile/swap">LTC to USDT</a>
                                </li>
                                <li>
                                    <a href="../profile/swap">BNB to USDT</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
