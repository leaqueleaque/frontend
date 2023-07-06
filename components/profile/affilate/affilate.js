const AFF = () => {
    const handleCopyClick = () => {
        const input = document.getElementById('link_text');
        input.select();
        document.execCommand('copy');
    };
    return (
        <div className="content-body">
            <div className="container">
                <div className="row aliffate">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4
                                    className="card-title"
                                    style={{ color: '#ffffff' }}
                                >
                                    Affiliate Program
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-xl-6 col-lg-6">
                                        <h5 style={{ color: '#ffffff' }}>
                                            Affiliate Link
                                        </h5>
                                        <p style={{ color: '#a1a0a7' }}>
                                            Copy and paste this link to send to
                                            your friends. When users sign up
                                            through this link, they will receive
                                            a 10 USDT bonus. And you will
                                            receive 5 USDT for each invited
                                            user.
                                            <br />
                                            <br />
                                            You will also be able to get 10% of
                                            your referrals trading.
                                        </p>
                                    </div>
                                    <div className="col-xl-5 col-lg-6">
                                        <h5 style={{ color: '#ffffff' }}>
                                            Share your link
                                        </h5>
                                        <form>
                                            <div className="input-group">
                                                <input
                                                    id="link_text"
                                                    type="text"
                                                    className="form-control"
                                                    value="https://leaque.com/signup?ref=135214936"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        id="copy_link"
                                                        className="input-group-text bg-primary text-white"
                                                        onClick={
                                                            handleCopyClick
                                                        }
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
                                <h4
                                    className="card-title"
                                    style={{ color: '#ffffff' }}
                                >
                                    Affiliate Status
                                </h4>
                                <small
                                    className="mb-0"
                                    style={{ color: '#a1a0a7' }}
                                >
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Invites</td>
                                                <td>0 User</td>
                                            </tr>
                                            <tr>
                                                <td>Total invite bonus</td>
                                                <td>0.00 USDT</td>
                                            </tr>
                                            <tr>
                                                <td>Referral turnover bonus</td>
                                                <td>0.00 USDT</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Affiliate Level ( % of
                                                    referrals turnover )
                                                </td>
                                                <td>10%</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th
                                                    style={{ color: '#ffffff' }}
                                                >
                                                    Affiliate Payouts
                                                </th>
                                                <th
                                                    style={{ color: '#ffffff' }}
                                                >
                                                    0.00 USDT
                                                </th>
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
