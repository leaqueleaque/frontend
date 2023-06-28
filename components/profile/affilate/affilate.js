const AFF = () => {
  const handleCopyClick = () => {
    const input = document.getElementById('link_text');
    input.select();
    document.execCommand('copy');
  };
  return (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title" style={{ color: '#ffffff' }}>
                  Affiliate Program
                </h4>
              </div>
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-xl-6 col-lg-6">
                    <h5 style={{ color: '#ffffff' }}>Affiliate Link</h5>
                    <p style={{ color: '#a1a0a7' }}>
                      Copy and paste this link to send to friends or use in your articles. When
                      users sign up using this link, your account will be credited with referral
                      bonuses.
                    </p>
                  </div>
                  <div className="col-xl-5 col-lg-6">
                    <h5 style={{ color: '#ffffff' }}>Share your link</h5>
                    <form>
                      <div className="input-group">
                        <input
                          id="link_text"
                          type="text"
                          className="form-control"
                          value="https://leaque.com/signup?ref=135214936"
                        />
                        <div className="input-group-append">
                          <button id="copy_link" className="input-group-text bg-primary text-white" onClick={handleCopyClick}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title" style={{ color: '#ffffff' }}>
                  Affiliate Status
                </h4>
                <small className="mb-0" style={{ color: '#a1a0a7' }}>
                  Pay on a daily basis
                </small>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Total</th>
                        <th>Previous Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Invites</td>
                        <td>0 User</td>
                        <td>0 User</td>
                      </tr>
                      <tr>
                        <td>Total Turnover</td>
                        <td>0.000 BTC</td>
                        <td>0.000 BTC</td>
                      </tr>
                      <tr>
                        <td>Free Paid</td>
                        <td>0.000 BTC</td>
                        <td>0.000 BTC</td>
                      </tr>
                      <tr>
                        <td>Affiliate Level (% of Commissions)</td>
                        <td>25%</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th style={{ color: '#ffffff' }}>
                          Affiliate Payouts
                          <br />
                          <small style={{ color: '#ffffff' }}>
                            Not listed on affiliate leaderboard
                          </small>
                        </th>
                        <th style={{ color: '#ffffff' }}>0.000 BTC</th>
                        <th style={{ color: '#ffffff' }}>0.000 BTC</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AFF;
