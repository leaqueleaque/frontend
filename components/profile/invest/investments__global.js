import {parseCookies} from "nookies";
import {useEffect, useState} from "react";
import axios from "axios";

const End = () => {
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (accessToken) {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/transactions/staking/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setTransactions(response.data);
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
    <section className="investments__global-container">
      {/*<div className="investments">*/}
      {/*  <div className="investments__box">*/}
      {/*    <div className="investments__info">*/}
      {/*      <div className="investments__title">Active investments</div>*/}
      {/*      <div className="investments__description">Your active staking plans</div>*/}
      {/*    </div>*/}
      {/*    <div className="investments__table">*/}
      {/*      <div className="investments__table-names">*/}
      {/*        <div className="investments__table-name investments__table-name-coin">Coin</div>*/}
      {/*        <div className="investments__table-name investments__table-name-plan">Plan</div>*/}
      {/*        <div className="investments__table-name investments__table-name-left">Left</div>*/}
      {/*        <div className="investments__table-name investments__table-name-profit">*/}
      {/*          Realtime profit*/}
      {/*        </div>*/}
      {/*        <div className="investments__table-name investments__table-name-invested">*/}
      {/*          Invested*/}
      {/*        </div>*/}
      {/*        <div className="investments__table-name investments__table-name-cancel"></div>*/}
      {/*      </div>*/}

      {/*      <div className="investments__table-values" id="staking_table">*/}
      {/*        <div className="investments__table-values-empty">No active investments</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

export default End;
