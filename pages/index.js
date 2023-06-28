import Benefits from '@/components/main/Benefits';
import Calculator from '@/components/main/Calculator';
import Coins from '@/components/main/Coins';
import Footer from '@/components/main/Footer';
import Freedom from '@/components/main/Freedom';
import Gateway from '@/components/main/Gateway';
import Header from '@/components/main/Header';
import Home from '@/components/main/Home';
import Partners from '@/components/main/Partners';
import Started from '@/components/main/Started';
import Stats from '@/components/main/Stats';
import Cryptocurrencies from '@/components/main/Сryptocurrencies';
import Head from 'next/head';

const HomePage = () => {

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main/style/swiper-bundle.min.css" />
        <link rel="icon" href="../img/default.png" />
        <link rel="stylesheet" href="/main/style/normalize.css" />
        <link rel="stylesheet" href="/main/style/global.css" />
        <link rel="stylesheet" href="/main/style/header.css" />
        <link rel="stylesheet" href="/main/style/home.css" />
        <link rel="stylesheet" href="/main/style/coins.css" />
        <link rel="stylesheet" href="/main/style/gateway.css" />
        <link rel="stylesheet" href="/main/style/stats.css" />
        <link rel="stylesheet" href="/main/style/freedom.css" />
        <link rel="stylesheet" href="/main/style/cryptocurrencies.css" />
        <link rel="stylesheet" href="/main/style/started.css" />
        <link rel="stylesheet" href="/main/style/benefits.css" />
        <link rel="stylesheet" href="/main/style/partners.css" />
        <link rel="stylesheet" href="/main/style/calculator.css" />
        <link rel="stylesheet" href="/main/style/footer.css" />
        <link rel="icon" href="../img/default.png" />
      </Head>
      <div className="container__global">
        <div className="main__global">
          <Header />

          <Home />

          <Coins />

          <Gateway />

          <Stats />
          <Freedom />
          <Cryptocurrencies />
          <Started />

          <Benefits />
          <Partners />
          <Calculator />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
