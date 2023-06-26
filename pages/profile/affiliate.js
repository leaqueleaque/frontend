import AFF from '@/components/profile/affilate/affilate';
import MenuProfile from '@/components/profile/invest/menuProfile';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Affiliate = () => {
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
        <link rel="stylesheet" href="/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
        {/* <body id="dark" className="stop-scrolling" /> */}
      </Head>
      <ProfileLayout>
        <MenuProfile />
        <AFF />
      </ProfileLayout>
    </>
  );
};

export default Affiliate;
