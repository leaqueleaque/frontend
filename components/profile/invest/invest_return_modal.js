const Invest_return_modal = () => {
  return (
    <div
      id="invest_return_modal"
      className="popap-container"
      style={{ display: 'none', position: 'fixed' }}>
      <div className="popap-container-item">
        <a href="invest">
          <div className="popap-container-item-close" id="close_modal"></div>
        </a>
        <div className="popap-container-item-text-box" style={{ width: '400px' }}>
          <h3 className="popap-container-item-title">Success</h3>
          <p id="withdraw_modal_text" className="popap-container-item-text">
            Refund completed successfully. <br />
            Your{' '}
            <strong>
              <span id="invest_modal_span_amount">5 BTC</span>
            </strong>{' '}
            have been successfully transferred to your balance.
            <br />
            <br />
            <i style={{ color: 'silver' }}>
              We would like to remind you that if you return the funds before your investment plan,
              then earnings will not be added.
            </i>
          </p>
          <div className="popap-container-item-btn" id="close_modal_btn">
            <span className="popap-container-item-button" onclick="location.reload()">
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest_return_modal;
