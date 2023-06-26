const Stats = () => {
  return (
    <section className="stats">
      <div className="stats__container">
        <div className="stats__items">
          <div className="stats__item">
            <div className="stats__item-value">$24 018 477</div>
            <div className="stats__item-text">Trading volume per 7 days</div>
          </div>

          <div className="stats__item">
            <div className="stats__item-value">$2 314 745</div>
            <div className="stats__item-text">Trading volume per day</div>
          </div>

          <div className="stats__item">
            <div className="stats__item-value">93 762</div>
            <div className="stats__item-text">Active traders</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
