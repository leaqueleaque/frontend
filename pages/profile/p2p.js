import Alert from '@/components/profile/p2p/Alert';
import FormP2p from '@/components/profile/p2p/formP2p';
import P2p_trade from '@/components/profile/p2p/p2p__trade-list';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const P2p = () => {
  useEffect(() => {
    document?.body?.classList.add("dark-body")
    document?.body?.classList.add("stop-scrolling")
  }, [])
  return (
    <>
      <Head>
        <link rel="icon" href="/img/default.png" />
        <link rel="stylesheet" href="/css/g_menu_normalize.css" />
        <link rel="stylesheet" href="/css/g_menu_style.css" />
        <link rel="stylesheet" href="/css/style.css?v=3" />
        <link rel="stylesheet" href="/css/custom.css?v=3" />
        <link rel="stylesheet" href="/css/toastr.css" />
        <link rel="stylesheet" href="/css/popap-style.css" />
        <link rel="stylesheet" href="/css/stake.css" />
        <link rel="stylesheet" href="/css/popup/popup-verifi.css" />
        <link rel="stylesheet" href="/css/available.css" />
        <link rel="stylesheet" href="/css/new_popup_style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/p2p_style.css" />
        {/* <body id="dark" className="stop-scrolling" /> */}

        <style type="text/css">
          {`    a {
    text-decoration: none !important;
    }`}
        </style>

        <link rel="stylesheet" href="/css/p2p_style.css" />
      </Head>
      <ProfileLayout>
        <div className="p2p__wrapper">
          <FormP2p />
          <P2p_trade />
        </div>
      </ProfileLayout>
      <Alert />
    </>
  );
};

export default P2p;
