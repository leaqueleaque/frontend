const Withdraw_true_modal = () => {
  return (
    <div id="withdraw_true_modal" className="popap-container" style={{ display: 'none' }}>
      <div className="popap-container-item">
        <div className="popap-container-item-close" id="close_modal"></div>
        <div className="popap-container-img">
          <img src="/img/done.png" alt="" />
        </div>
        <div className="popap-container-item-text-box">
          <h3 className="popap-container-item-title">Withdrawal is processed</h3>
          <p id="withdraw_modal_text" className="popap-container-item-text">
            Expected time: 15 minutes to 24 hours <br />
            To check the withdrawal status, follow the Transactions page <br />
            Contact online support for additional information.
          </p>
          <div className="popap-container-item-btn" id="close_modal_true_btn">
            <span className="popap-container-item-button">Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw_true_modal;
