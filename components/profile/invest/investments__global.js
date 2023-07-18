import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UnstakePopup } from '@/components/profile/wallet/UnstakePopup';

const End = () => {
    const [transactions, setTransactions] = useState([]);
    const [popVisible, setPopVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const accessToken = cookies.accessToken;

                if (accessToken) {
                    const response = await axios.get(
                        process.env.NEXT_PUBLIC_BASE_URL + '/transactions',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );

                    console.log(response.data);

                    const stakingTransactions = response.data.filter(
                        (transaction) =>
                            transaction.transaction_type === 'Staking'
                    );

                    console.log(stakingTransactions);
                    setTransactions(stakingTransactions);
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

    const handleUnstake = () => {
        setPopVisible(true);
    };

    return (
        <section className="investments__global-container">
            {popVisible ? (
                <UnstakePopup handleCloseClick={() => setPopVisible(false)} />
            ) : null}
            <div className="investments">
                <div className="investments__box">
                    <div className="investments__info">
                        <div className="investments__title">Active Staking</div>
                    </div>
                    <div className="investments__table">
                        <div className="investments__table-names">
                            <div className="investments__table-name investments__table-name-coin">
                                Coin
                            </div>
                            <div className="investments__table-name investments__table-name-plan">
                                Plan
                            </div>
                            <div className="investments__table-name investments__table-name-left">
                                Start date
                            </div>
                            <div className="investments__table-name investments__table-name-profit">
                                Expiration Date
                            </div>
                            <div className="investments__table-name investments__table-name-invested">
                                Invested
                            </div>
                            <div className="investments__table-name investments__table-name-cancel"></div>
                        </div>

                        <div
                            className="investments__table-values"
                            id="staking_table"
                        >
                            {transactions.length === 0 ? (
                                <div className="investments__table-values-empty">
                                    No active staking plan
                                </div>
                            ) : (
                                transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="investments__table-row"
                                    >
                                        <div className="investments__table-value">
                                            <div className=" investments__table-name-coin">
                                                {transaction.amount}
                                            </div>
                                            <div className=" investments__table-name-plan">
                                                Plan
                                            </div>
                                            <div className=" investments__table-name-left">
                                                {transaction.time}
                                            </div>
                                            <div className=" investments__table-name-profit">
                                                Expiration Date
                                            </div>
                                            <div className=" investments__table-name-invested">
                                                {transaction.amount}
                                            </div>
                                            <button
                                                className="closeBtn"
                                                onClick={handleUnstake}
                                            >
                                                unstake
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default End;
