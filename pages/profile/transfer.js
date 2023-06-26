import MenuProfile from '@/components/profile/invest/menuProfile';
import Transfer__container from '@/components/profile/transfer/transfer__container';
import Transfer__table from '@/components/profile/transfer/transfer__table';
import P2p_error_modal from '@/components/profile/wallet/p2p_error_modal';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Transfer = () => {
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
        <link rel="stylesheet" href="/css/popup-verifi.css" />
        <link rel="stylesheet" href="/css/available.css" />
        <link rel="stylesheet" href="/css/new_popup_style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />

        {/* <body id="dark" className="stop-scrolling" /> */}

        <style type="text/css">
          {`    .menuProfile__container {
            max-width: 941px !important;
        }

    .menuProfile {
            margin-bottom: -20px !important;
        }
`}
        </style>

        <link rel="stylesheet" href="/css/transfernormalize.css" />
        <link rel="stylesheet" href="/css/transfer_global.css" />
        <link rel="stylesheet" href="/css/transfer__page-348797.css" />

        <link rel="stylesheet" href="/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
      </Head>
      <ProfileLayout>
        <section className="transfer">
          <MenuProfile />
          <Transfer__container />
        </section>
        <Transfer__table />
        <br />
        <br />
      </ProfileLayout>
      <P2p_error_modal />
    </>
  );
};

export default Transfer;
