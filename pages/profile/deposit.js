import Dep from '@/components/profile/desposit/Desposit';
import MenuProfile from '@/components/profile/invest/menuProfile';
import P2p_error_modal from '@/components/profile/wallet/p2p_error_modal';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Deposit = () => {
    useEffect(() => {
        document?.body?.classList.add('dark-body');
        document?.body?.classList.add('stop-scrolling');
    }, []);
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

                <style>
                    {`.userNavigation__tabBtn_wc {
    font-family: 'Roboto', 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #FFFFFF;
    width: 185px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #273660;
    border-radius: 30px;
    cursor: pointer;
    margin-left: 47px;
}

.userNavigation__tabBtn_wc:hover{
 background: rgb(58 151 57);
    background: linear-gradient(90deg, rgb(86 75 181) 0%, rgb(86 48 98) 100%);
       
}

.userNavigation__tabBtn_wc.userNavigation__tabBtn_wc-active:hover{
background: rgb(58 151 57);
    background: linear-gradient(90deg, rgb(86 75 181) 0%, rgb(86 48 98) 100%);
}`}
                </style>

                <link
                    rel="stylesheet"
                    href="/css/materialdesignicons.min.css"
                />
                <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
                {/* <body id="dark" className="stop-scrolling" /> */}
                <link rel="stylesheet" href="/css/styleNew.css" />
                <link rel="stylesheet" href="/css/available.css" />

                <style type="text/css">
                    {`@media (max-width: 1220px) {
    .content-body {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }
}

@media (max-width: 525px) {
   

    .deposit__text-items {
        margin-top: 45px !important;
    }
    
}`}
                </style>

                <link
                    rel="stylesheet"
                    href="/css/materialdesignicons.min.css"
                />
                <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
            </Head>

            <ProfileLayout>
                <div className="content-body">
                    <div className="container">
                        <div className="row">
                            <MenuProfile />
                            <Dep />
                        </div>
                    </div>
                </div>
                <P2p_error_modal />
            </ProfileLayout>
        </>
    );
};

export default Deposit;
