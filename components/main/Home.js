const Home = () => {
  return (
    <section className="home">
      <div className="home__wrapper">
        <div className="home__container">
          <div className="home__box">
            <div className="home__left">
              <div className="home__title">
                <div>
                  Buy, <span>Invest & Trade</span>
                </div>
                on the most trusted crypto exchange
              </div>
              <div className="home__description">
                Leaque has pioneered the concept of seamless trading of different cryptocurrency
                assets.
              </div>
              <a className="home__link-start" href="profile/swap">
                Start trading
              </a>
              <a className="home__link-invest" href="profile/invest">
                Invest
              </a>
            </div>

            <div className="home__right">
              <div className="image-block">
                <div className="image">
                  <div
                    className="image-shadow"
                    style={{ backgroundImage: "url('/main/images/home/iph.png')" }}></div>
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
