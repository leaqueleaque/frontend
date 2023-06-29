import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


const Trans = () => {
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (accessToken) {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/transactions', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setTransactions(response.data)

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
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="profile_card">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title" style={{ color: '#ffffff' }}>
              Transaction History
            </h4>
          </div>
          <div className="card-body">
            <div className="transaction-table">
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                  {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.transaction_id}</td>
                            <td>{transaction.time}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.address}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.balance}</td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                        <td colSpan="7" className={'colSpanNodata'}>No data transactions</td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trans;
