import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';

const AFF = () => {
    const handleCopyClick = (e) => {
        e.preventDefault();
        const input = document.getElementById('link_text');
        input.select();
        document.execCommand('copy');
    };

    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const accessToken = cookies.accessToken;

                if (accessToken) {
                    const response = await axios.get(
                        'https://cointranche.com/api/user/profile/',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    const { user } = response.data;
                    setProfile(user);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

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
                                                    value={`https://cointranche.com/signup?ref=${profile?.ref_code}`}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        id="copy_link"
                                                        className="input-group-text bg-primary text-white"
                                                        onClick={(e) =>
                                                            handleCopyClick(e)
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
                                                <td>
                                                    {profile?.invites} Users
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total invite bonus</td>
                                                <td>
                                                    {profile?.got_total} USDT
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Referral turnover bonus</td>
                                                <td>{profile?.got_dep} USDT</td>
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
                                                    {profile?.got_usdt} USDT
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
