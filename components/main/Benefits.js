const Benefits = () => {
    return (
        <section className="benefits">
            <div className="benefits__container">
                <div className="benefits__top">
                    <div className="benefits__top-box">
                        <div className="benefits__top-left">
                            <div className="benefits__sub-title">
                                Institutional-grade cold storage system
                            </div>
                            <div className="benefits__title">
                                Secure Crypto Wallet
                            </div>
                            <div className="benefits__des">
                                Our safe, secure wallet infrastructure supports
                                all our listed assets. Invest confidently,
                                knowing that our wallets are protected by
                                cointranche industry-leading security and
                                protection.
                            </div>
                            <a href="profile/wallet" className="benefits__link">
                                Wallet
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.7529 7.04786C13.0602 6.74057 13.0602 6.24234 12.7529 5.93505L7.74523 0.927388C7.43793 0.620093 6.93971 0.620093 6.63241 0.927388C6.32512 1.23468 6.32512 1.73291 6.63241 2.0402L11.0837 6.49146L6.63241 10.9427C6.32512 11.25 6.32512 11.7482 6.63241 12.0555C6.93971 12.3628 7.43793 12.3628 7.74523 12.0555L12.7529 7.04786ZM0.393311 7.27833H12.1965V5.70458H0.393311V7.27833Z"
                                        fill="#847AE7"
                                    />
                                </svg>
                            </a>
                        </div>
                        <img
                            className="benefits__top-img"
                            src="/main/images/benefits/benefits_1.webp"
                            alt=""
                        />
                    </div>

                    <div className="benefits__bottom-box">
                        <div className="benefits__bottom-right">
                            <div className="benefits__sub-title">
                                Trade anywhere anytime
                            </div>
                            <div className="benefits__title">
                                Trade Spot <br /> Swap and Stake
                                <br />
                                All in one powerful interface
                            </div>
                            <div className="benefits__des">
                                Turn into a professional trader via our one-stop
                                services platform with powerful features, high
                                execution speed and low fees. Buy and trade all
                                your favorite tokens effortlessly, anytime and
                                anywhere.
                            </div>
                            <a
                                href="../profile/swap"
                                className="benefits__link"
                            >
                                Get Started
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.7529 7.04786C13.0602 6.74057 13.0602 6.24234 12.7529 5.93505L7.74523 0.927388C7.43793 0.620093 6.93971 0.620093 6.63241 0.927388C6.32512 1.23468 6.32512 1.73291 6.63241 2.0402L11.0837 6.49146L6.63241 10.9427C6.32512 11.25 6.32512 11.7482 6.63241 12.0555C6.93971 12.3628 7.43793 12.3628 7.74523 12.0555L12.7529 7.04786ZM0.393311 7.27833H12.1965V5.70458H0.393311V7.27833Z"
                                        fill="#847AE7"
                                    />
                                </svg>
                            </a>
                        </div>
                        <img
                            className="benefits__bottom-img"
                            src="/main/images/benefits/benefits_2.webp"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
