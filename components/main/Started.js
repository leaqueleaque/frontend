const Started = () => {
  return (
    <section className="started">
      <div className="started__container">
        <div className="started__title">Get Started</div>
        <div className="started__description">
          Join the fastest growing global cryptocurrency exchange - with the lowest fees around
        </div>

        <div className="started__cards">
          <div className="started__card started__card-one">
            <div className="started__card-img">
              <img src="/main/images/started/shield.png" width="220" alt="" />
            </div>
            <div className="started__card-title">Create an Wallet</div>
            <div className="started__card-description">
              Create your free account with a quick verification process. It’s easy, we promise!
            </div>
          </div>

          <div className="started__card started__card-two">
            <div className="started__card-img">
              <img src="/main/images/started/wallet.png" width="247" alt="" />
            </div>
            <div className="started__card-title">Make a Deposit</div>
            <div className="started__card-description">
              Dip a toe or go all in. Usually it takes no more than 5 min to deposit with crypto
            </div>
          </div>

          <div className="started__card started__card-three">
            <div className="started__card-img">
              <img src="/main/images/started/growth.png" width="247" alt="" />
            </div>
            <div className="started__card-title">Start Exchange</div>
            <div className="started__card-description">
              Start exchanging crypto in 2 clicks at the best rate. Access over 150 pairs.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Started;
