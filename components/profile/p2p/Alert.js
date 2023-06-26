const Alert = () => {
  return (
    <div id="alert_message_modal" className="popup__container" style={{ display: 'none' }}>
      <div className="popup">
        <div className="popup__close" id="alert_close_modal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: '#FFFFFF' }}>
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
        </div>

        <div className="popup__left">
          <img src="/img/warning.png" alt="" id="alert_img_pop" />
        </div>

        <div className="popup__right">
          <div className="popup__right-title" id="alert_title_text">
            Warning
          </div>
          <div className="popup__right-description" id="userAlertBox"></div>

          <input type="hidden" id="alertMessageId" value="0" />
          <div id="alert_close_modal_btn" className="popup__right-button">
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
