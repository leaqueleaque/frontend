const Withdraw_true_modal_new = () => {
  return (
    <div
      id="withdraw_true_modal_new"
      className="successful-popup__bg"
      style={{ zIndex: 99999999999 }}>
      <div className="successful-popup">
        <div className="successful-popup__top">
          <div className="successful-popup__img">
            <svg
              width="82"
              height="82"
              viewBox="0 0 82 82"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M75.1667 41C75.1667 59.86 59.86 75.1667 41 75.1667C22.14 75.1667 6.83333 59.86 6.83333 41C6.83333 22.14 22.14 6.83333 41 6.83333C59.86 6.83333 75.1667 22.14 75.1667 41Z"
                stroke="#E7BD1F"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M53.6758 51.865L43.0842 45.5442C41.2392 44.4508 39.7358 41.82 39.7358 39.6675V25.6592"
                stroke="#E7BD1F"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </div>
          <div className="successful-popup__title">Withdrawal Processing</div>
        </div>
        <div className="successful-popup__bottom">
          <div className="successful-popup__column">
            <div className="successful-popup__column-key">Status</div>
            <div className="successful-popup__column-value pending">Pending</div>
          </div>
          <div className="successful-popup__column">
            <div className="successful-popup__column-key">Date</div>
            <div id="t_withdraw_date" className="successful-popup__column-value">
              1 Nov 2023, 23:59:11
            </div>
          </div>
          <div className="successful-popup__column">
            <div className="successful-popup__column-key">Amount</div>
            <div id="t_withdraw_amount" className="successful-popup__column-value">
              21321 USDT
            </div>
          </div>
          <div className="successful-popup__column">
            <div className="successful-popup__column-key">To</div>
            <div id="t_withdraw_address" className="successful-popup__column-value to">
              3NxmaaIUsadncoNOgNFoGcfTxqwX
            </div>
          </div>
          <div className="successful-popup__close" onclick="location.replace('transactions')">
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw_true_modal_new;
