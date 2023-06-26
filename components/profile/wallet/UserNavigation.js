const UserNavigation = () => {
  return (
    <section className="userNavigation">
      <div className="userCard__container">
        <div className="userNavigation__box">
          <div className="userNavigation__search-box">
            <div className="userNavigation__search">
              <input
                className="userNavigation__input"
                type="text"
                placeholder="Search"
                id="search_currency"
              />
            </div>
            <div className="userNavigation__checkbox">
              <label className="userNavigation__features-label" for="userNavigation-remember">
                Hide zero balances
                <input
                  className="userNavigation__features-checkbox"
                  type="checkbox"
                  id="userNavigation-remember"
                  onclick="hideZeroBalances()"
                />
                <span className="userNavigation__features-checkmark"></span>
              </label>
            </div>
          </div>

          <div className="userNavigation__tabBtn-box">
            <a href="deposit">
              <div className="userNavigation__tabBtn">Deposit</div>
            </a>
            <a href="withdraw">
              <div className="userNavigation__tabBtn">Withdraw</div>
            </a>
            <a href="transfer">
              <div className="userNavigation__tabBtn">Transfer</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNavigation;
