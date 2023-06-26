// pages/_app.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

const allowedPages = [
  '/',
  '/signin',
  '/signup',
  '/reset-password',
  '/terms',
  '/aml-kyc-policy',
  '/cookies-policy',
];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const isAuthenticated = cookies.accessToken; // Проверяем наличие аутентификационного токена в cookie

    // Проверяем, что маршрутизатор завершил первоначальную загрузку
    if (router.isReady) {
      // Проверяем, разрешен ли доступ к текущей странице
      const isAllowedPage = allowedPages.includes(router.pathname);

      if (!isAuthenticated && !isAllowedPage) {
        // Если пользователь не аутентифицирован и текущая страница не разрешена,
        // перенаправляем его на страницу входа
        router.push('/signin');
      }
    }
  }, [router.isReady, router.pathname]); // Добавляем router.isReady и router.pathname в зависимости useEffect

  return <Component {...pageProps} />;
};

export default MyApp;
