const Home = () => {
    return (
        <section className="home">
            <div className="home__wrapper">
                <div className="home__container">
                    <div className="home__box">
                        <div className="home__left">
                            <div className="home__title">
                                Buy and Trade <br /> cryptos like <br /> never{' '}
                                <span>before</span>
                            </div>
                            <div className="home__description">
                                We provide you with a seamless and user friendly
                                platform to trade and invest in cryptocurrencies
                            </div>
                            <a className="home__link-start" href="profile/swap">
                                Create Wallet
                            </a>
                            <a
                                className="home__link-invest"
                                href="profile/invest"
                            >
                                Stake Now
                            </a>
                        </div>

                        <div className="home__right">
                            <div className="image-block">
                                <div className="image">
                                    <div
                                        className="image-shadow"
                                        style={{
                                            backgroundImage:
                                                "url('/main/images/home/iph.png')",
                                        }}
                                    ></div>
                                    <img src="/main/images/home/iph.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home__arrow-one">
                    <img src="/main/images/home/arrow-one-bg.svg" alt="" />
                </div>
                <div className="home__arrow-two">
                    <img src="/main/images/home/arrow-two-bg.svg" alt="" />
                </div>
                <div className="home__arrow-three">
                    <img src="/main/images/home/arrow-three-bg.svg" alt="" />
                </div>
                <div className="home__arrow-four">
                    <img src="/main/images/home/arrow-four-bg.svg" alt="" />
                </div>
            </div>
        </section>
    );
};

export default Home;
